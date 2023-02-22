const Cart = require("../models/Cart");
const { multipleMongooseToObject } = require('../../util/mongoose');
const alert = require('alert'); 

class CartController {

    addToCart(req,res,next){
        if(req.body.user === '') {
            alert("Hãy Đăng Nhập Trước Khi Mua Sắm")
            res.redirect('back')
        }
        else{
            const cart = new Cart(req.body)
            cart.save()
                .then(()=> res.redirect('/cart'))
                .catch(next)
        }
    }

    cart(req,res,next) {
        Cart.find({user:req.session.user})
            .then((cart)=>{
                res.render('cart/cart', {cart : multipleMongooseToObject(cart)})
            })
            .catch(next)
    }



    delete(req, res, next){
        Cart.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)

    }
}

module.exports = new CartController