import express, { Router } from 'express'
import path from 'path'
import sampleRouter from './player'
import blogRouter from './question'
import categoryRouter from './game'
import userRouter from './user'

const router = Router({ mergeParams: true })

router.use('/api/file', express.static(path.join(__dirname, '../../../uploads')))
router.use('/sample', sampleRouter)
router.use('/user', userRouter)
router.use('/blog', blogRouter)
router.use('/category', categoryRouter)

export default router
