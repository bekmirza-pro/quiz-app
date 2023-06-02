import { Router } from 'express'
import { PlayerController } from '../controllers/player'
import { PlayerValidator } from '../validators/player'
import multer from '../middleware/multer'
import { Middleware } from '../middleware/auth'

const router = Router({ mergeParams: true })
const controller = new PlayerController()
const validator = new PlayerValidator()
const middleware = new Middleware()
const upload = multer(['images/png', 'images/jpeg'], 20).fields([
    {
        name: 'image',
        maxCount: 1
    }
])

router.route('/all').get(controller.getAll)
router
    .route('/create')
    .post(validator.create, controller.create)
router
    .route('/:id')
    .get(controller.get)
    .patch(validator.update, controller.update)
    .delete(controller.delete)

export default router
