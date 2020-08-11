const { Sequelize, Model, Op } = require('sequelize');
const { sequelize } = require('../../core/db');
const { Art } = require('./art');

class Favor extends Model {
  static async like(artId, type, uid) {
    const favor = await Favor.findOne({
      where: {
        artId,
        type,
        uid,
      },
    });
    if (favor) {
      throw new global.errors.LikeError();
    }
    // Notice: you must return sequelize.transaction, otherwise transaction will not commit
    return sequelize.transaction(async (t) => {
      await Favor.create(
        {
          artId,
          type,
          uid,
        },
        {
          transaction: t,
        }
      );
      const art = await Art.getData(artId, type);
      // Increment the value of one or more columns.
      // This is done in the database, which means it does not use the values currently stored on the Instance.
      await art.increment('fav_nums', {
        by: 1,
        transaction: t,
      });
    });
  }

  static async dislike(artId, type, uid) {
    const favor = await Favor.findOne({
      where: {
        artId,
        type,
        uid,
      },
    });
    if (!favor) {
      throw new global.errors.DislikeError();
    }

    return sequelize.transaction(async (t) => {
      await favor.destroy({
        // if force: false, data entry will not be actually deleted, only updates deleted_at
        force: true,
        transaction: t,
      });
      const art = await Art.getData(artId, type);
      await art.decrement('fav_nums', {
        by: 1,
        transaction: t,
      });
    });
  }

  static async userLikeIt(artId, type, uid) {
    const favor = await Favor.findOne({
      where: {
        uid,
        artId,
        type,
      },
    });
    return !!favor;
  }

  static async getFavoritePosts(uid) {
    const arts = await Favor.findAll({
      where: {
        uid,
        type: {
          // type does not equal to 400
          [Op.not]: 400,
          // [] converts field to char
          // in ES5, all keys are chars
          // ES6 introduces key type Symbol
        },
      },
    });
    if (!arts) {
      throw new global.errors.NotFound();
    }

    // Notice: avoid call database in for loop
    // for (let art of arts) {
    //   const res = await Art.getData(art.artId, art.type);
    // }

    // solution: use SQL IN statement to query for all ids in [ids]

    // use list of art id and type to get corresponding arts
    const artList = await Art.getList(arts);
    return artList;
  }
}

Favor.init(
  {
    uid: Sequelize.INTEGER,
    artId: Sequelize.INTEGER,
    type: Sequelize.INTEGER,
  },
  {
    sequelize,
    tableName: 'favor',
  }
);

module.exports = {
  Favor,
};
