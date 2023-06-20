import controller from '../controllers/progress.js';
import express from 'express';
const progressRouter = express.Router();

progressRouter.post('/makeReport', controller.makeProgressReport);
progressRouter.get('/get/:sessionId', controller.getSessionReports);
progressRouter.delete('/clear/:sessionId', controller.clearReports);

export default progressRouter;