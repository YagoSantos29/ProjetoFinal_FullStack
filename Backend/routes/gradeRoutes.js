import { Router } from "express";

import GradeController from "../controllers/GradeController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = Router();

//! PROFESSOR E ADM CADASTRAM NOTAS
router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin", "professor"),
    GradeController.create
);

//? TODOS VISUALIZAM SUAS NOTAS
router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin", "professor", "aluno"),
    GradeController.index
);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("admin", "professor", "aluno"),
    GradeController.show
);

//! PROFESSOR E ADMIN ATUALIZAM AS NOTAS
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin", "professor"),
    GradeController.update
);

//! ADMIN DELETA NOTAS
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    GradeController.delete
);

export default router;