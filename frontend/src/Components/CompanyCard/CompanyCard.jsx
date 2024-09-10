'use client'

import {
    Box,
    Heading,
    Text,
    Img,
    Flex,
    Center,
    useColorModeValue,
    HStack,
} from '@chakra-ui/react'
import { BsArrowUpRight, BsHeartFill, BsHeart } from 'react-icons/bs'
import Logo from '../../assets/amazon.png'

export default function CompanyCard({ data }) {
    const { CompanyLogo, companyName, companyQuestion, description } = data;

    return (
        <Center>
            <Box
                display={"flex"}
                w="xs"
                rounded={'sm'}
                my={5}
                // mx={[0, 5]}
                overflow={'hidden'}
                bg="#2d2d2d"
                color={"white"}
                border={'1px'}
                borderColor="black"
                width={"600px"}
                boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 #1a1a1a')}>
                <Box h={'200px'} borderBottom={'1px'} borderColor="black" display={"flex"}
                    alignItems={"center"} justifyContent={"center"} px={4}>
                    <Img
                        src={
                            CompanyLogo || Logo
                        }
                        roundedTop={'sm'}
                        objectFit="cover"
                        width={"400px"}
                        alt={'Blog Image'}
                        borderRadius={"6px"}
                    />
                </Box>
                <Box>
                    <Box p={4}>
                        <Box bg="black" display={'inline-block'} px={2} py={1} color="white" mb={2}>
                            <Text fontSize={'xs'} fontWeight="medium">
                                {companyName}
                            </Text>
                        </Box>
                        <Heading fontSize={'2xl'} noOfLines={1}>
                            {companyQuestion}
                        </Heading>
                        <Text color={'gray.300'} noOfLines={2}>
                            {description}
                        </Text>
                    </Box>
                    <HStack borderTop={'1px'} color="#afafaf">
                        <Flex
                            p={4}
                            alignItems="center"
                            justifyContent={'space-between'}
                            roundedBottom={'sm'}
                            cursor={'pointer'}
                            w="full">
                            <Text fontSize={'md'} fontWeight={'semibold'}>
                                Tap to solve Questions
                            </Text>
                            <BsArrowUpRight />
                        </Flex>

                    </HStack>
                </Box>
            </Box>
        </Center>
    )
}