import yup from "yup";

export const todoValidateSchema = yup.object({
  title: yup
    .string()
    .trim()
    .min(3, "Todo must be at least 3 characters")
    .max(10, "Todo must be at most 10 characters")
    .required(),
});

export const validateTodo = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (err) {
    return res.status(400).json({
      errors: err.errors,
    });
  }
};
