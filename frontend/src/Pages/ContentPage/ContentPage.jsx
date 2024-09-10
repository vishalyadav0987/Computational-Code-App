import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Flex, Heading, Text, Button, Stack, Divider, Code, VStack, HStack, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { TiStarOutline } from 'react-icons/ti';
import PreferenceNav from './PreferenceNav';
import ProblemDescription from './ProblemDescription';
import SettingsModal from './SettingsModal';
import Clock from './Clock';
import Topbar from './Topbar';
import UserEmail from './UserMail';

const ContentPage = () => {
  const [isFullScreen, setIsFullScreen] = useState(false); // State for managing full-screen mode
  const containerRef = useRef(null); // Ref for the container element
  useEffect(() => {
    // Listener for the 'Escape' key to exit full-screen mode
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isFullScreen) {
        exitFullScreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullScreen]);
  const enterFullScreen = () => {
    if (containerRef.current.requestFullscreen) {
      containerRef.current.requestFullscreen();
    } else if (containerRef.current.mozRequestFullScreen) { // Firefox
      containerRef.current.mozRequestFullScreen();
    } else if (containerRef.current.webkitRequestFullscreen) { // Chrome, Safari, Opera
      containerRef.current.webkitRequestFullscreen();
    } else if (containerRef.current.msRequestFullscreen) { // IE/Edge
      containerRef.current.msRequestFullscreen();
    }
    setIsFullScreen(true);
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
    setIsFullScreen(false);
  };

  const toggleFullScreen = () => {
    if (isFullScreen) {
      exitFullScreen();
    } else {
      enterFullScreen();
    }
  };
  return (
    <>

      <Box ref={containerRef}>
        <Box
          width={"100%"}
          bg={'black'}
          height={"40px"}
        >
          <Topbar />
        </Box>
        {/* <UserEmail /> */}
        {/* <PreferenceNav /> */}
        <ProblemDescription toggleFullScreen={toggleFullScreen} />
        {/* <SettingsModal /> */}
        {/* <Clock /> */}
      </Box>
    </>
  );
};

export default ContentPage;
