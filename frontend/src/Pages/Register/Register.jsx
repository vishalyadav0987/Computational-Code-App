'use client'

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, register } from '../../redux/actions/userActions'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { loading, error, isAuthenticate, token, message } = useSelector(state => state.user);
    const [showPassword, setShowPassword] = useState(false);
    const [inputData, setInputData] = useState({
        fullname: "",
        username: "",
        password: "",
        email: "",
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputData((prev) => ({
            ...prev,
            [name]: value
        }));

    }

    const registerHandler = async (e) => {
        e.preventDefault();
        const userData = new FormData();
        userData.set("fullname", inputData.fullname)
        userData.set("username", inputData.username)
        userData.set("email", inputData.email)
        userData.set("password", inputData.password)

        dispatch(register(userData))
    }

    useEffect(() => {
        if (error) {
            console.log(error)
            toast.error(error);
            dispatch(clearError());
        }
        if (isAuthenticate) {
            toast.success(message)
            Cookies.set('token', token); // लॉगिन के बाद कुकीज़ में टोकन सेट करें
            navigate('/')
        }
    }, [error, isAuthenticate, navigate, dispatch])

    return (
        <Flex
            align={'center'}
            justify={'center'}
        >
            <form onSubmit={registerHandler}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Sign up
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool features ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.900')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <HStack>
                                <Box>
                                    <FormControl id="firstName" isRequired>
                                        <FormLabel>Name</FormLabel>
                                        <Input
                                            placeholder='Enter name'
                                            focusBorderColor='#ed8936'
                                            type="text"
                                            name='fullname'
                                            onChange={onChangeHandler}
                                            value={inputData.fullname}
                                        />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="lastName" isRequired>
                                        <FormLabel>Username</FormLabel>
                                        <Input
                                            placeholder='Enter username'
                                            focusBorderColor='#ed8936'
                                            type="text"
                                            name='username'
                                            onChange={onChangeHandler}
                                            value={inputData.username}
                                        />
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    placeholder='Enter email'
                                    focusBorderColor='#ed8936'
                                    type="email"
                                    name='email'
                                    onChange={onChangeHandler}
                                    value={inputData.email}
                                />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        focusBorderColor='#ed8936'
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder='Enter password'
                                        name='password'
                                        onChange={onChangeHandler}
                                        value={inputData.password}
                                    />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    type='submit'
                                    isLoading={loading}
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'#ed8936'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'orange.500',
                                    }}>
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user? <Link to={'/auth/login'} style={
                                        { color: "#4299e1" }
                                    }>Login</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </form>
        </Flex>
    )
}