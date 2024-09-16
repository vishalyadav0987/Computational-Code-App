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
    useColorModeValue,
    HStack,
    Box,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    Image,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    InputLeftElement,
    InputRightElement,
    Text
} from '@chakra-ui/react'
import { FaFileUpload } from 'react-icons/fa'
import { MdLink, MdOutlineTitle } from "react-icons/md";
import { TbCirclesRelation } from "react-icons/tb";
import { GoRepoPush } from "react-icons/go";
import usePreviewImage from '../../useCustomHook/usePreviewImage'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, pushProjectK } from '../../redux/actions/devspaceActions';
import toast from 'react-hot-toast';
import { PUSH_NEW_PROJECT_RESET } from '../../redux/constants/DevspaceConstants';

const PushProject = ({ isOpen, onClose }) => {
    const fileRef = useRef(null);
    const dispatch = useDispatch();
    const { error, loading, message, isCreated } = useSelector(state => state.pushProject)
    const { imageChangeHandle, imageUrl, setImageUrl } = usePreviewImage()
    const [projectData, setProjectData] = useState({
        projectTitle: "",
        websiteUrl: "",
        githubUrl: "",
        projectRelatedTo: "",
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setProjectData((prev) => ({
            ...prev,   // Keep the existing state
            [name]: value,  // Update the specific field by name
        }));
    };

    const pushProjectHandler = async (e) => {
        console.log("click")
        e.preventDefault();
        const formData = new FormData();
        formData.set("projectTitle", projectData.projectTitle)
        formData.set("websiteUrl", projectData.websiteUrl)
        formData.set("githubUrl", projectData.githubUrl)
        formData.set("projectRelatedTo", projectData.projectRelatedTo)

        if (imageUrl) {
            formData.append("frontImage", imageUrl);
        }

        dispatch(pushProjectK(formData));

    }
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
        if (isCreated) {
            toast.success(message);
            dispatch({ type: PUSH_NEW_PROJECT_RESET })
            onClose();
        }

    }, [isCreated, error, dispatch])


    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="full" >
            <ModalOverlay />
            <ModalContent position={"relative"}>
                <form >
                    <ModalHeader>Upload Project</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody width={"100%"}>
                        <Flex width={"80%"}
                            margin={"0 auto"}
                            p={10} py={16} gap={4} alignItems={"start"}>
                            <Box
                                onClick={() => fileRef.current.click()}
                                cursor={"pointer"}
                                border={"1px dashed #c7c7c7"}
                                width={"400px"} height={"400px"}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                            >
                                {imageUrl && <Flex>
                                    <Image
                                        rounded={'md'}
                                        alt={'feature image'}
                                        src={imageUrl}
                                        objectFit={'cover'}
                                    />
                                </Flex>}
                                {!imageUrl && (
                                    <>
                                        <FaFileUpload
                                            fontSize={50}
                                        />
                                        <Text fontWeight={"bold"} size={"md"}>Upload Fornt Page</Text>
                                    </>
                                )}
                                <Input type='file' hidden ref={fileRef} onChange={imageChangeHandle} />
                            </Box>

                            <Flex
                                // minH={'100vh'}
                                width={"50%"}
                                align={'center'}
                                justify={'center'}
                            // bg={useColorModeValue('gray.50', 'gray.800')}
                            >
                                <Stack
                                    spacing={4}
                                    w={'full'}
                                    maxW={'lg'}

                                    rounded={'xl'}
                                >

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
                                    <FormControl id="text" isRequired>
                                        <FormLabel>Webiste URL</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents='none' color='gray.300' fontSize='1.2em'>
                                                <MdLink />
                                            </InputLeftElement>
                                            <Input placeholder='Website url'
                                                name='websiteUrl'
                                                onChange={onChangeHandler}
                                                value={projectData.websiteUrl}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl id="password" isRequired>
                                        <FormLabel>Github URL</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents='none' color='gray.300' fontSize='1.2em'>
                                                <MdLink />
                                            </InputLeftElement>
                                            <Input
                                                placeholder='ttps://github.com/vishalyadav0987/Job-Apply'
                                                name='githubUrl'
                                                onChange={onChangeHandler}
                                                value={projectData.githubUrl}
                                            />
                                        </InputGroup>

                                    </FormControl>
                                    <FormControl id="password" isRequired>
                                        <FormLabel>Related To</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents='none' color='gray.300' fontSize='1.2em'>
                                                <TbCirclesRelation />
                                            </InputLeftElement>
                                            <Input
                                                placeholder='mern-stack'
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
                            isLoading={loading}
                            display={"flex"}
                            alignItems={"center"}
                            gap={2}
                            position={"absolute"}
                            bottom={"10px"}
                            onClick={pushProjectHandler}
                        >
                            <GoRepoPush />
                            <Text>Push</Text>
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default PushProject
