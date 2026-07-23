import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import StudentController from "../controllers/StudentController.js";


const router = Router()

//! ADMIN

router.post("/", authMiddleware, roleMiddleware("admin"), StudentController.createStudent);
router.get("/", authMiddleware, roleMiddleware("admin", "professor"), StudentController.getAllStudent);
router.get("/:id", authMiddleware, roleMiddleware("admin", "professor"), StudentController.getByIdStudent);
router.put("/:id", authMiddleware, roleMiddleware("admin"), StudentController.updateStudent);
router.delete("/:id", authMiddleware, roleMiddleware("admin", "professor"), StudentController.deleteStudent);


//! ALUNO
router.get("/me", authMiddleware, roleMiddleware("aluno"), StudentController.viewStudent);

export default router;