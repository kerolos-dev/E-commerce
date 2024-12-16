import { Router } from "express"; 
import  *  as authcontroller from  "./auth.controller.js"
import  *  as authsechema from  "./auth.schema.js"
import { validation } from "../../middleware/validation.middleware.js";

const authRouter =  Router();

authRouter.post("/register",validation(authsechema.register),authcontroller.register)
// authRouter.get("/activateAccount/:token",validation(authsechema.activateAccount),authcontroller.activateAccount)
authRouter.post("/login",validation(authsechema.login),authcontroller.logan)
authRouter.patch("/forGetPass",validation(authsechema.forGetPass),authcontroller.forGetPass)
authRouter.patch("resetPassword",validation(authsechema.resetPassword),authcontroller.resetPass)


export default  authRouter


