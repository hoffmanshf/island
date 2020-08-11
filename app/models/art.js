const { Op } = require('sequelize');
const { flatten } = require('lodash');
const { Movie, Sentence, Music } = require('./post');

class Art {
  constructor(artId, type) {
    this.artId = artId;
    this.type = type;
  }

  static async getData(artId, type) {
    let art = null;
    const finder = {
      where: {
        id: artId,
      },
    };
    switch (type) {
      case 100:
        art = await Movie.scope('bh').findOne(finder);
        break;
      case 200:
        art = await Music.scope('bh').findOne(finder);
        break;
      case 300:
        art = await Sentence.scope('bh').findOne(finder);
        break;
      default:
        break;
      // case 100:
      //   art = await Movie.findOne(finder);
      //   break;
      // case 200:
      //   art = await Music.findOne(finder);
      //   break;
      // case 300:
      //   art = await Sentence.findOne(finder);
      //   break;
      // default:
      //   break;
    }
    // if (art && art.image) {
    //     let imgUrl = art.dataValues.image
    //     art.dataValues.image = global.config.host + imgUrl
    // }
    return art;
  }

  static async getListByType(ids, type) {
    let arts = [];
    const finder = {
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    };
    const scope = 'bh';
    switch (type) {
      case 100:
        arts = await Movie.scope(scope).findAll(finder);
        break;
      case 200:
        arts = await Music.scope(scope).findAll(finder);
        break;
      case 300:
        arts = await Sentence.scope(scope).findAll(finder);
        break;
      case 400:
        break;
      default:
        break;
    }
    return arts;
  }

  static async getList(artInfoList) {
    const artInfoObj = {
      100: [],
      200: [],
      300: [],
    };

    artInfoList.forEach((artInfo) => {
      artInfoObj[artInfo.type].push(artInfo.artId);
    });

    const arts = [];
    for (let key in artInfoObj) {
      if (artInfoObj[key].length !== 0) {
        key = parseInt(key, 10);
        arts.push(Art.getListByType(artInfoObj[key], key));
      }
    }
    const result = await Promise.all(arts);

    return flatten(result);
  }
}

module.exports = {
  Art,
};
