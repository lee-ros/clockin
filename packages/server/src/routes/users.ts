import { Router } from "express";
import { createUser, deleteUser } from "../handlers/users";

const router = Router()

router.post("/", createUser);
router.delete("/:id", deleteUser);

export default router;