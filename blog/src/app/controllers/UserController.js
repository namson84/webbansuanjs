const User = require('../models/User');
const {mongooseToObject} = require('../../util/mongoose');
const {multipleMongooseToObject} = require('../../util/mongoose');
const { renderSync } = require('node-sass');
const sessions = require('express-session');
const alert = require('alert');

class RegisterController {
    
    profile(req, res, next){
        User.findOne({username:req.session.user})
            .then(info=>{
               
                res.render('user/profile',{info:mongooseToObject(info)})

            })
    }
    
    profileById(req, res, next){
        User.findOne({_id:req.params.id})
            .then(info=>{
                res.render('user/profile',{info:mongooseToObject(info)})

            })
    }

    deleteUser(req, res, next) {
        User.deleteOne({_id:req.params.id})
            .then(()=> res.redirect('back'))
    }

    updateProfile(req, res, next){
        User.findOneAndUpdate({_id:req.params.id},req.body)
            .then(()=> {
                if(req.body.gender === 'false') req.session.gender = false
                else req.session.gender = true
                res.redirect('back')
            })
    }

    users(req, res, next){
        if (req.session.type === undefined) {
            res.redirect('/')
        }
        else if(req.session.type === 'false'){
            res.redirect('/')
        }
        else {
            User.find({type:"false"})
                .then(users=>{
                    res.render('user/users',{users:multipleMongooseToObject(users)})
                })

        }
    }

    //[GET]/user/register
    register (req, res, next) {

        res.render('user/register')
        
            
    }

    //[POST]/user/register
    create(req, res,next) {
        const user = new User(req.body)
        user.save()
            .then(() => {
                req.session.isAuthenticated = true
                req.session.user = req.body.username
                req.session.type = false
                if(req.body.gender === 'true') req.session.gender = true
                else req.session.gender = false
                res.redirect('/')
            } )
            .catch(next)
    }

    //[GET]/user/login
    login (req, res, next) {
        res.render('user/login')
        
    }

    //[POST]/user/login/confirm
    confirmLogin(req, res, next) {
        User.findOne({username: req.body.username, password: req.body.password})
            .then((data) => {
                if(data){
                    if(data.gender === 'true') req.session.gender = true
                    else req.session.gender = false
                    req.session.isAuthenticated = true
                    req.session.user = req.body.username
                    if(data.type === 'true')
                    {
                        req.session.type = true
                    }
                    else{
                        req.session.type = false
                    }
                    res.redirect('/')
                }
                else{
                    return res.redirect('/user/login')
                }
            })

    }
   
    logout(req, res, next){
        req.session.isAuthenticated = false
        req.session.user = null
        req.session.type = false
        res.redirect('/')
    }
}

module.exports = new RegisterController()