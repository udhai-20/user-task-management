const { validate } = require('class-validator');
const { plainToClass } = require('class-transformer');

const validateRequest = (dtoClass, source) => {
  return async (req, res, next) => {
    const data = plainToClass(dtoClass, req[source]);
    const errors = await validate(data);
    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        })),
      });
    }
    next();
  };
};

module.exports = validateRequest;
