const { Movie, Sentence, Music } = require('./post');

class Art {
  constructor(artId, type) {
    this.artId = artId;
    this.type = type;
  }

  static async getData(artId, type, useScope = true) {
    let art = null;
    const finder = {
      where: {
        id: artId,
      },
    };
    const scope = useScope ? 'bh' : null;
    switch (type) {
      // case 100:
      //   art = await Movie.scope(scope).findOne(finder);
      //   break;
      // case 200:
      //   art = await Music.scope(scope).findOne(finder);
      //   break;
      // case 300:
      //   art = await Sentence.scope(scope).findOne(finder);
      //   break;
      // default:
      //   break;
      case 100:
        art = await Movie.findOne(finder);
        break;
      case 200:
        art = await Music.findOne(finder);
        break;
      case 300:
        art = await Sentence.findOne(finder);
        break;
      default:
        break;
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
