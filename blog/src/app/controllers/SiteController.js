const Course = require('../models/Course')
const {multipleMongooseToObject} = require('../../util/mongoose')

class SiteController {
    //[GET]/req len cotroller
    index(req, res, next) {

        // Course.find({}, function(err, courses) {
        //     if(!err) {
        //         res.json(courses)
        //     }else{
        //         res.status(400).json({err:'ERROR'})
        //     }
            
        // })

        Promise.all([Course.find({type:"suaNuoc"}), Course.find({type:"suaBot"}),Course.find({type:"suaDauNanh"}),Course.find({type:"suaDac"})])
            .then(([suaNuoc,suaBot,suaDauNanh,suaDac])=>{
                res.render('home', {
                    suaNuoc: multipleMongooseToObject(suaNuoc),
                    suaBot: multipleMongooseToObject(suaBot),
                    suaDauNanh: multipleMongooseToObject(suaDauNanh),
                    suaDac: multipleMongooseToObject(suaDac),
                });
                
            })
            .catch(next)

        // res.render('home');
    }

    //[GET]/search/
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController()
