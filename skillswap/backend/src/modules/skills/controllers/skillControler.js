import { skillService } from "../services/skillService.js";
import { catchAsync } from "../../../common/catchAsync.js";
import { HTTP_STATUS } from "../../../constans/index.js";

export const createSkill = catchAsync(async (req, res, next) => {
  const { name, description, level } = req.body;

  const userId = req.user.id;

  const skill = await skillService.addSkill(userId, {
    name,
    description,
    level,
  });

  res.status(HTTP_STATUS.CREATED).json({
    status: "success",
    data: {
      skill,
    },
  });
});

export const getMySkills = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const skills = await skillService.getUserSkills(userId);

  res.status(HTTP_STATUS.OK).json({
    status: "success",
    results: skills.length,
    data: {
      skills,
    },
  });
});
