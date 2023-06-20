import controller from '../controllers/users.js';
import express from 'express';
const usersRouter = express.Router();

usersRouter.get('/getAll', controller.getAllUsers);
usersRouter.get('/name', controller.getName);
usersRouter.get('/getInfo', controller.getUserInfo);
usersRouter.get('/refreshToken', controller.refreshToken);
usersRouter.post('/signUp', controller.signUp);
usersRouter.post('/logIn', controller.logIn);
usersRouter.post('/checkUsername', controller.checkIfUsernameExists);
usersRouter.post('/updateInfo', controller.editUserInfo);

export default usersRouter;