import React from 'react'
import { Box, Button, Flex, Grid, Heading, Tooltip, useDisclosure } from '@chakra-ui/react'
import { FaPlus, FaRegStar } from "react-icons/fa";
import ExploreCard from '../../Components/ExploreCard/ExploreCard';
import { Link } from 'react-router-dom';
import PushProject from '../PushProject/PushProject';

const Explore = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
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
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                </Grid>
            </Box>
            <PushProject isOpen={isOpen} onClose={onClose} />
        </Box>
    )
}

export default Explore
