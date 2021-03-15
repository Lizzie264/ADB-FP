let express = require('express')
let router = express.Router()
let surveyHController = require('../controllers/surveyH.controller')

// What route do I use?
router.post('/login', surveyHController.login)
router.post('/newUser', surveyHController.addUser)
router.post('/createSurvey', surveyHController.createSurvey)
router.post('/createQuestion', surveyHController.createQuestion)
router.post('/createAnswer', surveyHController.createAnswer)

module.exports = router