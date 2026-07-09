import { Router } from "express";

import UserController from "../controllers/UserController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";


const router = Router();

//!APENAS ADMIN

router.post("/", authMiddleware, roleMiddleware("admin"), UserController.createUser);
router.get("/", authMiddleware, roleMiddleware("admin"), UserController.getAllUsers);
router.get("/:id", authMiddleware, roleMiddleware("admin"), UserController.getUserById);
<<<<<<< Updated upstream
router.put("/:id", authMiddleware, roleMiddleware("admin"), UserController.updateUser);
=======
router.put("/:id", authMiddleware, roleMiddleware("admin"), UserController.updateUserUser);
>>>>>>> Stashed changes
router.delete("/:id", authMiddleware, roleMiddleware("admin"), UserController.deleteUser);

export default router;