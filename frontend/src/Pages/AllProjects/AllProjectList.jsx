import React from 'react'
import TableContainerX from '../../Components/TableContainer/TableContainer'
import { Box, Heading } from '@chakra-ui/react';

const AllProjectList = () => {
    return (
        <>
            <Box p={16} pb={8} >
                <Heading
                    fontFamily={'monospace !important'}
                    mx={1} mt={2} size={"sm"} color={"#afafaf"}>Welcome to</Heading>
                <Heading fontFamily={'monospace !important'}
                    fontSize={"40px"}
                    fontWeight={'600'}
                    color={"#ed8936"}
                >
                    Project List
                </Heading>
            </Box>
            <Box px={16} >
                <TableContainerX />
            </Box>
        </>
    )
}

export default AllProjectList;
