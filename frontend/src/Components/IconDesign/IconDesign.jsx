import { Box } from '@chakra-ui/react';
import React from 'react'
import { MdOutlineRocketLaunch } from "react-icons/md";

const IconDesign = ({ color }) => {
    return (
        <Box fontSize={"30px"}
            borderRadius={"50%"}
            width={"80px"}
            height={"80px"}
            border={`1px solid ${color}`}
            textAlign={"center"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            background={"#0f1d2b"}
            mb={"50px"}
            position={"absolute"}
            boxShadow={`${color} 0px 7px 29px 0px`}
            top={"-8%"}
            left={"5%"}
            zIndex={10}
        >
            <MdOutlineRocketLaunch style={{
                color: `${color}`
            }} />
        </Box >
    )
}

export default IconDesign
