const generateAndSetToken = require("../generateAndSetToken/generateAndSetToken");
const UserSchema = require("../modals/UserSchema");
const bcryptjs = require('bcryptjs');
const cloudinary = require('cloudinary').v2;


// REGISTER - BOTH --- USER and RECRUTER
const register = async (req, res) => {
    const { fullname, username, email, password, } = req.body;
    try {

        if (!fullname || !email || !password || !username) {
            return res.json({
                success: false,
                message: "All fields are required!"
            });
        }

        // Check if user already exists
        const userExists = await UserSchema.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (userExists) {
            return res.json({
                success: false,
                message: "User already exists with this email or username!",
            });
        }



        const hassedPassword = await bcryptjs.hash(password, 10);

        const newUser = new UserSchema({
            fullname,
            email,
            password: hassedPassword,
            username,
        });

        await newUser.save();

        const token = generateAndSetToken(res, newUser._id);

        res.json({
            success: true,
            message: "User Succesfully registered.",
            data: {
                ...newUser._doc,
                password: undefined,
            },
            token,
        })
    } catch (error) {
        console.log("Error in Register function -> ", error.message);
        res.json({
            success: false,
            message: error.message,
        });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.json({
                success: false,
                message: "All fields are required!"
            });
        }

        const userExsits = await UserSchema.findOne({ email });
        if (!userExsits) {
            return res.json({
                success: false,
                message: "Invalid crendential!",
            });
        }

        const isMatch = await bcryptjs.compare(password, userExsits.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid crendential!",
            });
        }


        const token = generateAndSetToken(res, userExsits._id);

        res.json({
            success: true,
            data: {
                ...userExsits._doc,
                password: undefined,
            },
            token,
            message: "User Successfully logged in!"
        })

    } catch (error) {
        console.log("Error in login function -> ", error.message);
        res.json({
            success: false,
            message: error.message,
        });
    }
}

const logout = async (req, res) => {
    try {
        res.cookie("token", null, { maxAge: 1 });
        res.json({
            success: true,
            message: "User logout successfully.",
        })
    } catch (error) {
        console.log("Error in logout function ->", error.message);
        res.json({ success: false, message: error.message })
    }

}

// UPDATE PROFILE
const updateProfile = async (req, res) => {
    const { fullname, username, bio, skills, location, websiteURL, githubURL } = req.body;
    let { profilePic, resume } = req.body;
    const originNameResume = resume;

    try {
        const userId = req.user;

        // Check required fields
        if (!fullname || !username) {
            return res.status(400).json({
                success: false,
                message: "Fullname, and username are required!"
            });
        }

        // Find user by ID
        const user = await UserSchema.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }

        if (profilePic) {
            if (user.profile.profilePic) {
                await cloudinary.uploader.destroy(user.profile.profilePic.split('/').pop().split(".")[0])
            }
            const uploadProfileImg = await cloudinary.uploader.upload(profilePic);
            profilePic = uploadProfileImg.secure_url
        }
        if (resume) {
            if (user.profile?.resume) {
                await cloudinary.uploader.destroy(user.profile?.resume.split('/').pop().split(".")[0])
            }
            const uploadProfileImg = await cloudinary.uploader.upload(resume);
            resume = uploadProfileImg.secure_url
        }

        // Update user fields
        user.fullname = fullname;
        user.username = username;
        user.profile.bio = bio || user.profile.bio;
        user.profile.skills = Array.isArray(skills) ? skills : skills.split(",") || [];
        user.profile.profilePic = profilePic || user.profile.profilePic;
        user.profile.resume = resume || user.profile.resume || "";
        user.profile.resumeOriginalName = originNameResume || user.profile.resumeOriginalName || "";
        user.profile.location = location || user.profile.location;
        user.profile.websiteURL = websiteURL || user.profile.websiteURL;
        user.profile.githubURL = githubURL || user.profile.githubURL;

        await user.save();

        // Send success response
        res.json({
            success: true,
            message: "User successfully updated",
            data: {
                ...user._doc,
                password: undefined, // Exclude the password from the response
            }
        });

    } catch (error) {
        console.log("Error in updateProfile function -> ", error);
        res.status(500).json({
            success: false,
            error: "An error occurred during the profile update.",
        });
    }
};


const getUserOwnDetails = async (req, res) => {
    try {
        const userId = req.user;
        const userMe = await UserSchema.findById(userId);

        res.json({ success: true, data: userMe });
    } catch (error) {
        console.error("Error in getUserOwnDetails function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong!!",
            error: error.message
        });
    }
}
const getUserDetails = async (req, res) => {
    try {
        const userId = req.user;
        const { username } = req.params;
        const userMe = await UserSchema.findById(userId);
        if (username !== userMe?.username) {
            return res.json({
                success: false,
                message:"Ypu not access these route"
            })
        }
        res.json({ success: true, data: userMe });
    } catch (error) {
        console.error("Error in getUserOwnDetails function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong!!",
            error: error.message
        });
    }
}


module.exports = {
    register,
    login,
    logout,
    updateProfile,
    getUserOwnDetails,
    getUserDetails
}