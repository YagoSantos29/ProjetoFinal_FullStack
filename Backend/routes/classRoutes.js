import { Router } from "express";

import ClassController from "../controllers/ClassController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = Router();

//!ADM CRIA, EDITA E DELETA TURMA
router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    ClassController.createClass
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    ClassController.updateClass
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    ClassController.deleteClass
);

//! TODOS PODEM VER AS TURMAS
router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin", "professor", "aluno"),
    ClassController.getAllClass
);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("admin", "professor", "aluno"),
    ClassController.getByIdClass
);

export default router;