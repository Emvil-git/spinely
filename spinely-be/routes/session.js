import controller from '../controllers/session.js';
import express from 'express';
const sessionRouter = express.Router();

sessionRouter.post('/add', controller.addSession);
sessionRouter.get('/get', controller.getUserSessions);
sessionRouter.delete('/clear', controller.clearSessions);

export default sessionRouter;