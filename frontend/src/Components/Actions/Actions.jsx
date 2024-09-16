import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { Box, Flex, Text } from "@chakra-ui/react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Actions = ({ project }) => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);
    const [liked, setLiked] = useState(project.likes?.includes(user?._id));
    const [projectData, setProjectData] = useState(project);
    const [loading, setLoading] = useState(false);

    const handleLikeUserPost = async () => {
        if (!user) {
            toast.error("You must be logged in to like a post", {
                className: 'custom-toast', // Custom class for styling
            });
            navigate('/auth/login');
            return;
        }

        if (loading) return;
        setLoading(true);

        // Optimistically update the UI before the request completes
        let updatedLikes;
        if (!liked) {
            updatedLikes = [...projectData.likes, user?._id];
            setProjectData({ ...projectData, likes: updatedLikes });
        } else {
            updatedLikes = projectData.likes.filter(id => id !== user?._id);
            setProjectData({ ...projectData, likes: updatedLikes });
        }
        setLiked(!liked);

        try {
            const response = await axios.post(
                `/api/v1/dev/project/like-and-dislike/${project?._id}`,
                {},
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.data.success) {
                toast.success(response.data.message, {
                    className: 'custom-toast',
                });
            } else {
                // Revert like state if the request fails
                setLiked(liked);
                toast.error(response.data.message, {
                    className: 'custom-toast',
                });
            }

        } catch (error) {
            // Revert like state if an error occurs
            setLiked(liked);
            toast.error("An error occurred while liking the project");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setProjectData(project);
        setLiked(project.likes?.includes(user?._id));
    }, [project, user]);

    return (
        <Flex justifyContent={"start"} width={"100%"} alignItems={"center"} gap={"10px"}>
            <Flex gap={3} my={2}>
                <svg
                    style={{ cursor: "pointer", transition: "color 0.3s ease" }}
                    aria-label='Like'
                    color={liked ? "rgb(237, 73, 86)" : "gray"}
                    fill={liked ? "rgb(237, 73, 86)" : "transparent"}
                    height='19'
                    role='img'
                    viewBox='0 0 24 22'
                    width='20'
                    onClick={handleLikeUserPost}
                >
                    <path
                        d='M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z'
                        stroke='currentColor'
                        strokeWidth='2'
                    ></path>
                </svg>
            </Flex>
            <Box className='bottom-part' px={"6px"}>
                <Box className='follower-info' display={"flex"} gap={1} color="#718088">
                    <Text>{projectData?.likes?.length || "0"} likes</Text>
                </Box>
            </Box>
        </Flex>
    );
};

export default Actions;
