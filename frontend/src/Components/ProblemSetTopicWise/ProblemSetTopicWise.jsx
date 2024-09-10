import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';

const ProblemSetTopicWise = () => {
    return (
        <>
            <TableContainer>
                <Table bg={"#101010"} 
                border={"1px solid #27272a"} borderRadius={"8px"}>
                    <Thead>
                        <Tr>
                            {/* 8 Columns Header */}
                            <Th border={"1px solid #27272a"}>Status</Th>
                            <Th border={"1px solid #27272a"}>Problem</Th>
                            <Th border={"1px solid #27272a"}>Note</Th>
                            <Th border={"1px solid #27272a"}>Video</Th>
                            <Th border={"1px solid #27272a"}>Difficulty</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {/* Example Row */}
                        <Tr>
                            <Td border={"1px solid #27272a"}>Data 1</Td>
                            <Td border={"1px solid #27272a"}>Data 2</Td>
                            <Td border={"1px solid #27272a"}>Data 3</Td>
                            <Td border={"1px solid #27272a"}>Data 4</Td>
                            <Td border={"1px solid #27272a"}>Data 5</Td>
                        </Tr>
                        {/* Add more rows as needed */}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default ProblemSetTopicWise
