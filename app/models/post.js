const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../../core/db');

const postFields = {
  image: {
    type: Sequelize.STRING,
  },
  content: Sequelize.STRING,
  publishDate: Sequelize.DATEONLY,
  favNums: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  title: Sequelize.STRING,
  type: Sequelize.TINYINT,
};

class Movie extends Model {}

Movie.init(postFields, {
  sequelize,
  tableName: 'movie',
});

class Sentence extends Model {}

Sentence.init(postFields, {
  sequelize,
  tableName: 'sentence',
});

class Music extends Model {}

const musicFields = Object.assign(
  {
    url: Sequelize.STRING,
  },
  postFields
);

Music.init(musicFields, {
  sequelize,
  tableName: 'music',
});

module.exports = {
  Movie,
  Sentence,
  Music,
};
