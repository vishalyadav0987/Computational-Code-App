import React, { ReactNode } from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Image
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { MdAssignmentInd } from "react-icons/md";
import { Link } from 'react-router-dom';



const Links = ['Explore', 'Product', 'Developer'];

const NavLink = ({ children }) => {
    return (
        <Box
            as="a"
            px={2}
            py={1}
            rounded="md"
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
            href="#"
        >
            {children}
        </Box>
    );
};

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box
                //  bg={useColorModeValue('gray.100', 'gray.900')} 
                px={4}>
                <Flex h={16} alignItems="center" justifyContent="space-between">
                    <IconButton
                        size="md"
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label="Open Menu"
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems="center">
                        <Box>
                            <Image cursor={"pointer"} width={"140px"} src="./logo-4.png" />
                        </Box>
                        <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems="center">
                        <Button
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
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded="full"
                                variant="link"
                                cursor="pointer"
                                minW={0}
                            >

                            </MenuButton>
                            <MenuList>
                                <MenuItem>Link 1</MenuItem>
                                <MenuItem>Link 2</MenuItem>
                                <MenuDivider />
                                <MenuItem>Link 3</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as="nav" spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}
