import express from 'express';
import routes from '../route.js';
import { doJoin, doLogin, isLogined, userHome } from '../controllers/userController.js';
import { renderJoinView } from '../controllers/viewController.js';
import {wrapAsync} from '@rimiti/express-async';
var router = express.Router();

/* GET users listing. */
// Single Source of Truth
router.get(routes.HOME, userHome);

router.post(routes.LOGIN, isLogined, doLogin);

router.get(routes.JOIN, isLogined, renderJoinView);
router.post(routes.JOIN, wrapAsync(doJoin));
// router.post(routes.JOIN, (doJoin));


// return statement
export default router;
