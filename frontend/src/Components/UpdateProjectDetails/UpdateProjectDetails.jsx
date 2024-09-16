import React, { useEffect, useRef, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Box,
    Image,
    InputGroup,
    InputLeftElement,
    Text,
    useDisclosure
} from '@chakra-ui/react'
import { FaFileUpload } from 'react-icons/fa'
import { MdLink, MdOutlineTitle } from "react-icons/md";
import { TbCirclesRelation } from "react-icons/tb";
import { GoRepoPush } from "react-icons/go";
import usePreviewImage from '../../useCustomHook/usePreviewImage';
import { useSelector, useDispatch } from 'react-redux';
import { updateProject, clearError } from '../../redux/actions/devspaceActions';
import toast from 'react-hot-toast';
import { UPDATE_PROJECT_DETIALS_RESET } from '../../redux/constants/DevspaceConstants';

const UpdateProjectDetails = ({ onClose, isOpen, product }) => {
    const fileRef = useRef(null);
    const { imageChangeHandle, imageUrl, setImageUrl } = usePreviewImage();
    const { loading, error, isUpdated } = useSelector(state => state.deleteAndUpdate);
    const dispatch = useDispatch();

    const [projectData, setProjectData] = useState({
        projectTitle: "",
        websiteUrl: "",
        githubUrl: "",
        projectRelatedTo: "",
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setProjectData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const updateProjectHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("projectTitle", projectData.projectTitle);
        formData.set("websiteUrl", projectData.websiteUrl);
        formData.set("githubUrl", projectData.githubUrl);
        formData.set("projectRelatedTo", projectData.projectRelatedTo);

        if (imageUrl) {
            formData.append("frontImage", imageUrl);
        }

        dispatch(updateProject(product?._id, formData));
    };

    useEffect(() => {
        if (product) {
            setProjectData({
                projectTitle: product.projectTitle,
                websiteUrl: product.websiteUrl,
                githubUrl: product.githubUrl,
                projectRelatedTo: product.projectRelatedTo,
            });
            setImageUrl(product.frontImage); // Update imageUrl for preview
        }
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
        if (isUpdated) {
            toast.success('Project updated successfully');
            onClose();
            dispatch({ type: UPDATE_PROJECT_DETIALS_RESET });
        }
    }, [isUpdated, error, dispatch, product, onClose, setImageUrl]);


    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="full">
            <ModalOverlay />
            <ModalContent position={"relative"}>
                <form onSubmit={updateProjectHandler} >
                    <ModalHeader>Update Project Detail</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody width={"100%"}>
                        <Flex width={"80%"}
                            margin={"0 auto"}
                            p={10} py={16} gap={4} alignItems={"start"}>
                            <Box
                                cursor={"pointer"}
                                border={"1px dashed #c7c7c7"}
                                width={"400px"} height={"400px"}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                onClick={() => fileRef.current.click()}
                            >
                                {imageUrl ? (
                                    <Flex>
                                        <Image
                                            rounded={'md'}
                                            alt={'feature image'}
                                            src={imageUrl}
                                            objectFit={'cover'}
                                        />
                                        <Input type='file' hidden ref={fileRef}
                                            onChange={imageChangeHandle} />
                                    </Flex>
                                ) : (
                                    <Flex direction="column" align="center" justify="center">
                                        <FaFileUpload fontSize={50} />
                                        <Text fontWeight={"bold"} size={"md"}>Upload Front Page</Text>
                                    </Flex>
                                )}
                            </Box>

                            <Flex width={"50%"} align={'center'} justify={'center'}>
                                <Stack spacing={4} w={'full'} maxW={'lg'} rounded={'xl'}>
                                    <Heading>Project Detail</Heading>
                                    <FormControl id="userName" isRequired>
                                        <FormLabel>Title</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents='none' color='gray.300' fontSize='1.2em'>
                                                <MdOutlineTitle />
                                            </InputLeftElement>
                                            <Input placeholder='Project Title'
                                                name='projectTitle'
                                                onChange={onChangeHandler}
                                                value={projectData.projectTitle}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl id="websiteUrl" isRequired>
                                        <FormLabel>Website URL</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents='none' color='gray.300' fontSize='1.2em'>
                                                <MdLink />
                                            </InputLeftElement>
                                            <Input placeholder='Website URL'
                                                name='websiteUrl'
                                                onChange={onChangeHandler}
                                                value={projectData.websiteUrl}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl id="githubUrl" isRequired>
                                        <FormLabel>Github URL</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents='none' color='gray.300' fontSize='1.2em'>
                                                <MdLink />
                                            </InputLeftElement>
                                            <Input placeholder='Github URL'
                                                name='githubUrl'
                                                onChange={onChangeHandler}
                                                value={projectData.githubUrl}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl id="projectRelatedTo" isRequired>
                                        <FormLabel>Related To</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents='none' color='gray.300' fontSize='1.2em'>
                                                <TbCirclesRelation />
                                            </InputLeftElement>
                                            <Input placeholder='mern-stack'
                                                name='projectRelatedTo'
                                                onChange={onChangeHandler}
                                                value={projectData.projectRelatedTo}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                </Stack>
                            </Flex>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button bg={"#ed8936"}
                            type="submit"
                            isLoading={loading}
                            display={"flex"}
                            alignItems={"center"}
                            gap={2}
                            position={"absolute"}
                            bottom={"15px"}
                        >
                            <GoRepoPush />
                            <Text>Update</Text>
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default UpdateProjectDetails
