import React, { useEffect } from 'react'
import { Box, Button, Flex, Grid, Heading, Spinner, Tooltip, useDisclosure } from '@chakra-ui/react'
import { FaPlus, FaRegStar } from "react-icons/fa";
import ExploreCard from '../../Components/ExploreCard/ExploreCard';
import { Link } from 'react-router-dom';
import PushProject from '../PushProject/PushProject';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { clearError, getAllProjectList } from '../../redux/actions/devspaceActions';

const Explore = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const { projects, error, loading } = useSelector(state => state.getAllProject)
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError())
        }
        if (!isOpen) {
            dispatch(getAllProjectList());  // Re-fetch projects after the modal is closed
        }
    }, [error, dispatch, isOpen])
   
    return (
        <Box width={"100%"}>
            <Flex
                width={"80%"}
                margin={"0 auto"}
                py={10}
                pt={16}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Box>
                    <Heading mx={1} mt={2} size={"sm"} color={"#afafaf"}>Welcome to</Heading>
                    <Heading
                        fontSize={"48px"}
                        fontWeight={'600'}
                        color={"#ed8936"}
                    >
                        Developer Space
                    </Heading>
                </Box>
                <Flex alignItems={"center"} gap={3}>
                    <Tooltip hasArrow label='Your Project' bg='#323232' color={"#fff"} placement='top'>
                        <Heading
                            fontSize={"32px"}
                            fontWeight={'600'}
                            color={"#afafaf"}
                            cursor={"pointer"}
                        >
                            <Link to={'/user/all/projects'}>
                                <Button> <FaRegStar /></Button>
                            </Link>
                        </Heading>
                    </Tooltip>
                    <Tooltip
                        hasArrow label='Push Project' bg='#323232' color={"#fff"} placement='bottom'>
                        <Heading
                            fontSize={"32px"}
                            fontWeight={'600'}
                            color={"#afafaf"}
                            cursor={"pointer"}
                        >
                            <Button onClick={onOpen}> <FaPlus /></Button>
                        </Heading>
                    </Tooltip>
                </Flex>
            </Flex>
            <Box width={"80%"}
                margin={"0 auto"}>
                <Grid templateColumns='repeat(4, 1fr)' gap={4} rowGap={0}>
                    {
                        loading ?
                            (<Flex
                                width={"80vw"}
                                height={"70vh"}
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <Spinner size={"lg"} />
                            </Flex>) : <>
                                {
                                    projects && projects?.length > 0 &&
                                    projects.map((project) => {
                                        return (
                                            <>
                                                <ExploreCard
                                                    key={project?._id}
                                                    project={projects && project}
                                                />
                                            </>
                                        )
                                    })
                                }
                            </>
                    }
                </Grid>
            </Box>
            <PushProject isOpen={isOpen} onClose={onClose} />
        </Box>
    )
}

export default Explore
