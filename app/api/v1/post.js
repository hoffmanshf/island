const Router = require('koa-router');
const { Favor } = require('../../models/favor');
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
  const art = await Art.getData(flow.artId, flow.type);
  const likeLatest = await Favor.userLikeIt(
    flow.artId,
    flow.type,
    ctx.auth.uid
  );

  // Note: setDataValue() function will serialize the data value automatically
  art.setDataValue('index', flow.index);
  art.setDataValue('like_status', likeLatest);
  ctx.body = art;
});

router.get('/:index/next', new Auth().m, async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'index',
  });
  const index = v.get('path.index');
  const flow = await Flow.findOne({
    where: {
      index: index + 1,
    },
  });
  if (!flow) {
    throw new global.errors.NotFound();
  }
  const art = await Art.getData(flow.artId, flow.type);
  const likeNext = await Favor.userLikeIt(flow.artId, flow.type, ctx.auth.uid);
  art.setDataValue('index', flow.index);
  art.setDataValue('like_status', likeNext);
  // art.exclude = ['index','like_status']
  ctx.body = art;
});

router.get('/:index/previous', new Auth().m, async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'index',
  });
  const index = v.get('path.index');
  const flow = await Flow.findOne({
    where: {
      index: index - 1,
    },
  });
  if (!flow) {
    throw new global.errors.NotFound();
  }
  const art = await Art.getData(flow.artId, flow.type);
  const likePrevious = await Favor.userLikeIt(
    flow.artId,
    flow.type,
    ctx.auth.uid
  );
  art.setDataValue('index', flow.index);
  art.setDataValue('like_status', likePrevious);
  ctx.body = art;
});

module.exports = router;
