import express from 'express';
import { renderVideosView, renderVideoUploaderView } from '../controllers/viewController.js';
import { deleteVideo, finishVideo, getVideo, getVideoList, initVideo, saveVideo, uploadVideo } from '../controllers/videoController.js';
import routes from '../route.js';
var router = express.Router();

router.get(routes.VIDEOS, renderVideosView);
router.post(routes.UPLOAD, uploadVideo);
router.post(routes.DELETE, deleteVideo);
router.get(routes.GET_VIDEO_LIST, getVideoList);
router.get(routes.GET_VIDEO, getVideo);

router.get(routes.UPLOAD, renderVideoUploaderView);
router.post(routes.UPLOAD, uploadVideo);

router.post(routes.INIT_VIDEO, initVideo);
router.post(routes.SAVE_VIDEO, saveVideo);
router.post(routes.FINISH_VIDEO, finishVideo);

export default router;