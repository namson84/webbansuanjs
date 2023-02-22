const Course = require('../models/Course')
const {multipleMongooseToObject} = require('../../util/mongoose')
const { renderSync } = require('node-sass')

class MeController {
    
    //[POST]/me/courses/stored
    stored (req, res, next) {
        if (req.session.type === undefined) {
            res.redirect('/')
        }
        else if(req.session.type === 'false'){
            res.redirect('/')
        }
        else{
            Promise.all([ Course.find({}), Course.countDocumentsDeleted() ])
            .then(([courses,deletedCount]) => {
                res.render('me/stored', {
                    deletedCount,
                    courses : multipleMongooseToObject(courses) 
                })
            })
            .catch(next)

        }

        

        // Course.countDocumentsDeleted()
        //     .then((deletedCount) => {})
        //     .catch(() => {})

        // Course.find({})
        //     .then(courses => res.render('me/stored', {
        //         courses : multipleMongooseToObject(courses) 
        //     }))
        //     .catch(next)
        
            
    }

    //[POST]/me/trash/courses
    trash(req, res,next) {
        Course.findDeleted({})
        .then(courses => res.render('me/trash', {
            courses : multipleMongooseToObject(courses) 
        }))
        .catch(next)
    }

}

module.exports = new MeController()
