import express from 'express';
import * as UserController from '../../controllers/user/user.controller.js'

const router = express.Router();

router.get('/', UserController.GET_USERS)
router.post('/', UserController.POST_USER)
router.get('/:id', UserController.GET_USER)
router.delete('/:id', UserController.DELETE_USER)

export {
    router
}

