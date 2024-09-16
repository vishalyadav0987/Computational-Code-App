'use client'

import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    Avatar,
    Flex,
    Tag,
} from '@chakra-ui/react'
import Actions from '../Actions/Actions'
import { IoMdEye } from 'react-icons/io'
import { formatDistanceToNow } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { clearError, incrementViews } from '../../redux/actions/devspaceActions'


export default function ExploreCard({ project }) {
    const dispatch = useDispatch();
    const { views, error } = useSelector((state) => state.views);

    const handleClickIncrementView = (id, link) => {
        dispatch(incrementViews(id)).then(() => {
            window.open(link, "_blank");
        }).catch((error) => {
            console.error('Error incrementing views:', error);
        });
    };

    // Access specific view count for the project
    const viewCount = views[project._id] || project.noOfView;

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
        console.log("Updated views: ", views); // Debugging line
    }, [dispatch, error, views]);

    return (
        <Center py={10}>
            <Box role={'group'}
                px={6}
                py={4}
                maxW={'330px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}
                cursor="pointer">
                <Box
                    onClick={() => handleClickIncrementView(project?._id, project?.websiteUrl)}
                >
                    <Box
                        rounded={'lg'}
                        mt={-12}
                        pos={'relative'}
                        height={'230px'}
                        _after={{
                            transition: 'all .3s ease',
                            content: '""',
                            w: 'full',
                            h: 'full',
                            pos: 'absolute',
                            top: 5,
                            left: 0,
                            filter: 'blur(2px)',
                            zIndex: -1,
                        }}
                        _groupHover={{
                            _after: {
                                filter: 'blur(5px)',
                            },
                        }}>
                        <Image
                            rounded={'lg'}
                            height={230}
                            width={282}
                            objectFit={'cover'}
                            src={project && project?.frontImage}
                            alt="#"
                        />
                    </Box>
                    <Stack pt={10} align={'start'} mb={3}>
                        <Flex
                            color={'gray.500'}
                            fontSize={'sm'}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            width={"100%"}
                        >
                            <Tag>{project?.projectRelatedTo}</Tag>
                            <Text display={"flex"} alignItems={"center"} gap={1}>
                                {viewCount} <IoMdEye fontSize={"16px"} />
                            </Text>
                        </Flex>
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                            {project?.projectTitle}
                        </Heading>
                    </Stack>
                    <Stack my={3} direction={'row'} spacing={4} align={'center'}>
                        <Avatar src={project?.pushedUserId?.profile?.profilePic}
                            onClick={(e) => e.preventDefault()}
                        />
                        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                            <a href={`/user/${project?.pushedUserId?.username}`}
                                style={{
                                    textDecoration: "none",
                                    transition: "all 0.3s ease"
                                }}
                                target='_blank'
                            >
                                <Text
                                    _hover={{
                                        color: "#ed8936"
                                    }}
                                    textDecoration={"none"}
                                    fontWeight={600}>{project?.pushedUserId?.username}</Text>
                            </a>
                            <Text color={'gray.500'}>
                                {new Date(project.createdAt).toLocaleDateString()} · {" "}
                                {formatDistanceToNow(new Date(project?.createdAt))}
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
                <Actions project={project} />
            </Box>
        </Center>
    )
}
