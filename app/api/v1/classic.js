const Router = require('koa-router');
const router = new Router();
const {PositiveIntegerValidator} = require('../../validators/validator');

router.post('/v1/:id/classic/latest', (ctx, next) => {
    const validator = new PositiveIntegerValidator();
    validator.validate(ctx);
    const id = validator.get('path.id');
    console.log(id);
});

module.exports = router
