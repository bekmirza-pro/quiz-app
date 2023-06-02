import { Router } from 'express'
import { QuestionController } from '../controllers/question'
import { QuestionValidator } from '../validators/question'
import multer from '../middleware/multer'
import { Middleware } from '../middleware/auth'

const router = Router({ mergeParams: true })
const controller = new QuestionController()
const validator = new QuestionValidator()
const middleware = new Middleware()

const upload = multer(['image/png', 'image/jpeg'], 10).single('images')

router.route('/all').get(controller.getAll)
router
    .route('/create')
    .post(middleware.auth(['user']), upload, validator.create, controller.create)
router.route('/filter/:id').get(controller.getAll)
router
    .route('/:id')
    .get(controller.get)
    .patch(middleware.auth(['user']), upload, validator.update, controller.update)
    .delete(middleware.auth(['user']), controller.delete)

export default router
