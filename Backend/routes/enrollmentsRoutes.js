import { Router } from "express";

import EnrollmentController from "../controllers/EnrollmentController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = Router();

//!SOMENTE ADM PODE CADASTRAR E DELETAR
router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    EnrollmentController.createEnrollment
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    EnrollmentController.deleteEnrollment
);


//! TODOS PODEM VER A MATRICULA

router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin", "professor", "aluno"),
    EnrollmentController.getAllEnrollments
);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("admin", "professor", "aluno"),
    EnrollmentController.getByIdEnrollment
);



export default router;