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
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import { clearError, login } from '../../redux/actions/userActions'

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { loading, error, isAuthenticate, token, message } = useSelector(state => state.user);
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const loginHandler = async (e) => {
        e.preventDefault()
        dispatch(login(email, password))
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
            <form onSubmit={loginHandler}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Sign in to your account
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
                        <Stack spacing={4} width={"380px"}>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    focusBorderColor='#ed8936' type="email" placeholder='Enter email here' />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        focusBorderColor='#ed8936'
                                        type={showPassword ? 'text' : 'password'} placeholder='Enter password here'
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password} />
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
                                    bg={"#ed8936"}
                                    color={'white'}
                                    _hover={{
                                        bg: 'orange.500',
                                    }}>
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user? <Link to={'/auth/register'} style={
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