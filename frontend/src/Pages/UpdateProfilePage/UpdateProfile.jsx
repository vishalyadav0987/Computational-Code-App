import React, { useState } from 'react';
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
import { FaMapMarkerAlt, FaGlobe, FaGithub, FaCode } from 'react-icons/fa';

const UpdateProfile = () => {
    // State for the form fields
    const [profile, setProfile] = useState({
        name: 'John Doe',
        username: 'johndoe',
        description: 'Passionate developer with a love for solving problems and creating impactful applications.',
        location: 'New York, USA',
        website: 'https://johns-website.com',
        github: 'github.com/johndoe',
        skills: ['React', 'Node.js', 'JavaScript'],
        languages: { Cpp: 56, JavaScript: 1 }
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

    return (
        <Flex
            borderRadius={"6px"}
            p={6} justify="center"
            width={"100%"}
            alignItems={"center"}
            height={"calc(100vh - 130px)"}
        >
            <Box
                bg={"#262626"}
                width={"80%"}
                borderRadius="6px"
                overflow="hidden"
                p={4}
                boxShadow="md"
                color="#fffeff"
            >
                {/* Profile Picture */}
                <Flex gap={5}>
                    <Box className='left'>
                        <Flex alignItems="center" mb={4} gap={2}>
                            <Avatar size="lg" name={profile.name} src="profile-pic-url" />
                            <Box ml={3}>
                                <Input
                                    name="name"
                                    value={profile.name}
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
                                name="description"
                                value={profile.description}
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
                            <Text fontWeight="bold" mb={2}>
                                Languages
                            </Text>
                            {Object.entries(profile.languages).map(([language, problems], index) => (
                                <Text key={index}>
                                    <Tag mb={1.5} color={"black"}>{language}</Tag> {problems} Problems
                                </Text>
                            ))}
                        </Box>
                    </Box>

                    {/* Website URL */}
                    <Box className='right'>
                        <FormControl mb={2}>
                            <FormLabel>Website URL</FormLabel>
                            <Flex alignItems="center">
                                <Icon as={FaGlobe} color="gray.400" mr={2} />
                                <Input
                                    name="website"
                                    value={profile.website}
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
                                    name="github"
                                    value={profile.github}
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
                                        Remove
                                    </Button>
                                </Flex>
                            ))}
                            <Button ml={6} size="sm" onClick={handleAddSkill}>
                                Add Skill
                            </Button>
                        </FormControl>


                    </Box>
                </Flex>

                {/* Save Button */}
                <Button _hover={{
                    bg: "orange.500"
                }} width={"100%"} bg={"#ed8936"} color={"white"} size="md">
                    Save Changes
                </Button>
            </Box>
        </Flex>
    );
};

export default UpdateProfile;
