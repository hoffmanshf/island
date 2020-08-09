const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const InitManager = require('./core/init');
const catchError = require('./middlewares/exception');

const app = new Koa();
app.use(bodyParser());
app.use(catchError);
InitManager.init(app);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
