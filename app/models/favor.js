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
      const art = await Art.getData(artId, type, false);
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
      const art = await Art.getData(artId, type, false);
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
