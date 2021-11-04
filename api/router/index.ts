import { Router } from 'express'
import infoRouter from './info'
import shieldRouter from './shield'
import outputRouter from './output'

const router = Router()

router.use('/', infoRouter)
router.use('/shield.svg', shieldRouter)
router.use('/output.pdf', outputRouter)

export default router
