import Users from "../models/Usermodel.js";
import CryptoJS from 'crypto-js';
import ID from '../models/AdminIDmodel.js';
import VID from "../models/VideoID.js";
import Video from "../models/vediomodel.js";
import Videoreq from "../models/videorequest.js";
const createuser = async (req, res) => {
    const { Username, Usermail, DateofBirth, Password, Profilepic } = req.body; // Use Profilepic here
    try {
        const existingUser = await Users.findOne({ Usermail });
        if (existingUser) {
            return res.status(409).send('User Already Exists');
        }

        let UserID;
        let isUnique = false;
        while (!isUnique) {
            UserID = Math.floor(Math.random() * (10000 - 7777 + 1)) + 7777;
            const existID = await ID.findOne({ UserID });
            if (!existID) {
                isUnique = true;
            }
        }
        await ID.create({ UserID });

        // Encrypt the password
        const Secret_key = process.env.Secret_key;
        const EPassword = CryptoJS.AES.encrypt(Password, Secret_key).toString();

        // Create the new user
        const newUser = await Users.create({ Username, Usermail, DateofBirth, EPassword, UserID, Profilepic }); // Use Profilepic here

        // Respond with success
        res.status(201).send('User Created Successfully');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user. Please try again later.');
    }
};

export { createuser };
const finduser = async (req, res) => {
    const { Usermail, Password } = req.body;
    try {
        const user = await Users.findOne({ Usermail });
        if (!user) {
            return res.status(404).send("User not exists"); 
        }
        const DPassword = CryptoJS.AES.decrypt(user.EPassword, process.env.Secret_key).toString(CryptoJS.enc.Utf8);
        if (DPassword !== Password) {
            return res.status(401).send("Incorrect password"); 
        }
        res.json(user);
    } catch (error) {
        console.error(error); 
        res.status(500).send("Internal Server Error");
    }
};
export { finduser };
const removeVideo = async (req, res) => {
    const { VideoID } = req.body;
    try {
        const video = await Video.findOneAndDelete({ VideoID });

        if (!video) {
            return res.status(404).send('Video not found');
        }

        res.send('Video deleted Successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};
export {removeVideo};
const deleteUser = async (req, res) => {
    const { Usermail } = req.body; 
    try {
        const userToDelete = await Users.findOne({ Usermail:Usermail });
        if (!userToDelete) {
    
            return res.status(404).send('User not found');
        }
        await Users.deleteOne({ Usermail });
        res.send('User deleted successfully');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
};
export {deleteUser};
const delVdoReq = async (req, res) => {
    const { title } = req.body;
    try {
        const video = await Videoreq.findOneAndDelete({ title });

        if (!video) {
            return res.status(404).send('Video not found');
        }

        res.send('Video deleted Successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};
export {delVdoReq};
const createvideoreq = async (req, res) => {
    const { title, videoUrl, thumbnailUrl, genre, duration, isSeries, UploadBy } = req.body;
    try {
        let VideoID = 0;
        do {
            VideoID = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
            const existingVideo = await VID.findOne({ VideoID }); 
            if (existingVideo) {
                VideoID = 0; 
            }
        } while (VideoID === 0);
        await VID.create({ VideoID });
        const newMovie = await Videoreq.create({ title, videoUrl, thumbnailUrl, genre, duration, isSeries, UploadBy, VideoID });
        res.send('Request Added Successfully');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
};
export { createvideoreq };
const createvideo = async (req, res) => {
    const { title, videoUrl, thumbnailUrl, genre, duration, isSeries, UploadBy } = req.body;
    try {
        // Generate random VideoID
        let VideoID = 0;
        do {
            VideoID = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
            const existingVideo = await VID.findOne({ VideoID }); 
            if (existingVideo) {
                VideoID = 0; 
            }
        } while (VideoID === 0);
        await VID.create({ VideoID });
        const newMovie = await Video.create({ title, videoUrl, thumbnailUrl, genre, duration, isSeries, UploadBy, VideoID });
        res.send('Video Added Successfully');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
};

export { createvideo };