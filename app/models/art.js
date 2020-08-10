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
}

module.exports = {
  Art,
};
