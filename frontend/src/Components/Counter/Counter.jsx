'use client'

import {
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react'
import useAnimation from '../../Animation/Animation';
import GradientCursor from '../GradientCursor/GradientCursor';
import AnimatedCircles from '../AnimatedCircles/AnimatedCircles';
import CountUp from 'react-countup';


function StatsCard(props) {
  const { title, stat, tag } = props
  return (
    <Stat
      px={{ base: 4, md: 12 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <StatLabel fontWeight={'medium'} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
        <CountUp
          start={0}
          end={Number(stat)}
          duration={3}
        />{" "} {tag}
      </StatNumber>
    </Stat>
  )
}

export default function BasicStatistics() {
  const { motion,
    handleMouseMove,
    handleMouseLeave,
    boxShadow,
    isHovered,
    setIsHovered,
    rotateX,
    rotateY,
  } = useAnimation("#ed8936");
  return (
    <>
      {/* <AnimatedCircles /> */}

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
          position: "relative",
          zIndex: 5,
        }}
      >

        <GradientCursor isVisible={isHovered} color1={"#ed8936"} />
        <SimpleGrid
          style={{
            transform: 'translateZ(75px)',
            transformStyle: 'preserve-3d'
          }}
          columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }} >
          <StatsCard title={'We serve'} stat={'5000'} tag={"people"} />
          <StatsCard title={'In'} stat={'30'} tag={"different countries"} />
          <StatsCard title={'Who speak'} stat={'100'} tag={"different languages"} />
        </SimpleGrid>
      </motion.div>
    </>
  )
}