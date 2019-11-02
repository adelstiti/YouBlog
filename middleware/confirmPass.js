module.exports = (req,res,next) =>{
    if(req.body.password  !== req.body.password2 ){
        return res.redirect('/auth/Register')
    }
    next()
}

