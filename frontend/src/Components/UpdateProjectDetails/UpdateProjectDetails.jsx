import React, { useRef } from 'react'
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
import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { MdLink, MdOutlineTitle } from "react-icons/md";
import { TbCirclesRelation } from "react-icons/tb";
import { GoRepoPush } from "react-icons/go";

const imag = ""

const UpdateProjectDetails = ({onClose,isOpen}) => {
    const fileRef = useRef(null);
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="full">
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader>Update Project Deatail</ModalHeader>
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
                            >
                                {imag && <Flex>
                                    <Image
                                        rounded={'md'}
                                        alt={'feature image'}
                                        src={
                                            'https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                                        }
                                        objectFit={'cover'}
                                    />
                                </Flex>}
                                <FaFileUpload
                                    onClick={() => fileRef.current.click()}
                                    fontSize={50}
                                />
                                <Text fontWeight={"bold"} size={"md"}>Upload Fornt Page</Text>
                                <Input type='file' hidden ref={fileRef} />
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
                                            <Input placeholder='Project Title' />
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl id="text" isRequired>
                                        <FormLabel>Webiste URL</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents='none' color='gray.300' fontSize='1.2em'>
                                                <MdLink />
                                            </InputLeftElement>
                                            <Input placeholder='Website url' />
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
                                                placeholder='ttps://github.com/vishalyadav0987/Job-Appl' />
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
                                                placeholder='ttps://github.com/vishalyadav0987/Job-Appl' />
                                        </InputGroup>

                                    </FormControl>

                                </Stack>
                            </Flex>

                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button bg={"#ed8936"}
                            display={"flex"}
                            alignItems={"center"}
                            gap={2}
                        >
                            <GoRepoPush />
                            <Text>Push</Text>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateProjectDetails
