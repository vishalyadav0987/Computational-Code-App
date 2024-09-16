const DevSchema = require('../modals/DevSchema');
const UserSchema = require('../modals/UserSchema');
const cloudinary = require('cloudinary').v2

const pushProject = async (req, res) => {
    const { projectTitle, websiteUrl, githubUrl, projectRelatedTo } = req.body;
    let { frontImage } = req.body;
    try {
        const userId = req.user;
        if (!projectTitle || !websiteUrl || !githubUrl || !projectRelatedTo) {
            return res.json({
                success: false,
                message: "Please fill required Fields."
            })
        }
        const project = await DevSchema.findOne({ websiteUrl });
        if (project) {
            return res.json({
                success: false,
                message: "Project already Present With Link",
            })
        }
        const userExsist = await UserSchema.findById(userId);
        if (!userExsist) {
            return res.json({
                success: false,
                message: "User not Found.",
            })
        }

        if (userExsist?._id.toString() !== userId.toString()) {
            return res.json({
                success: false,
                message: "Un-Authorized to create post.",
            })
        }

        if (frontImage) {
            const uploadPostImage = await cloudinary.uploader.upload(frontImage);;
            frontImage = uploadPostImage.secure_url;
        }

        const newProject = new DevSchema({
            projectTitle,
            websiteUrl,
            githubUrl,
            projectRelatedTo,
            pushedUserId: userId,
            frontImage
        });


        await newProject.save();

        res.json({
            success: true,
            message: "Project Successfully pushed.",
            data: newProject,
        })

    } catch (error) {
        console.log("Error in pushProject function ->", error.message);
        res.json({ success: false, message: error.message })
    }
};

const getAllprojectList = async (req, res) => {
    try {
        const projects = await DevSchema.find({}).populate('pushedUserId', 'fullname username profile');
        res.json({
            success: true,
            data: projects,
        });

    } catch (error) {
        console.log("Error in getAllprojectList function ->", error.message);
        res.json({ success: false, message: error.message })
    }
};

const getAllProjectOfUser = async (req, res) => {
    try {
        const userId = req.user;
        const userExsist = await UserSchema.findById(userId);
        if (!userExsist) {
            return res.json({
                success: false,
                message: "User not Found.",
            })
        }
        const projects = await DevSchema.find({ pushedUserId: userId });
        if (!projects) {
            return res.json({
                success: false,
                message: "You have not pushed any Project!!",
            })
        }

        res.json({
            success: true,
            data: projects,
        });


    } catch (error) {
        console.log("Error in getAllProjectOfUser function ->", error.message);
        res.json({ success: false, message: error.message })
    }
};

const likeDislikeProject = async (req, res) => {
    try {
        const userId = req.user; // Ensure user is authenticated
        const { projectID } = req.params;

        const project = await DevSchema.findById(projectID);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found.",
            });
        }

        const userLikedProject = project.likes.includes(userId);
        if (userLikedProject) {
            await DevSchema.updateOne({ _id: projectID }, { $pull: { likes: userId } });
            const updatedProject = await DevSchema.findById(projectID); // Fetch updated project
            return res.json({
                success: true,
                likes: updatedProject.likes, // Return updated likes array
                message: "Project unliked.",
            });
        } else {
            project.likes.push(userId);
            await project.save();
            return res.json({
                success: true,
                likes: project.likes, // Return updated likes array
                message: "Project liked.",
            });
        }
    } catch (error) {
        console.error("Error in likeDislikeProject:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};



const incrementProjectViews = async (req, res) => {
    const { projectID } = req.params;
    console.log("Received request to increment views for project ID: ", projectID); // Log the incoming projectID

    try {
        const project = await DevSchema.findByIdAndUpdate(
            { _id: projectID },
            { $inc: { noOfView: 1 } },
            { new: true }
        );

        if (!project) {
            console.log("Project not found"); // Log if project is not found
            return res.status(404).json({
                success: false,
                message: 'Project not found',
            });
        }

        res.json({
            success: true,
            data: {
                noOfView: project.noOfView
            }
        });
    } catch (error) {
        console.error('Error incrementing view count:', error.message); // Log the error message
        res.status(500).json({
            success: false,
            error: error.message, // Include the actual error message in the response
        });
    }
};


const getSingleProject = async (req, res) => {
    const { id } = req.params;
    try {
        const SingleProject = await DevSchema.findById(id);

        if (!SingleProject) {
            return res.json({ success: true, message: "Project not found" });
        }

        res.json({ success: true, data: SingleProject });
    } catch (error) {
        console.log("Error in getSingleProject function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong, Product is not fetched",
            error: error.message
        });
    }
}

const updateProjectDetails = async (req, res) => {
    const { projectTitle, websiteUrl, githubUrl, projectRelatedTo } = req.body;
    let { frontImage } = req.body;
    const { projectID } = req.params;
    try {
        const userId = req.user;

        // Validate required fields
        if (!projectTitle || !websiteUrl || !githubUrl || !projectRelatedTo || !projectID) {
            return res.json({
                success: false,
                message: "Please fill required Fields."
            });
        }

        // Find the project
        const project = await DevSchema.findOne({ _id: projectID });
        if (!project) {
            return res.json({
                success: false,
                message: "Project not Found",
            });
        }

        // Check if the user exists
        const userExsist = await UserSchema.findById(project?.pushedUserId);
        if (!userExsist) {
            return res.json({
                success: false,
                message: "User not Found.",
            });
        }

        // Check authorization
        if (userExsist?._id.toString() !== userId.toString()) {
            return res.json({
                success: false,
                message: "Unauthorized to update project.",
            });
        }

        // Upload the image if provided
        if (frontImage) {
            const uploadPostImage = await cloudinary.uploader.upload(frontImage);
            frontImage = uploadPostImage.secure_url;
        }

        // Update the project details
        const updatedProject = await DevSchema.findByIdAndUpdate(
            projectID,
            {
                projectTitle,
                websiteUrl,
                githubUrl,
                projectRelatedTo,
                frontImage: frontImage || project.frontImage, // retain old image if no new image
            },
            { new: true } // Return the updated project
        );

        res.json({
            success: true,
            message: "Project successfully updated.",
            data: updatedProject,
        });

    } catch (error) {
        console.log("Error in updateProjectDetails function ->", error.message);
        res.json({ success: false, message: error.message });
    }
};


const deleteProject = async (req, res) => {
    const { projectID } = req.params; // Assume projectID is provided in the request body

    try {
        const userId = req.user; // Assuming the user ID is available in req.user

        // Find the project by ID
        const project = await DevSchema.findById(projectID);
        if (!project) {
            return res.json({
                success: false,
                message: "Project not found.",
            });
        }

        // Check if the user is authorized to delete the project
        const userExsist = await UserSchema.findById(project?.pushedUserId);
        if (!userExsist) {
            return res.json({
                success: false,
                message: "User not found.",
            });
        }

        if (userExsist._id.toString() !== userId.toString()) {
            return res.json({
                success: false,
                message: "Unauthorized to delete the project.",
            });
        }

        // Delete the project
        await DevSchema.findByIdAndDelete(projectID);

        res.json({
            success: true,
            message: "Project successfully deleted.",
        });

    } catch (error) {
        console.log("Error in deleteProject function ->", error.message);
        res.json({ success: false, message: error.message });
    }
};


module.exports = {
    pushProject,
    getAllprojectList,
    getAllProjectOfUser,
    likeDislikeProject,
    incrementProjectViews,
    updateProjectDetails,
    deleteProject,
    getSingleProject,
}