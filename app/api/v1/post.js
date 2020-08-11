const Router = require('koa-router');
const { Favor } = require('../../models/favor');
const {
  PositiveIntegerValidator,
  PostValidator,
} = require('../../validators/validator');
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

// router.get('/:type/:id', new Auth().m, async (ctx) => {
//   const v = await new PostValidator().validate(ctx);
//   const id = v.get('path.id');
//   const type = parseInt(v.get('path.type'));
//
//   const artDetail = await new Art(id, type).getDetail(ctx.auth.uid);
//
//   artDetail.art.setDataValue('like_status', artDetail.like_status);
//   ctx.body = artDetail.art;
// });

router.get('/:type/:id/favor', new Auth().m, async (ctx) => {
  const v = await new PostValidator().validate(ctx);
  const id = v.get('path.id');
  const type = parseInt(v.get('path.type'), 10);

  const art = await Art.getData(id, type);
  if (!art) {
    throw new global.errors.NotFound();
  }

  const likeStatus = await Favor.userLikeIt(id, type, ctx.auth.uid);

  ctx.body = {
    fav_nums: art.favNums,
    like_status: likeStatus,
  };
});

// router.get('/favor', new Auth().m, async (ctx) => {
//   const uid = ctx.auth.uid;
//   ctx.body = await Favor.getMyClassicFavors(uid);
// });

module.exports = router;
