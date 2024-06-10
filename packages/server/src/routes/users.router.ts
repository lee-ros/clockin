import { Router } from "express";
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/users.controller";
import { validateRouteSchema } from "../validation/validationHelper";
import { createUserSchema, updateUserSchama } from "../validation/users.schema";
import { idSchema } from "../validation/common.schema";

const router = Router();

router.get(
  "/:id",
  validateRouteSchema({ paramsSchema: idSchema }),
  getUserById
);

router.post(
  "/",
  validateRouteSchema({ bodySchema: createUserSchema }),
  createUser
);

router.patch(
  "/:id",
  validateRouteSchema({ paramsSchema: idSchema, bodySchema: updateUserSchama }),
  updateUser
);

router.delete(
  "/:id",
  validateRouteSchema({ paramsSchema: idSchema }),
  deleteUser
);

export default router;
