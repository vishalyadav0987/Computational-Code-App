import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import HeroSection from '../../Components/HeroSection/HeroSection'
import Statistics from '../../Components/Statistics/Statistics'
import { Box, Button, Flex, Heading, Image, Text, Tooltip } from '@chakra-ui/react'
import BasicStatistics from '../../Components/Counter/Counter'
import SimpleComponent from '../../Components/Simple/SimpleComponent'
import IconDesign from '../../Components/IconDesign/IconDesign'
import CodeEditor from '../../Components/CodeEditor/CodeEditor'
import WithSpeechBubbles from '../../Components/Testomonial/Testomonial'
import Footer from '../../Components/Footer/Footer'
import { FaArrowUp } from 'react-icons/fa'

const Home = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    console.log(showButton)
    return (
        <Box width={"full"} position={"relative"}>

            <Navbar />
            <HeroSection />

            <Box width={"80%"} margin={"0 auto"} mb={"80px"}>
                <BasicStatistics />

            </Box>
            {/* <GradientCursor /> */}
            <Box width={"80%"} margin={"0 auto"} mb={"80px"} position={"relative"}>
                <IconDesign color={"#109fe7"} />
                <SimpleComponent />
            </Box>
            <Box width={"80%"} margin={"0 auto"} mb={"50px"}>
                <Statistics />
            </Box>
            <Heading textAlign={"center"} mb={"80px"}>Explore Innovation FruitboxFlex and Quick <br /> <Text color={"#ed8936"}>Compiler</Text></Heading>
            <Box width={"80%"} margin={"0 auto"} my={16} position={"relative"}>
                <IconDesign color={"#6674cc"} />
                <CodeEditor />
            </Box>
            <Box width={"100%"} >
                <Heading color={"#323232"} size={"md"} textAlign={"center"} my={"35px"}>50+ POWERFUL IN-BROWSER IDE TEMPLATES TO PRACTICE ON</Heading>
                <Flex margin={"0 auto"} mb={"50px"} gap={"30px"} width={"80%"} justifyContent={"center"}>
                    <Tooltip hasArrow label='MONGO DB' bg='#323232' color={"#fff"} placement='top'>
                        <Image src='./mongo.svg' width={"40px"} />
                    </Tooltip>
                    <Tooltip hasArrow label='EXPRESS' bg='#323232' color={"#fff"} placement='top'>
                        <Image src='./express.png' width={"40px"} />
                    </Tooltip>
                    <Tooltip hasArrow label='REACT' bg='#323232' color={"#fff"} placement='top'>
                        <Image src='./react.svg' width={"40px"} />
                    </Tooltip>
                    <Tooltip hasArrow label='NODE' bg='#323232' color={"#fff"} placement='top'>
                        <Image src='./node.svg' width={"40px"} />
                    </Tooltip>
                </Flex>
            </Box>
            <Box width={"80%"} margin={"0 auto"} my={16} position={"relative"}>
                <WithSpeechBubbles />
            </Box>
            {
                showButton && (
                    <Button className="scroll-to-top" onClick={scrollToTop} style={{
                        position:"fixed",
                        bottom:"10px",
                        borderRadius:"50%",
                        width:"60px",
                        height:"60px",
                        right:"10px"
                    }}>
                        <FaArrowUp color='white' fontSize={"18px"}  />
                    </Button>
                )
            }
            <Footer />
        </Box>
    )
}

export default Home
