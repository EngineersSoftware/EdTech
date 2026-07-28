import { Router } from "express";
import { validateCreateSkill } from "../middlewares/skillValidator.js";
import { createSkill, getMySkills } from "../controllers/skillControler.js";
import { requireAuth } from "../../../middlewares/authMiddleware.js";

const router = Router();

router.use(requireAuth);
router.post("/", validateCreateSkill, createSkill);
router.get("/", getMySkills);

export default router;