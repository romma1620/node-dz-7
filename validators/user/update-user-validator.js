const Joi = require('joi')

module.exports = Joi.object().keys({
    name: Joi.string().trim().min(2).max(60).optional().allow('TRUMPET'),
    age: Joi.number().integer().min(0).max(120).optional(),
    description: Joi.string().optional().allow(null, ''),
    family: Joi.array().items(
        Joi.object().keys({
            name: Joi.string().trim().min(2).max(60)
        })
    ).optional()
})
