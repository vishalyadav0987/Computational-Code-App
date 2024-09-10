import React from 'react';
import { Flex, Box, Text, Button, Tooltip, Image } from '@chakra-ui/react';
import { MdAssignmentInd } from 'react-icons/md';
import { GrAlarm } from "react-icons/gr";
import { FaPlay } from "react-icons/fa6";
import { IoIosCloudUpload } from "react-icons/io";
import logo from '../../assets/logo-4.png';

const Topbar = () => {
    return (
        <Flex
            alignItems="center"
            justify="space-between"
            px={3}
            py={2}
            pb={0}
            color="white"
        >
            <Box width={"230px"}>
                {/* <Image src={logo}
                    cursor={"pointer"} width={"100px"}
                    height={"30px"}
                /> */}
                Logo
            </Box>
            <Flex alignItems={"center"} width={"220px"}>
                <Tooltip label="Run" aria-label='A tooltip' bg={"#262626"} color={"white"}>
                    <Button
                        variant="solid"
                        size="sm"
                        mr={"1px"}
                        borderTopEndRadius={"0"}
                        borderBottomEndRadius={"0"}
                        leftIcon={<FaPlay fontSize={"16px"} />}

                    >
                        Run
                    </Button>
                </Tooltip>
                <Tooltip label="Submit" aria-label='A tooltip' bg={"#262626"} color={"white"}>
                    <Button
                        borderTopStartRadius={"0"}
                        borderBottomStartRadius={"0"}
                        variant="solid"
                        size="sm"
                        mr={1}
                        color={"green"}
                        leftIcon={<IoIosCloudUpload fontSize={"16px"} />}

                    >
                        Submit
                    </Button>
                </Tooltip>
                <Tooltip label="Timer" aria-label='A tooltip' bg={"#262626"} color={"white"}>
                    <Button
                        variant="solid"
                        size="sm"
                    >
                        <GrAlarm />
                    </Button>
                </Tooltip>
            </Flex>
            <Flex align="center">
                <Flex alignItems="center">
                    <Button
                        variant="solid"
                        colorScheme={'orange'}
                        bg={'orange.400'}
                        _hover={{ bg: 'orange.500' }}
                        size="sm"
                        mr={4}
                        leftIcon={<MdAssignmentInd fontSize={"16px"} />}

                    >
                        Premium
                    </Button>
                </Flex>
                <Flex alignItems="center">
                    <Button
                        variant="solid"
                        colorScheme={'orange'}
                        bg={'orange.400'}
                        _hover={{ bg: 'orange.500' }}
                        size="sm"
                        leftIcon={<MdAssignmentInd fontSize={"16px"} />}

                    >
                        Sign in
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Topbar;
