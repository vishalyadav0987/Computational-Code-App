'use client';
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import '../../index.css';
import GradientCursor from '../GradientCursor/GradientCursor';
import { useState } from 'react';
import useAnimation from '../../Animation/Animation';

const Feature = ({ title, text, icon }) => {
    return (
        <Stack>
            <Flex
                w={16}
                h={16}
                align={'center'}
                justify={'center'}
                color={'white'}
                rounded={'full'}
                bg={'gray.100'}
                mb={1}>
                {icon}
            </Flex>
            <Text fontWeight={600}>{title}</Text>
            <Text color={'gray.600'}>{text}</Text>
        </Stack>
    );
};

export default function Statistics() {
    const { motion,
        handleMouseMove,
        handleMouseLeave,
        boxShadow,
        isHovered,
        setIsHovered,
        rotateX,
        rotateY,
    } = useAnimation("#6674cc");

    return (
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
                zIndex: 5
            }}
        >
            <GradientCursor isVisible={isHovered} color1={"#6674cc"} />
            <SimpleGrid
                columns={{ base: 1, md: 3 }}
                spacing={10}
                style={{
                    transform: 'translateZ(75px)',
                    transformStyle: 'preserve-3d'
                }}
            >
                <Feature

                    icon={<Icon as={FcAssistant} w={10} h={10} />}
                    title={'Lifetime Support'}
                    text={
                        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                    }
                />
                <Feature
                    icon={<Icon as={FcDonate} w={10} h={10} />}
                    title={'Unlimited Donations'}
                    text={
                        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                    }
                />
                <Feature
                    icon={<Icon as={FcInTransit} w={10} h={10} />}
                    title={'Instant Delivery'}
                    text={
                        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                    }
                />
            </SimpleGrid>
        </motion.div>
    );
}
