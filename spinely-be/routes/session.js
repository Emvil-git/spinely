import controller from '../controllers/session.js';
import express from 'express';
const sessionRouter = express.Router();

// changes can be discarded back, not related to monitoring button added feature

sessionRouter.post('/add', controller.addSession);
sessionRouter.get('/get', controller.getUserSessions);
sessionRouter.put('/update', controller.updateSession); 


export default sessionRouter;