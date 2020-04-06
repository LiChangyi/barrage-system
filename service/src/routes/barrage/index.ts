import * as Router from 'koa-router';
import midValidate from '../../middleware/validate';
import { IRoute } from '../../types';
import list from './list';
import echart from './echart';

const router: any = new Router({
  prefix: '/api/barrage'
});

[list, echart].forEach(({ method = 'get', path = '/', validate, handle }: IRoute) => {
  router[method.toLocaleLowerCase()](path, midValidate(validate), handle);
})

export default router;
