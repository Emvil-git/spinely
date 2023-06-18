import controller from '../controllers/spine.js';
import express from 'express';
const spineRouter = express.Router();

spineRouter.post('/addData', controller.addSpineData);
spineRouter.get('/getUserData', controller.getUserSpineData);
spineRouter.get('/checkData', controller.checkIfSpineDataExists);
spineRouter.patch('/editData', controller.editSpineData);
spineRouter.delete('/clearData', controller.clearSpineData);

export default spineRouter;