import * as Router from 'koa-router';
import midValidate from '../../middleware/validate';
import { IRoute } from '../../types';
import list from './list';
import add from './add';
import remove from './remove';
import update from './update';

const router: any = new Router({
  prefix: '/api/filter-rule'
});

[add, list, remove, update].forEach(({ method = 'get', path = '/', validate, handle }: IRoute) => {
  router[method.toLocaleLowerCase()](path, midValidate(validate), handle);
})

export default router;
