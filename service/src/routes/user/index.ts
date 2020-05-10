import * as Router from 'koa-router';
import midValidate from '../../middleware/validate';
import { IRoute } from '../../types';
import add from './add';
import token from './token';
import updatePwd from './updatePwd';


const router: any = new Router({
  prefix: '/api/user'
});

[add, token, updatePwd].forEach(({ method = 'get', path = '/', validate, handle }: IRoute) => {
  router[method.toLocaleLowerCase()](path, midValidate(validate), handle);
})

export default router;
