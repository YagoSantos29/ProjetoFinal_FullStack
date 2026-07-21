import { Router } from "express";

import ClassController from "../controllers/ClassController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = Router();

//! ADMIN E PROFESSOR CADASTRAM TURMA / SÓ ADMIN EDITA E DELETA
router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin", "professor"),
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