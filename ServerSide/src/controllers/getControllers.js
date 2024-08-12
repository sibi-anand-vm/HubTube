import Video from "../models/vediomodel.js";
import Users from "../models/Usermodel.js";
import Videoreq from "../models/videorequest.js";
const getusers=async(req,res)=>{
    const result = await Users.find({}).sort({ UserID: 1 });
res.send(result)
 }
export {getusers}
const getvideos=async(req,res)=>{
    const result=await Video.find({})  
res.send(result)
 }
export {getvideos}
const getseries1 = async (req, res) => {
    try {
        const result = await Video.find({ isSeries: "true" });
        res.send(result);
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).send('Internal Server Error');
    }
};
export {getseries1}
const getmovies = async (req, res) => {
    try {
        const result = await Video.find({ isSeries: "false" });
        res.send(result);
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).send('Internal Server Error');
    }
};
export {getmovies}
const getgroundvideos = async (req, res) => {
    const { UploadBy } = req.query;
    try {
      const result = await Video.find({ UploadBy });
      res.send(result);
    } catch (error) {
      console.error('Error fetching videos:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  export { getgroundvideos };
const getvdoreq=async(req,res)=>{
    const result = await Videoreq.find({});
res.send(result)
 }
export {getvdoreq}
const getdashcount = async (req, res) => {
    try {
        const userCount = await Users.countDocuments();
        const movieCount = await Video.countDocuments({ isSeries: false });
        const seriesCount = await Video.countDocuments({ isSeries: true });

        res.json({
            userCount,
            movieCount,
            seriesCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};
export {getdashcount};