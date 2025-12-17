import { Router } from "express";
import AuthRouter from './AuthRoute'

const router = Router()

router.use("/auth", AuthRouter)

export default router