import { Router } from 'express'
import { GameController } from '../controllers/game'
import { GameValidator } from '../validators/game'
import { Middleware } from '../middleware/auth'

const router = Router({ mergeParams: true })
const controller = new GameController()
const validator = new GameValidator()
const middleware = new Middleware()

router.route('/all').get(controller.getAll)
router.route('/create').post(middleware.auth(['user']), validator.create, controller.create)
router
    .route('/:id')
    .get(controller.get)
    .get(controller.getAll)
    .patch(middleware.auth(['user']), validator.update, controller.update)
    .delete(middleware.auth(['user']), controller.delete)

export default router
