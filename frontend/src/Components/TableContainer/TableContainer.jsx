import { EditIcon } from '@chakra-ui/icons';
import {
    Button,
    Flex,
    Spinner,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import UpdateProjectDetails from '../UpdateProjectDetails/UpdateProjectDetails';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, deleteProject, getAllProjectOfUser, getSingleProject } from '../../redux/actions/devspaceActions';
import toast from 'react-hot-toast';
import { DELETE_PROJECT_RESET } from '../../redux/constants/DevspaceConstants';

const TableContainerX = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const { projects, loading, error } = useSelector(state => state.getAllProject);
    const { error: deleteError, isDeleted } = useSelector(state => state.deleteAndUpdate);
    const { error: singleError, product } = useSelector(state => state.singleProduct);

    const [loadingProjectId, setLoadingProjectId] = useState(null);
    const [projectId, setProjectId] = useState("");

    const setProjectIdHandle = (id) => {
        setProjectId(id);
        onOpen();
    };

    const deleteHandle = async (projectID) => {
        setLoadingProjectId(projectID);
        await dispatch(deleteProject(projectID));
        setLoadingProjectId(null);
    };

    useEffect(() => {
        if (error) {
            toast.error(error, { style: { zIndex: 1500 } }); // Increase z-index
            dispatch(clearError());
        }
        if (deleteError) {
            toast.error(deleteError, { style: { zIndex: 1500 } }); // Increase z-index
            dispatch(clearError());
        }
        if (isDeleted) {
            toast.success("Project successfully removed");
            dispatch({ type: DELETE_PROJECT_RESET });
        }
        if (singleError) {
            toast.error(singleError);
            dispatch(clearError());
        }
        dispatch(getSingleProject(projectId));
        dispatch(getAllProjectOfUser());
    }, [error, deleteError, dispatch, isDeleted, singleError, projectId]); // Include projectId in dependency array
    return (
        <>
            <TableContainer fontFamily={'monospace !important'} fontSize={"16px"} width={"100%"}>
                {loading ? (
                    <Flex
                        width={"100%"}
                        h={"100%"}
                        mt={"50px"}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <Spinner size={"lg"} />
                    </Flex>
                ) : (
                    <Table variant="simple">
                        <TableCaption>A list of your pushed projects</TableCaption>
                        <Thead>
                            <Tr borderBottom="2px solid black">
                                <Th>Date</Th>
                                <Th>Title</Th>
                                <Th>Related</Th>
                                <Th textAlign={"center"}>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {projects && projects.length > 0 && projects.map((project) => (
                                <Tr borderBottom="1px solid black" key={project._id}>
                                    <Td>
                                        {new Date(project.createdAt).toLocaleDateString()} {/* Better date handling */}
                                    </Td>
                                    <Td>{project.projectTitle}</Td>
                                    <Td>{project.projectRelatedTo}</Td>
                                    <Td
                                        display={"flex"}
                                        gap={2}
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                    >
                                        <Button onClick={() => setProjectIdHandle(project._id)}>
                                            <EditIcon />
                                        </Button>
                                        <Button
                                            isLoading={loadingProjectId === project._id}
                                            onClick={() => deleteHandle(project._id)}
                                        >
                                            <FaRegTrashAlt />
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                )}
            </TableContainer>
            <UpdateProjectDetails isOpen={isOpen} onClose={onClose} product={product} />
        </>
    );
};

export default TableContainerX;
