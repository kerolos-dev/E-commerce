import  {Router}  from "express" ;
import { fileUpload } from "../../utils/uploadFile.js";
import { validation } from "../../middilware/validation.middilware.js";
import { isAuthenticated } from "../../middilware/authentication.js";
import  *  as  brandsechema from "./brand.sechema.js";
import  *  as  brandController  from "./brand.controller.js";
const  brandRouter =Router()


brandRouter.post("/", isAuthenticated ,
     fileUpload().single("brand"),
     validation(brandsechema.createBrand),brandController.createBrand
    )

 brandRouter.patch("/:id", isAuthenticated ,
     fileUpload().single("brand"),
     validation(brandsechema.updateBrand),brandController.updateBrand
    )
   
 brandRouter.delete("/:id", isAuthenticated , validation(brandsechema.deltaBrand),brandController.deleteBrand
       )
   
 brandRouter.get("/",  brandController.getAllCategory )
      
   

export default  brandRouter