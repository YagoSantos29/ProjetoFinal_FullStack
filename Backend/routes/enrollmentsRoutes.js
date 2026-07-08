import { Router } from "express";

import EnrollmentController from "../controllers/EnrollmentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = Router();

//!SOMENTE ADM PODE CADASTRAR E DELETAR
router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    EnrollmentController.create
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    EnrollmentController.delete
);


//! TODOS PODEM VER A MATRICULA

router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin", "professor", "aluno"),
    EnrollmentController.index
);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("admin", "professor", "aluno"),
    EnrollmentController.show
);



export default router;