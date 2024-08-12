import express from "express";
import { createuser,finduser,removeVideo,deleteUser,delVdoReq,createvideoreq ,createvideo} from "../controllers/postControllers.js";
import {getusers, getmovies,getseries1,getvideos ,getgroundvideos,getvdoreq,getdashcount} from "../controllers/getControllers.js";
const router=express.Router()
router.get("/allusers",getusers);
router.get("/allvdoreq",getvdoreq); 
router.get("/allvideos",getvideos);
router.get("/allseries",getseries1);
router.get("/allmovies",getmovies);
router.get("/mygroundvideos",getgroundvideos);
router.get("/getcount",getdashcount);
router.post("/addvdoreq",createvideoreq);
router.post("/createuser",createuser);
router.post("/finduser",finduser);
router.post("/createvideo",createvideo);  
router.post("/delvdoreq",delVdoReq);
router.post("/removeuser",deleteUser);  
router.post("/removevideo",removeVideo);
export default router;