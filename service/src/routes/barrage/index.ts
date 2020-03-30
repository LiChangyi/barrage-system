import * as Router from 'koa-router';
import midVlidate from '../../middleware/validate';
import { IRoute } from '../../types';
import list from './list';

const router: any = new Router({
  prefix: '/api/barrage'
});

[list].forEach(({ method = 'get', path = '/', validate, handle }: IRoute) => {
  router[method.toLocaleLowerCase()](path, midVlidate(validate), handle);
})

export default router;
