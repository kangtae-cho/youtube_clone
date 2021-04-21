import { Router } from 'express';
import express from 'express';
import routes from '../route.js';
import { renderHomeView } from '../controllers/viewController.js';

var router = express.Router();



/* GET home page. */

router.get(routes.HOME, renderHomeView);


export default router;
