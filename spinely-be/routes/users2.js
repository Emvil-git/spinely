import controller from '../controllers/users2.js';
import express from 'express';
const usersRouter = express.Router();

usersRouter.get('/getAll', controller.createTable);

export default usersRouter;