'use client'

import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Icon,
    useColorModeValue,
} from '@chakra-ui/react'
import { IoAnalyticsSharp, IoLogoBitcoin, IoSearchSharp } from 'react-icons/io5'
import useAnimation from '../../Animation/Animation'
import GradientCursor from '../GradientCursor/GradientCursor'



const Feature = ({ text, icon, iconBg }) => {
    return (
        <Stack direction={'row'} align={'center'}>
            <Flex w={8} h={8} align={'center'} justify={'center'} rounded={'full'} bg={iconBg}>
                {icon}
            </Flex>
            <Text fontWeight={600}>{text}</Text>
        </Stack>
    )
}

export default function SimpleComponent() {
    const { motion,
        handleMouseMove,
        handleMouseLeave,
        boxShadow,
        isHovered,
        setIsHovered,
        rotateX,
        rotateY,
    } = useAnimation("#109fe7");
    return (
        <>
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                    padding: '80px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow,
                    // border:"1px solid #c5c5c5"
                    position: "relative",
                    zIndex: 1
                }}
            >
                <GradientCursor color1={"#109fe7"} isVisible={isHovered}/>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <Stack spacing={4}>
                        <Text
                            textTransform={'uppercase'}
                            color={'blue.400'}
                            fontWeight={600}
                            fontSize={'sm'}
                            bg={useColorModeValue('blue.50', 'blue.900')}
                            p={2}
                            alignSelf={'flex-start'}
                            rounded={'md'}>
                            Our Story
                        </Text>
                        <Heading>A digital Product design agency</Heading>
                        <Text color={'gray.500'} fontSize={'lg'}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                            eirmod tempor invidunt ut labore
                        </Text>
                        <Stack
                            spacing={4}
                            divider={
                                <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
                            }>
                            <Feature
                                icon={<Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />}
                                iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                                text={'Business Planning'}
                            />
                            <Feature
                                icon={<Icon as={IoLogoBitcoin} color={'green.500'} w={5} h={5} />}
                                iconBg={useColorModeValue('green.100', 'green.900')}
                                text={'Financial Planning'}
                            />
                            <Feature
                                icon={<Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />}
                                iconBg={useColorModeValue('purple.100', 'purple.900')}
                                text={'Market Analysis'}
                            />
                        </Stack>
                    </Stack>
                    <Flex>
                        <Image
                            rounded={'md'}
                            alt={'feature image'}
                            src={
                                './developer-2-removebg-preview.png'
                            }
                            objectFit={'cover'}
                        />
                    </Flex>
                </SimpleGrid>
            </motion.div>
        </>
    )
}