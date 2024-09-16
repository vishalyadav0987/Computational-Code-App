import {
    Box,
    Avatar,
    Text,
    Button,
    Flex,
    Icon,
    Tag,
    HStack,
    VStack,
    Divider,
    Spinner,
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaGlobe, FaGithub, FaEye, FaHeart, FaCheckCircle, FaStar, FaCode, FaArrowRight } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import StreakPage from '../../Components/StreakPage'
import { IoReceipt } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import toast from 'react-hot-toast'
import { clearError, getSingleUserDeatils } from '../../redux/actions/userActions'

ChartJS.register(ArcElement, Tooltip, Legend);

const UserProfile = () => {
    const { username } = useParams()
    const dispatch = useDispatch();
    const { user, error, loading } = useSelector(state => state.singleUser);
    const data = {
        labels: ['Easy', 'Medium', 'Hard'],
        datasets: [
            {
                label: 'Solved',
                data: [45, 30, 25], // Example data for problems solved
                backgroundColor: ['#4CAF50', '#FF9800', '#F44336'], // Colors for each section
                borderWidth: 1,
            },
        ],
    };
    const options = {
        plugins: {
            legend: {
                display: false, // Hides the legend
            },
            tooltip: {
                enabled: true, // Hides tooltips on hover
            },
        },
    };
    const questionName = [
        { name: "Minimum time to complete trip", ago: "9 hour" },
        { name: "Two sum", ago: "8 hour" },
        { name: "Three sum", ago: "6 hour" },
        { name: "Three sum", ago: "6 hour" },
        { name: "Three sum", ago: "6 hour" },
        { name: "Three sum", ago: "6 hour" },
        { name: "Three sum", ago: "6 hour" },
        { name: "Three sum", ago: "6 hour" },
        { name: "Three sum", ago: "6 hour" },
        { name: "Three sum", ago: "6 hour" },
        { name: "Three sum", ago: "6 hour" },
        { name: "Three sum", ago: "6 hour" },
        { name: "Three sum", ago: "6 hour" },
        { name: "Three sum", ago: "6 hour" },
    ]

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError())
        }
        dispatch(getSingleUserDeatils(username))
    }, [dispatch, error, username])
    return (
        <Box width={"100%"} >
            <Box
                width={"70%"}
                margin={"0 auto"}
                display={"flex"}
                py={8}
                gap={5}
            >
                {
                    loading ?
                        (
                            <Flex width={"100vw"} height={"60vh"}
                                alignItems={"center"}
                                justifyContent={"center"}>
                                <Spinner size={"lg"} />
                            </Flex>
                        ) : (
                            <>
                                <Flex flex={0.25} bg={"#262626"}
                                    // height={"120%"}
                                    borderRadius={"6px"}>
                                    <Box
                                        maxW="sm"
                                        borderRadius="6px"
                                        overflow="hidden"
                                        p={4}
                                        boxShadow="md"

                                    >
                                        {/* Profile Pic and Name */}
                                        <Flex alignItems="center" mb={4} >
                                            <Avatar size="lg" name="proficPic"
                                                src={user && user?.profile?.profilePic}
                                            />
                                            <Box ml={3}>
                                                <Text fontSize="lg" fontWeight="bold">
                                                    {user && user?.fullname}
                                                </Text>
                                                <Text color="gray.500">
                                                    @{user && user?.username}
                                                </Text>
                                            </Box>
                                        </Flex>

                                        {/* Description */}
                                        <Text mb={4}>
                                            {user && user?.profile?.bio || <Text color={"#afafaf"}>Dummy: ''Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam explicabo, harum magnam at, deleniti animi iure labore dignissimos sit aspernatur voluptatem vel tenetur quaerat repellat nihil a numquam fugiat. Quidem consequuntur quod molestiae recusandae. ''</Text>}
                                        </Text>

                                        {/* Edit Button */}
                                        {
                                            user && user?.username === username && (
                                                <Link to={`/user/update-profile/${user?.username}`}>
                                                    <Button
                                                        width={"100%"}
                                                        bg={"#ed8936"}
                                                        color={"white"} size="sm" mb={4}>
                                                        Edit Profile
                                                    </Button>
                                                </Link>
                                            )
                                        }

                                        <Divider my={3} mt={1}></Divider>
                                        {/* Location */}
                                        <Flex alignItems="center" mb={2}>
                                            <Icon as={FaMapMarkerAlt} color="gray.600" mr={2} />
                                            <Text>
                                                {user && user?.profile?.location ||
                                                    <Text color={"#afafaf"}>Dummy: New York, USA</Text>
                                                }
                                            </Text>
                                        </Flex>

                                        {/* Website URL */}
                                        <Flex alignItems="center" mb={2}>
                                            <Icon as={FaGlobe} color="gray.600" mr={2} />
                                            <Text _hover={{
                                                color: "#ed8936"
                                            }}>
                                                {<a href={user && user?.profile?.websiteURL}
                                                    target='_blank'
                                                    style={{
                                                        textDecoration: "none"
                                                    }}
                                                >
                                                    {user && user?.profile?.websiteURL}
                                                </a> ||
                                                    <Text color={"#afafaf"} noOfLines={1}
                                                        _hover={{
                                                            color: "#ed8936"
                                                        }}
                                                    >
                                                        Dummy: https://johns-website.com
                                                    </Text>
                                                }
                                            </Text>
                                        </Flex>

                                        {/* GitHub URL */}
                                        <Flex alignItems="center" mb={2}>
                                            <Icon as={FaGithub} color="gray.600" mr={2} />
                                            <Text _hover={{
                                                color: "#ed8936"
                                            }}>
                                                {<a
                                                    style={{
                                                        textDecoration: "#ed8936"
                                                    }}
                                                    href={user && user?.profile?.githubURL}>{
                                                        user && user?.profile?.githubURL}</a> ||
                                                    <Text color={"#afafaf"} noOfLines={1}>
                                                        Dummy: github.com/johndoe
                                                    </Text>
                                                }
                                            </Text>
                                        </Flex>

                                        <Divider my={3} mt={1}></Divider>

                                        {/* Skills */}
                                        <Flex alignItems="center" mb={4}
                                            width={"300px"}>
                                            <Icon as={FaCode} color="gray.600" mr={2} />
                                            <HStack spacing={2} flexWrap={"wrap"}>
                                                {
                                                    user && user.profile?.skills?.length > 0 ?
                                                        user.profile?.skills?.map((skill, index) => {
                                                            return (
                                                                <>
                                                                    <Tag key={index}>{skill}</Tag>
                                                                </>
                                                            )
                                                        }) : <>
                                                            <Tag>Reactjs</Tag>
                                                            <Tag>Cpp</Tag>
                                                            <Tag>Nodejs</Tag>
                                                        </>
                                                }
                                            </HStack>
                                        </Flex>

                                        {/* Community Stats */}
                                        <VStack alignItems="flex-start" spacing={2} mb={4}>
                                            <Flex alignItems="center">
                                                <Icon as={FaEye} color="gray.600" mr={2} />
                                                <Text>Views: 1200</Text>
                                            </Flex>
                                            <Flex alignItems="center">
                                                <Icon as={FaHeart} color="gray.600" mr={2} />
                                                <Text>Likes: 300</Text>
                                            </Flex>
                                            <Flex alignItems="center">
                                                <Icon as={FaCheckCircle} color="gray.600" mr={2} />
                                                <Text>Solutions: 45</Text>
                                            </Flex>
                                            <Flex alignItems="center">
                                                <Icon as={FaStar} color="gray.600" mr={2} />
                                                <Text>Reputation: 1500</Text>
                                            </Flex>
                                        </VStack>
                                        <Divider my={3} mt={1}></Divider>
                                        {/* Languages */}
                                        <Box>
                                            <Text fontWeight="bold" mb={4}>
                                                Languages
                                            </Text>
                                            <Text mb={4}><Tag>Cpp</Tag> 56 Problems</Text>
                                            <Text mb={4}><Tag>JavaScript</Tag> 1 Problem</Text>
                                        </Box>
                                        <Divider my={3} mt={1}></Divider>
                                    </Box>
                                </Flex>

                                <Box width={"100%"}>
                                    <Flex
                                        flex={1}
                                        gap={5}
                                        width={"100%"}
                                    >
                                        <Flex
                                            flex={1}
                                            bg={"#262626"}
                                            borderRadius={"6px"}
                                            height={"28%"}
                                            overflow="hidden"
                                            p={4}
                                            boxShadow="md"
                                            alignItems="center"
                                            justifyContent={"space-around"}
                                        >
                                            {/* Pie Chart on the Left */}
                                            <Box width="130px" height="130px" display="flex" alignItems="center" justifyContent="center">
                                                <Pie data={data} options={options} />
                                            </Box>

                                            {/* Difficulty Levels with Count on the Right */}
                                            <Box pl={4}>
                                                <Box mb={2}>
                                                    <Button fontWeight="500" color="green.500" fontSize={"14px"}>
                                                        <Box>
                                                            <Text mb={"1px"}>Easy</Text>
                                                            <Text mb={1} color={"white"}>45/100</Text>
                                                        </Box>
                                                    </Button>
                                                </Box>
                                                <Box mb={2}>
                                                    <Button fontWeight="500" color="orange.500" fontSize={"14px"}>
                                                        <Box>
                                                            <Text mb={"1px"}>Medium</Text>
                                                            <Text mb={1} color={"white"}>30/100</Text>
                                                        </Box>
                                                    </Button>
                                                </Box>
                                                <Box>
                                                    <Button fontWeight="500" color="red.500" fontSize={"14px"}>
                                                        <Box>
                                                            <Text mb={"1px"}>Hard</Text>
                                                            <Text mb={1} color={"white"}>25/100</Text>
                                                        </Box>
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Flex>
                                        <Flex
                                            flex={1}
                                            bg={"#262626"}
                                            borderRadius={"6px"}
                                            height={"28%"}
                                            overflow="hidden"
                                            p={4}
                                            boxShadow="md"
                                            alignItems="center"
                                            justifyContent={"space-around"}

                                        >
                                            {/* Pie Chart on the Left */}
                                            <Box width="130px" height="130px" display="flex" alignItems="center" justifyContent="center">
                                                <Pie data={data} options={options} />
                                            </Box>

                                            {/* Difficulty Levels with Count on the Right */}
                                            <Box pl={4}>
                                                <Box mb={2}>
                                                    <Button fontWeight="500" color="green.500" fontSize={"14px"}>
                                                        <Box>
                                                            <Text mb={"1px"}>Easy</Text>
                                                            <Text mb={1} color={"white"}>45/100</Text>
                                                        </Box>
                                                    </Button>
                                                </Box>
                                                <Box mb={2}>
                                                    <Button fontWeight="500" color="orange.500" fontSize={"14px"}>
                                                        <Box>
                                                            <Text mb={"1px"}>Medium</Text>
                                                            <Text mb={1} color={"white"}>30/100</Text>
                                                        </Box>
                                                    </Button>
                                                </Box>
                                                <Box>
                                                    <Button fontWeight="500" color="red.500" fontSize={"14px"}>
                                                        <Box>
                                                            <Text mb={"1px"}>Hard</Text>
                                                            <Text mb={1} color={"white"}>25/100</Text>
                                                        </Box>
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Flex>
                                    </Flex>
                                    <StreakPage />
                                    <Box bg={"#2d2d2d"}
                                        mt={6} borderRadius={"6px"}
                                        px={4} py={3}
                                    >
                                        <Flex
                                            mb={3}
                                            className='header'
                                            width={"100%"}
                                            justifyContent={"space-between"}
                                            alignItems={"center"}
                                        >
                                            <Box>
                                                <Button leftIcon={<IoReceipt />} py={7}>
                                                    Recent Ac
                                                </Button>
                                            </Box>
                                            <Flex

                                                transition={"color 0.3s ease"}

                                                alignItems={"center"}
                                                _hover={{
                                                    color: "#718088"
                                                }} gap={"2px"} align={"center"} color={"#b4bdc2"} fontSize={"12px"}>
                                                <Text fontWeight={"600"}>View all question</Text>
                                                <IoIosArrowForward style={{ marginTop: "2px" }} />
                                            </Flex>
                                        </Flex>
                                        <Box>
                                            {
                                                questionName.map((question, index) => {
                                                    return (
                                                        <Flex
                                                            cursor={"pointer"}
                                                            p={5}
                                                            key={index}
                                                            borderRadius={"6px"}
                                                            alignItems={"center"}
                                                            justifyContent={"space-between"}
                                                            bg={index % 2 === 0 && "#3d3d3d"}
                                                        >
                                                            <Text
                                                                fontWeight={"600"}
                                                                fontSize={"14px"}
                                                            >{question.name}</Text>
                                                            <Text
                                                                color={"#b4bdc2"} fontSize={"12px"}
                                                            >{question.ago}</Text>
                                                        </Flex>
                                                    )
                                                })
                                            }
                                        </Box>
                                    </Box>
                                </Box>

                            </>
                        )
                }

            </Box>
        </Box>
    )
}

export default UserProfile
