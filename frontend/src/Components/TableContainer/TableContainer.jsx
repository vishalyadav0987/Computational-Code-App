import { EditIcon } from '@chakra-ui/icons'
import {
    Button,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import UpdateProjectDetails from '../UpdateProjectDetails/UpdateProjectDetails'
const applications = [{
    _id: "1",
    createdAt: "2024-09-08",
    title: "Clock Down",
    Related: "Mern-stack",
}]

const TableContainerX = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <TableContainer fontFamily={'monospace !important'} fontSize={"16px"}>
                <Table variant="simple">
                    <TableCaption>A list of your pushed project</TableCaption>
                    <Thead>
                        <Tr borderBottom="2px solid black">
                            <Th>Date</Th>
                            <Th>Title</Th>
                            <Th>Related</Th>
                            <Th textAlign={"center"}>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            applications && applications?.length > 0 &&
                            applications.map((application) => {
                                return (
                                    <Tr borderBottom="1px solid black" key={application?._id}>
                                        <Td>
                                            {
                                                applications &&
                                                application.createdAt.substring(0, 9)
                                                    .split("-")
                                                    .reverse()
                                                    .join("-")
                                            }
                                        </Td>
                                        <Td>{applications && application.title}</Td>
                                        <Td>{applications && application.Related}</Td>
                                        <Td
                                            display={"flex"}
                                            gap={2}
                                            alignItems={"center"}
                                            justifyContent={"center"}>
                                            <Button onClick={onOpen}><EditIcon /></Button>
                                            <Button><FaRegTrashAlt /></Button>
                                        </Td>
                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </TableContainer>
            <UpdateProjectDetails isOpen={isOpen} onClose={onClose} />
        </>
    )
}


export default TableContainerX;