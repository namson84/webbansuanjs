const Course = require('../models/Course')
const {mongooseToObject} = require('../../util/mongoose')
const { renderSync } = require('node-sass')

class CourseController {
    //[GET]/courses/:slug
    show(req, res, next) {
        Course.findOne({_id: req.params.id})
            .then(course => {
                res.render('courses/show',{course: mongooseToObject(course)})
            })
            .catch(next)

    }

    //[POST]/courses/create
    create (req, res, next) {
        if (req.session.type === undefined) {
            res.redirect('/')
        }
        else if(req.session.type === 'false'){
            res.redirect('/')
        }
        else{
            res.render('courses/create')

        }
    }
    
    //[POST]/courses/store
    store (req, res, next) {
        const course = new Course(req.body)
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
            
    }

    //[GET]//courses/:id/edit
    edit (req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit',{
                course: mongooseToObject(course)
            }))
            .catch(next)
        
    }

    //[PUT]//courses/:id
    update(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    //[PATCH]//courses/:id/restore
    restore(req, res, next) {
        Course.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //[DELETE]//courses/:id
    delete(req, res, next){
        Course.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //[DELETE]//courses/:id/force
    forceDelete(req, res, next){
        Course.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new CourseController();
