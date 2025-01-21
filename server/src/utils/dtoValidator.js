
function validateRequest(schema, data) {
  const errors = [];
  for (const key in schema) {
      const rules = schema[key]; // Rules for the field
      const value = data[key];
      console.log('rules:', rules);
      // Check if required and missing///
      if (rules.required && (value === undefined || value === null || value === "")) {
          errors.push({ field: key, message: `${key} is required` });
          continue;
      }
      // Check data type
      if (value !== undefined && typeof value !== rules.type) {
          errors.push({ field: key, message: `${key} must be of type ${rules.type}` });
      }
      // Check minLength
      if (rules.minLength && value.length < rules.minLength) {
          errors.push({ field: key, message: `${key} must be at least ${rules.minLength} characters long` });
      }
      // Check maxLength
      if (rules.maxLength && value.length > rules.maxLength) {
          errors.push({ field: key, message: `${key} must be at most ${rules.maxLength} characters long` });
      }
      // Check custom regex pattern
      if (rules.pattern && !rules.pattern.test(value)) {
          errors.push({ field: key, message: `${key} format is invalid` });
      }
  }

  return errors.length > 0 ? errors : null;
}

module.exports = validateRequest;

