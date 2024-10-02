import { Router } from "express"; 
import  {validation} from  "./../../middilware/validation.middilware.js"
import  *  as authcontroller from  "./auth.controller.js"
import  *  as authsechema from  "./auth.sechema.js"


const authRouter =  Router();

authRouter.post("/register",validation(authsechema.register),authcontroller.register)
authRouter.get("/activateAccount/:token",validation(authsechema.activateAccoun),authcontroller.activateAccount)
authRouter.post("/login",validation(authsechema.login),authcontroller.logen)
authRouter.patch("/forgoyPassowrd",validation(authsechema.forgoyPass),authcontroller.forgoyPass)
authRouter.patch("/resetPassowrd",validation(authsechema.resetPassowrd),authcontroller.resetPass)


export default  authRouter