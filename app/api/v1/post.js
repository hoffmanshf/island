const Router = require('koa-router');
const { PositiveIntegerValidator } = require('../../validators/validator');
const { Auth } = require('../../../middlewares/auth');
const { Flow } = require('../../models/flow');
const { Art } = require('../../models/art');

const router = new Router({
  prefix: '/v1/post',
});

router.get('/latest', new Auth().m, async (ctx, next) => {
  const flow = await Flow.findOne({
    order: [['index', 'DESC']],
  });
  const art = await Art.getData(flow.art_id, flow.type);
  const i = art.get('image');
  const t = art.image;
  const s = art.getDataValue('image');
  // const likeLatest = await Favor.userLikeIt(
  //   flow.art_id,
  //   flow.type,
  //   ctx.auth.uid
  // );

  // Note: setDataValue() function will serialize the data value automatically
  art.setDataValue('index', flow.index);
  // art.setDataValue('like_status', likeLatest);
  ctx.body = art;
});

module.exports = router;
