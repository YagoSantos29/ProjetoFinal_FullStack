import { Router } from "express";

import GradeController from "../controllers/GradeController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = Router();

//! PROFESSOR E ADM CADASTRAM NOTAS
router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin", "professor"),
    GradeController.createGrade
);

//? TODOS VISUALIZAM SUAS NOTAS
router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin", "professor", "aluno"),
    GradeController.getAllGrade
);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("admin", "professor", "aluno"),
    GradeController.getByIdGrade
);

//! PROFESSOR E ADMIN ATUALIZAM AS NOTAS
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin", "professor"),
    GradeController.updateGrade
);

//! ADMIN DELETA NOTAS
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    GradeController.deleteGrade
);

export default router;