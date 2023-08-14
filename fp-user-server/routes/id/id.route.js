import express from 'express';
import * as IdController from '../../controllers/id/id.controller.js'

const router = express.Router();

router.get('/', IdController.GET_ID)

export {
    router
}
