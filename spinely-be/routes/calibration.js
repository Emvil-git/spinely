import controller from '../controllers/calibration.js';
import express from 'express';
const calibrationRouter = express.Router();

calibrationRouter.post('/createData', controller.createCalibrationData);
calibrationRouter.patch('/updateData', controller.updateCalibrationData);
calibrationRouter.get('/checkData', controller.checkIfCalibrationExists);
calibrationRouter.get('/getData', controller.getUserCalibration);
calibrationRouter.delete('/clearData', controller.clearCalibrationData);

export default calibrationRouter;