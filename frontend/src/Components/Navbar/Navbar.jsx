import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    HStack,
    IconButton,
    Button,
    useDisclosure,
    Image,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Tooltip,
    Avatar,
    Spinner,
    Popover,
    PopoverTrigger,
    Divider,
    Portal,
    PopoverContent,
    PopoverArrow,
    PopoverHeader,
    PopoverCloseButton,
    PopoverBody,
    Text,
} from '@chakra-ui/react';
import { ImProfile } from "react-icons/im";
import { IoIosLogOut } from "react-icons/io";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { MdAssignmentInd } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo-4.png';
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userActions';


const Links = [
    { tag: "Home", link: "/" },
    { tag: "Devspace", link: "/explore/developer-space" },
    { tag: "Problems", link: "/all/problemset" },
    { tag: `Interview`, link: "/" },
    { tag: `Company`, link: "/asked-question/company" },
];

const interviewLinks = [
    { tag: "Placement question", link: "/interview/placement/question" },
    { tag: "Love Babbar", link: "/interview/dsa-sheet/l" },
    { tag: "Striver's", link: "/interview/dsa-sheet/s" },
    { tag: "Topic Wise", link: "/topic-related/dsa-sheet" },
];

export default function Navbar({ token }) {
    const location = useLocation();
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [colorLink, setLinkColor] = useState("Home");
    const { user, isAuthenticate, loading } = useSelector(state => state.user)

    if (loading) {
        return (
            <>
                <Flex h={"100vh"} align={"center"} justifyContent={"center"} width={"100%"}>
                    <Spinner size={"lg"} />
                </Flex>
            </>
        )
    }

    const handleLogout = async () => {
        dispatch(logout())
    }

    return (
        <>
            <Box px={4}>
                <Flex h={16} alignItems="center" justifyContent="space-between">
                    <IconButton
                        size="md"
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label="Open Menu"
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems="center">
                        <Link to={'/'}>
                            <Image cursor={"pointer"} width={"140px"} src={logo || "./logo-4.png"} />
                        </Link>
                        <HStack as="nav" spacing={5} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) =>
                                link.tag === "Interview" ? (
                                    <Menu key={link.tag}>
                                        <Tooltip bg={"#323232"} color={"white"}
                                            label="Interview preparation" aria-label='A tooltip'
                                        >
                                            <MenuButton
                                                as={Button}
                                                rightIcon={<IoIosArrowDown />}
                                                // variant="link"
                                                bg={"transparent"} _hover={{
                                                    bg: "none", color: "#ed8936"
                                                }}
                                                onClick={() => setLinkColor(link?.tag)}
                                                borderRadius={"none"}
                                            >

                                                {link.tag}

                                            </MenuButton>
                                        </Tooltip>
                                        <MenuList bg={"#1a1a1a"}>
                                            {interviewLinks.map((interviewLink) => (
                                                <Link key={interviewLink.tag} to={interviewLink.link}>

                                                    <MenuItem bg={"#1a1a1a"} _hover={{
                                                        bg: "#2d2d2d"
                                                    }}>
                                                        {interviewLink.tag}
                                                    </MenuItem>

                                                </Link>
                                            ))}
                                        </MenuList>
                                    </Menu>
                                ) : (
                                    <Link
                                        key={link?.tag}
                                        to={link?.link}
                                        onClick={() => setLinkColor(link?.tag)}
                                        style={{
                                            borderBottom: colorLink === link?.tag ? "2px solid #ed8936" : "none",
                                        }}
                                    >
                                        <Flex
                                            transition={"color 0.5s ease"}
                                            align={"center"}
                                            gap={1}
                                            _hover={{ color: "#ed8936" }}
                                        >
                                            <Tooltip bg={"#323232"} color={"white"}
                                                label={link.tag === "Company"
                                                    ? "Asked question"
                                                    : `${link.tag}`} aria-label='A tooltip'
                                            >
                                                <Box>{link.tag}</Box>
                                            </Tooltip >
                                            {link?.icon && <Box mt={1}>{link?.icon}</Box>}
                                        </Flex>
                                    </Link>
                                )
                            )}
                        </HStack>
                    </HStack>
                    <Flex alignItems="center" gap={4}>
                        {
                            isAuthenticate && user && (
                                <>
                                    <Popover
                                        trigger={'hover'}
                                        placement={'bottom-start'}
                                        bg="#373737">
                                        <PopoverTrigger>
                                            <Link to={`/user/${user && user?.username}`}>
                                                <Avatar src={
                                                    user?.profile?.profilePic
                                                } size={"sm"} />
                                            </Link>
                                        </PopoverTrigger>

                                        <Portal>
                                            <PopoverContent>
                                                <PopoverArrow />
                                                <PopoverHeader>Header</PopoverHeader>
                                                <PopoverCloseButton />
                                                <PopoverBody>
                                                    {
                                                        user &&
                                                        <>
                                                            <Box
                                                                _hover={{
                                                                    bg: ""
                                                                }}>
                                                                <Link
                                                                    to={
                                                                        `/user/${user && user?.username}`
                                                                    }
                                                                    style={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        gap: "8px",
                                                                        marginBottom: "12px"
                                                                    }}>
                                                                    <ImProfile />
                                                                    <Text>View Profile</Text>
                                                                </Link>
                                                            </Box>
                                                            <Divider mb={3} />
                                                            <Flex
                                                                onClick={handleLogout}
                                                                cursor={"pointer"}
                                                                gap={"8px"}
                                                                alignItems={"center"}
                                                            >
                                                                <IoIosLogOut />
                                                                <Text>Sign out</Text>
                                                            </Flex>
                                                        </>
                                                    }
                                                </PopoverBody>
                                            </PopoverContent>
                                        </Portal>
                                    </Popover>
                                </>
                            )
                        }
                        {!isAuthenticate && !user && (
                            <Link to={'/auth/login'}>
                                <Button
                                    color={"white"}
                                    variant="solid"
                                    colorScheme={'orange'}
                                    bg={'orange.400'}
                                    _hover={{ bg: 'orange.500' }}
                                    size="sm"
                                    mr={4}
                                    leftIcon={<MdAssignmentInd fontSize={"16px"} />}
                                >
                                    Sign in
                                </Button>
                            </Link>
                        )}

                    </Flex>
                </Flex>
            </Box >
        </>
    );
}
