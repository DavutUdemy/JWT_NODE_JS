const User = require("../models/User");
const errorWrapper = require("../helpers/errors/errorWrapper");
const CustomError = require("../helpers/errors/customError");
const bcrypt = require("bcryptjs");
const {validateUserInput} = require("../helpers/authorization/inputHelpers");
const {checkPassword} = require("../helpers/authorization/checkPassword");

const login = errorWrapper(async (req,res,next)=>{
    const{email,password} = req.body;
    console.log(email,password);
    if(!validateUserInput(email,password)){
        return next(new CustomError("Please Check your inputs",400))
    }
    const user = await User.findOne({email}).select("+password");

    if ( !user || !checkPassword(password,user.password)) {
        
        return next(new CustomError("Please check your credentials",404));
    }

    sendTokenToClient(user,res,200);
    
})
const register =  errorWrapper(async (req,res,next) => {
  
    const {name,email,password,role} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        role
    });


    sendTokenToClient(user,res,200);

   
    
});
const sendTokenToClient =  (user,res,status) => {

    // Get Token From User Model
    const token =  user.getTokenFromUserModel();

    const {JWT_COOKIE_EXPIRE,NODE_ENV} = process.env;
    
    // Send To Client With Res
    
    return res
    .status(status)
    .cookie("token",token, {
        httpOnly : true,
        expires : new Date(Date.now() +  parseInt(JWT_COOKIE_EXPIRE) * 1000 * 60),
        secure : NODE_ENV === "development" ? false : true
    })
    .json({
        success : true,
        token,
        data : {
            name : user.name,
            email : user.email,
            role : user.role
        }
    });
    

}
const test =  errorWrapper(async (req,res,next) => {
    res.status(200);
});
const logout = errorWrapper(async (req,res,next) =>{
   
    const {JWT_COOKIE_EXPIRE,NODE_ENV} = process.env;
    
    // Send To Client With Res
    
    return res
    .status(200)
    .cookie("token",null, {
        httpOnly : true,
        expires : new Date(Date.now()),
        secure : NODE_ENV === "development" ? false : true
    })
    .json({
        success : true,
        message : "Logout Successfull"
    });
    
});

module.exports={
    register,
    login,
    test,
    logout
}