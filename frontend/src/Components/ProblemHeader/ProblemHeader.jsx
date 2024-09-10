import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { MdOutlineDescription } from "react-icons/md";
import { GoBook } from "react-icons/go";
import { FaFlask } from "react-icons/fa6";
import { RxLapTimer } from "react-icons/rx";

const ProblemHeader = () => {
    return (
        <>
            <Box
                position={"fixed"}
                width={"48.5%"}
                h={"34px"}
                bg={"#333333"}
                borderRadius={"4px 4px 0 0"}
                display={"flex"}
                py={"4px"}
                pb={"3px"}
                gap={"5px"}
            >
                <Button
                ml={"6px"}
                _hover={{
                    borderRadius:"4px",
                    border:"none",
                    bg:"#718088"
                }}
                    borderRadius={0}
                    borderRight={"1px solid #fff"}
                    background={"transparent"}
                    width={"120px"} h={"25px"}
                    leftIcon={<MdOutlineDescription />}>
                    Description
                </Button>
                <Button
                 _hover={{
                    borderRadius:"4px",
                    border:"none",
                    bg:"#718088"
                }}
                    borderRadius={0}
                    borderRight={"1px solid #fff"}
                    background={"transparent"}
                    width={"120px"} h={"25px"}
                    leftIcon={<GoBook />}>
                    Editorial
                </Button>
                <Button
                 _hover={{
                    borderRadius:"4px",
                    border:"none",
                    bg:"#718088"
                }}
                    borderRadius={0}
                    borderRight={"1px solid #fff"}
                    background={"transparent"}
                    width={"120px"} h={"25px"}
                    leftIcon={<FaFlask />}>
                    Sloution
                </Button>
                <Button
                 _hover={{
                    borderRadius:"4px",
                    border:"none",
                    bg:"#718088"
                }}
                    borderRadius={0}
                    borderRight={"1px solid #fff"}
                    background={"transparent"}
                    width={"120px"} h={"25px"}
                    leftIcon={<RxLapTimer />}>
                    Submission
                </Button>
            </Box>
        </>
    )
}

export default ProblemHeader
