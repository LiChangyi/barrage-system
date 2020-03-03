import * as Router from 'koa-router';
import midVlidate from '../../middleware/validate';
import { IRoute } from '../../types';
import add from './add';
import token from './token';


const router: any = new Router({
  prefix: '/api/user'
});

[add, token].forEach(({ method = 'get', path = '/', validate, handle }: IRoute) => {
  router[method.toLocaleLowerCase()](path, midVlidate(validate), handle);
})

export default router;
