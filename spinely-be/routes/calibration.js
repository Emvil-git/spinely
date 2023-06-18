import controller from '../controllers/calibration.js';
import express from 'express';
const calibrationRouter = express.Router();

calibrationRouter.post('/createData', controller.createCalibrationData);
calibrationRouter.get('/checkData', controller.checkIfCalibrationExists);
calibrationRouter.delete('/clearData', controller.clearCalibrationData);

export default calibrationRouter;