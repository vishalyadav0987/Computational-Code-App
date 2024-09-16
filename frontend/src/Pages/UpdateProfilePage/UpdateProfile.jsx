import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Flex,
    Avatar,
    Input,
    Textarea,
    Button,
    Icon,
    VStack,
    HStack,
    Tag,
    FormControl,
    FormLabel,
    Text,
} from '@chakra-ui/react';
import toast from 'react-hot-toast'
import { FaMapMarkerAlt, FaGlobe, FaGithub, FaCode, FaPlus, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { clearError, getSingleUserDeatils, updateProfile } from '../../redux/actions/userActions'
import usePreviewImage from '../../useCustomHook/usePreviewImage';
import { UPDATE_PROFILE_RESET } from '../../redux/constants/userConstants';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProfile = () => {
    const navigate = useNavigate()
    const { username } = useParams()
    // State for the form fields
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const { imageChangeHandle, imageUrl, setImageUrl } = usePreviewImage();
    const { user, error } = useSelector(state => state.singleUser);
    const { error: updateError, isUpdated, loading } = useSelector(state => state.updateProfile)
    const [profile, setProfile] = useState({
        fullname: '',
        username: '',
        bio: '',
        location: '',
        websiteURL: '',
        githubURL: '',
        skills: [],
    });

    // Handler to update state based on form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    // Handler to update skills
    const handleSkillChange = (e, index) => {
        const newSkills = [...profile.skills];
        newSkills[index] = e.target.value;
        setProfile((prev) => ({ ...prev, skills: newSkills }));
    };

    // Handler to add a new skill
    const handleAddSkill = () => {
        setProfile((prev) => ({ ...prev, skills: [...prev.skills, ''] }));
    };

    // Handler to remove a skill
    const handleRemoveSkill = (index) => {
        const newSkills = [...profile.skills];
        newSkills.splice(index, 1);
        setProfile((prev) => ({ ...prev, skills: newSkills }));
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("fullname", profile.fullname)
        formData.set("username", profile.username)
        formData.set("bio", profile.bio)
        formData.set("location", profile.location)
        formData.set("skills", profile.skills)
        formData.set("websiteURL", profile.websiteURL)
        formData.set("githubURL", profile.githubURL)
        if (imageUrl) {
            formData.append("profilePic", imageUrl)
        }
        dispatch(updateProfile(formData))
    }
    useEffect(() => {
        if (user) {
            setProfile({
                fullname: user?.fullname || "",
                username: user?.username || "",
                bio: user?.profile?.bio || "",
                location: user?.profile?.location || "",
                websiteURL: user?.profile?.websiteURL || "",
                githubURL: user?.profile?.githubURL || "",
                skills: user?.profile?.skills || [],
            })
            setImageUrl(user?.profile?.profilePic)

        }
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
        if (updateError) {
            toast.error(updateError);
            dispatch(clearError());
        }
        if (isUpdated) {
            toast.success("Profile Succesfully updated");
            navigate(`/user/${user?.username}`)
            dispatch({ type: UPDATE_PROFILE_RESET })
        }
        dispatch(getSingleUserDeatils(username))
    }, [dispatch, error, isUpdated, updateError, navigate, username])




    return (
        <Flex
            borderRadius={"6px"}
            p={6} justify="center"
            width={"100%"}
            alignItems={"center"}
            height={"calc(100vh - 130px)"}
        >
            <form onSubmit={handleUpdateProfile} style={{ width: "100%", }}>
                <Box
                    bg={"#262626"}
                    width={"80%"}
                    borderRadius="6px"
                    overflow="hidden"
                    p={4}
                    boxShadow="md"
                    color="#fffeff"
                    margin={"0 auto"}
                >
                    {/* Profile Picture */}
                    <Flex gap={5}>
                        <Box className='left'>
                            <Flex alignItems="center" mb={4} gap={2}>
                                <Avatar size="lg"
                                    cursor={"pointer"}
                                    name={profile.fullname}
                                    src={
                                        imageUrl && imageUrl
                                    } onClick={() => fileRef.current.click()} />
                                <Input type='file' hidden
                                    ref={fileRef}
                                    onChange={imageChangeHandle}
                                />
                                <Box ml={3}>
                                    <Input
                                        name="fullname"
                                        value={profile.fullname}
                                        onChange={handleChange}
                                        placeholder="Full Name"
                                        fontSize="lg"
                                        fontWeight="bold"
                                        mb={1.5}
                                    />
                                    <Input
                                        name="username"
                                        value={profile.username}
                                        onChange={handleChange}
                                        placeholder="Username"
                                        color="gray.500"
                                    />
                                </Box>
                            </Flex>

                            {/* Description */}
                            <FormControl mb={4}>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    name="bio"
                                    value={profile.bio}
                                    onChange={handleChange}
                                    placeholder="Write something about yourself..."
                                />
                            </FormControl>

                            {/* Location */}
                            <FormControl mb={2}>
                                <FormLabel>Location</FormLabel>
                                <Flex alignItems="center">
                                    <Icon as={FaMapMarkerAlt} color="gray.400" mr={2} />
                                    <Input
                                        name="location"
                                        value={profile.location}
                                        onChange={handleChange}
                                        placeholder="Location"
                                    />
                                </Flex>
                            </FormControl>
                            {/* Languages */}
                            <Box mb={4}>
                                <Text fontWeight="bold" mb={4}>
                                    Languages
                                </Text>
                                <Text mb={4}><Tag>Cpp</Tag> 56 Problems</Text>
                                <Text mb={4}><Tag>JavaScript</Tag> 1 Problem</Text>
                            </Box>
                        </Box>

                        {/* Website URL */}
                        <Box className='right'>
                            <FormControl mb={2}>
                                <FormLabel>Website URL</FormLabel>
                                <Flex alignItems="center">
                                    <Icon as={FaGlobe} color="gray.400" mr={2} />
                                    <Input
                                        name="websiteURL" // Changed from "website" to "websiteUrl"
                                        value={profile.websiteURL}
                                        onChange={handleChange}
                                        placeholder="Website URL"
                                    />
                                </Flex>
                            </FormControl>

                            {/* GitHub URL */}
                            <FormControl mb={2}>
                                <FormLabel>GitHub URL</FormLabel>
                                <Flex alignItems="center">
                                    <Icon as={FaGithub} color="gray.400" mr={2} />
                                    <Input
                                        name="githubURL"
                                        value={profile.githubURL}
                                        onChange={handleChange}
                                        placeholder="GitHub URL"
                                    />
                                </Flex>
                            </FormControl>

                            {/* Skills */}
                            <FormControl mb={4}>
                                <FormLabel>Skills</FormLabel>
                                {profile.skills.map((skill, index) => (
                                    <Flex key={index} mb={2}>
                                        <Icon as={FaCode} color="gray.400" mr={2} />
                                        <Input
                                            value={skill}
                                            onChange={(e) => handleSkillChange(e, index)}
                                            placeholder="Skill"
                                        />
                                        <Button ml={2} size="sm" onClick={() => handleRemoveSkill(index)}>
                                            <FaTrash />
                                        </Button>
                                    </Flex>
                                ))}
                                <Button ml={6} size="sm" onClick={handleAddSkill}>
                                    <FaPlus />
                                </Button>
                            </FormControl>


                        </Box>
                    </Flex>

                    {/* Save Button */}
                    <Button
                        type='submit'
                        isLoading={loading}
                        _hover={{
                            bg: "orange.500"
                        }} width={"100%"} bg={"#ed8936"} color={"white"} size="md">
                        Save Changes
                    </Button>
                </Box>
            </form>
        </Flex>
    );
};

export default UpdateProfile;
