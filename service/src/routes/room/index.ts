import * as Router from 'koa-router';
import midVlidate from '../../middleware/validate';
import { IRoute } from '../../types';
import detail from './detail';
import update from './update';


const router: any = new Router({
  prefix: '/api/room'
});

[detail, update].forEach(({ method = 'get', path = '/', validate, handle }: IRoute) => {
  router[method.toLocaleLowerCase()](path, midVlidate(validate), handle);
})

export default router;
