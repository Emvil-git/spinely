import controller from '../controllers/session.js';
import express from 'express';
const sessionRouter = express.Router();

// changes can be discarded back, not related to monitoring button added feature

sessionRouter.post('/add', controller.addSession);
sessionRouter.get('/get', controller.getUserSessions);
sessionRouter.get('/elapsedTime', controller.getElapsedTime); // time passed during the session (in s)
sessionRouter.get('/countProperPosture', controller.getProperOverall); // A proper out of N total postures
sessionRouter.get('/forwardUpperSensor', controller.forwardUpperSensor); // B forward bends out of N total
sessionRouter.get('/forwardMidSensor', controller.forwardMidSensor); // C forward bends out of N total
sessionRouter.get('/forwardLowerSensor', controller.forwardLowerSensor); // D forward bends out of N total
sessionRouter.get('/leftBentSensor', controller.leftBentSensor); // E left bends out of N total
sessionRouter.get('/rightBentSensor', controller.forwardUpperSensor); // F right bends out of N total
sessionRouter.put('/update', controller.updateSession); 


export default sessionRouter;