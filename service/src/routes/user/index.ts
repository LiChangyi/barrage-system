import * as Router from 'koa-router';
import validate from '../../middleware/validate';
import add from './add';
import token from './token';
import list from './list';
import remove from './remove';
import detail from './detail';

const router = new Router({
  prefix: '/api/user'
});

router
  .post('/', validate(add.validate), add.handle)
  .post('/token', validate(add.validate), token.handle)
  .get('/list', validate(list.validate), list.handle)
  .get('/:id', validate(detail.validate), detail.handle)
  .delete('/:id', validate(remove.validate), remove.handle);

export default router;
