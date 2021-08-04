const requestValidation = (schema) => {
  return (req, res, next) => {
    const validations = [];
    [('headers', 'params', 'query', 'body')].forEach((key) => {
      if (schema[key]) {
        const validation = schema[key].validate(req[key]);
        if (validation.error) {
          validations.push(validation.error.message);
        }
      }
    });
    if (validations.length) {
      res.status(422).json({
        status: false,
        err: validations.join(),
        data: null,
      });
    }
    next();
  };
};

module.exports = { requestValidation };
