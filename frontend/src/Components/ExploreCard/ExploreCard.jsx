'use client'

import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    Avatar,
    Flex,
} from '@chakra-ui/react'
import Actions from '../Actions/Actions'
import { IoMdEye } from 'react-icons/io'

const IMAGE =
    'https://media.licdn.com/dms/image/D4D12AQE3FvBP8AuYZQ/article-cover_image-shrink_600_2000/0/1694524292210?e=2147483647&v=beta&t=nITcDqwaDc1vbY9STqr-KYmZV9kiJaNofC1cZyUmqwc'

export default function ExploreCard() {
    return (
        <Center py={10}>
            <Box
                role={'group'}
                px={6}
                py={4}
                maxW={'330px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                <Box
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}
                    height={'230px'}
                    _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: 'full',
                        h: 'full',
                        pos: 'absolute',
                        top: 5,
                        left: 0,
                        // backgroundImage: `url(${IMAGE})`,
                        filter: 'blur(2px)',
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                            filter: 'blur(5px)',
                        },
                    }}>
                    <Image
                        rounded={'lg'}
                        height={230}
                        width={282}
                        objectFit={'cover'}
                        src={IMAGE}
                        alt="#"
                    />
                </Box>
                <Stack pt={10} align={'start'} mb={3}>
                    <Flex
                        color={'gray.500'}
                        fontSize={'sm'} t
                        extTransform={'uppercase'}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        width={"100%"}
                    >
                        <Text>Brand</Text>
                        <Text
                            display={"flex"}
                            alignItems={"center"}
                            gap={1}>45 <IoMdEye fontSize={"16px"} /></Text>
                    </Flex>
                    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                        Nice Chair, pink
                    </Heading>
                </Stack>
                <Stack my={3} direction={'row'} spacing={4} align={'center'}>
                    <Avatar src={'https://avatars0.githubusercontent.com/u/1164541?v=4'} />
                    <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                        <Text fontWeight={600}>Achim Rolle</Text>
                        <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text>
                    </Stack>
                </Stack>
                <Actions />
            </Box>
        </Center>
    )
}