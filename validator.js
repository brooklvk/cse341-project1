const { body, validationResult } = require('express-validator')

const cowsValidationRules = () => {
  return [
    // tags are strings 2-3 characters long 
    body('tag').isLength({min:2, max:3}),
    body('calfTag').isLength({min:2, max:3}),
    // color is either black, red, or gray 
    body('color').isIn(['black', 'red', 'gray']),
    // birthday should be a string that can be turned into a date 
    body('birthday').toDate().isDate(),
    // number of calves should be an int less than 10 
    body('lostCalves').isInt({min:0, max:9}),
    body('lateCalves').isInt({min:0, max:9}),
    // number of time cow has received antibiotics 
    // should be less than 3 
    body('antibiotics').isInt({min:0, max:3})
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  cowsValidationRules,
  validate,
}