'use client'

import {
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Button,
    Image,

} from '@chakra-ui/react'
import AnimatedButton from '../AnimatedButton/AnimatedButton'
import AnimatedBoxes from '../Animated/Animated'
import VerticalLines from '../VeticalLine/VerticalLines'
import { Link } from 'react-router-dom'



export default function HeroSection() {
    return (
        <Container maxW={'5xl'} position={"relative"} zIndex={"5"}>
            <VerticalLines />
            <AnimatedBoxes />
            <Stack
                textAlign={'center'}
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}>
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}>
                    A New Way{' '}
                    <Text as={'span'} color={'orange.400'}>
                        to learn
                    </Text>
                </Heading>
                <Text color={'gray.500'} maxW={'3xl'}>
                    Unlock your coding potential with hands-on challenges, real-time collaboration, and expert-led courses. Join our community of developers and turn your passion for coding into mastery today!
                </Text>
                <Stack spacing={6} direction={'row'}>
                    {/* <Button
                        rounded={'full'}
                        px={6}
                        colorScheme={'orange'}
                        bg={'orange.400'}
                        _hover={{ bg: 'orange.500' }}>
                        Get started
                    </Button> */}
                    <Link to={'/all/problemset'}>
                        <AnimatedButton value={"Get Started"} color={"#ed8936"} />
                        {/* <Button rounded={'full'} px={6}>
                        Create Account
                    </Button> */}
                    </Link>
                    <Link to={'/auth/register'}>
                        <AnimatedButton value={"Create Account"} color={"#fff"} />
                    </Link>
                </Stack>
                <Flex w={'full'} justifyContent={"center"}>
                    <Image width={"400px"} src='./hero1.png' />
                </Flex>
            </Stack>
            {/* <ScrollingDivs /> */}
        </Container>
    )
}