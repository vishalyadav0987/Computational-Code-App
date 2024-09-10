import React, { useEffect, useRef, useState } from 'react';
import {
    Flex, Box, Text, Button, Code, List, ListItem, Tag, Tooltip, Heading, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { TiStarOutline } from 'react-icons/ti';
import ProblemHeader from '../../Components/ProblemHeader/ProblemHeader';
import Accordions from '../../Components/Accordian/Accordian';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaAlignLeft, FaArrowDown19, FaBookmark, FaCheck, FaExpand, FaSquareCheck } from 'react-icons/fa6';
import MonacoEditor, { useMonaco } from '@monaco-editor/react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { MdOutlineSquare } from 'react-icons/md';
import { CiSquareCheck } from "react-icons/ci";
import { IoIosArrowDown } from 'react-icons/io';


const ProblemDescription = ({ toggleFullScreen }) => {
    const [inputPannel, setInputPannel] = useState(false);

    const [code, setCode] = useState('// Write your code here...');
    const [language, setLanguage] = useState('javascript');
    const [output, setOutput] = useState('');
    const monaco = useMonaco(); // Use the Monaco hook to access the Monaco instance
    const editorRef = useRef(null); // Reference to access the editor instance


    useEffect(() => {
        if (monaco) {
            // Define a custom theme
            monaco.editor.defineTheme('myCustomTheme', {
                base: 'vs-dark',
                inherit: true,
                rules: [
                    { token: 'keyword', foreground: 'ff79c6' },
                    { token: 'identifier', foreground: '50fa7b' },
                    { token: 'number', foreground: 'bd93f9' },
                    { token: 'string', foreground: 'f1fa8c' },
                    { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
                    { token: 'type', foreground: '8be9fd' },
                ],
                colors: {
                    'editor.background': '#262626',
                    'editorLineNumber.foreground': '#ffffff',
                },
            });
            // Set the editor theme after defining it
            monaco.editor.setTheme('myCustomTheme');
        }
    }, [monaco]); // Run this effect whenever the monaco instance is ready


    // Function to handle editor mounting and to store the editor instance
    // Function to handle editor mounting and to store the editor instance
    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
    };

    // Function to format the code using Monaco's built-in formatter
    const formatCode = () => {
        console.log("dfhjsd")
        if (editorRef.current) {
            editorRef.current.getAction('editor.action.formatDocument').run().catch((err) => {
                console.error('Formatting error:', err);
            });
        }
    };

    return (
        <>
            <Flex p={4}
                height={"calc(100vh - 50px)"}
                bg={"black"} gap={2} position={"relative"}>
                <Box

                    overflowY={"scroll"}
                    position={"relative"}
                    border={"1px solid #c7c7c7"}
                    bg={"#262626"}
                    borderRadius={"4px"}
                    flex={1}
                >
                    <ProblemHeader />
                    <Box px={5}
                        py={4} pt={12}>
                        <Flex align="center" mb={3}>
                            <Heading size={"lg"} fontWeight={"600"} mr={2}>1. Two Sum</Heading>
                            <Tag colorScheme="green">Easy</Tag>

                        </Flex>

                        <Text color="white" mb={4}>
                            <Text mt={3}>
                                Given an array of integers <Code>nums</Code> and an integer <Code>target</Code>, return
                                <Text as="em">indices of the two numbers such that they add up to</Text> <Code>target</Code>.
                            </Text>
                            <Text mt={3}>
                                You may assume that each input would have <Text as="strong">exactly one solution</Text>, and you
                                may not use the same element twice.
                            </Text>
                            <Text mt={3}>You can return the answer in any order.</Text>
                        </Text>

                        <Box mb={4}>
                            <Text fontWeight="medium" color="white">Examples:</Text>
                            <Box>
                                <Text fontWeight="medium" color="white">Example 1:</Text>
                                <Box bg="gray.600" p={3} borderRadius="md">
                                    <pre>
                                        <strong>Input:</strong> nums = [2,7,11,15], target = 9 <br />
                                        <strong>Output:</strong> [0,1] <br />
                                        <strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
                                    </pre>
                                </Box>
                            </Box>
                            <Box mt={2}>
                                <Text fontWeight="medium" color="white">Example 2:</Text>
                                <Box bg="gray.600" p={3} borderRadius="md">
                                    <pre>
                                        <strong>Input:</strong> nums = [3,2,4], target = 6 <br />
                                        <strong>Output:</strong> [1,2] <br />
                                        <strong>Explanation:</strong> Because nums[1] + nums[2] == 6, we return [1, 2].
                                    </pre>
                                </Box>
                            </Box>
                            <Box mt={2}>
                                <Text fontWeight="medium" color="white">Example 3:</Text>
                                <Box bg="gray.600" p={3} borderRadius="md">
                                    <pre>
                                        <strong>Input:</strong> nums = [3,3], target = 6 <br />
                                        <strong>Output:</strong> [0,1] <br />
                                    </pre>
                                </Box>
                            </Box>
                        </Box>

                        <Box my={5}>
                            <Text fontWeight="medium" color="white">Constraints:</Text>
                            <List color="white" ml={5} spacing={2}>
                                <ListItem><Code>2 ≤ nums.length ≤ 10</Code></ListItem>
                                <ListItem><Code>-10 ≤ nums[i] ≤ 10</Code></ListItem>
                                <ListItem><Code>-10 ≤ target ≤ 10</Code></ListItem>
                                <ListItem fontSize="sm"><strong>Only one valid answer exists.</strong></ListItem>
                            </List>
                        </Box>
                        <Box my={5}>
                            <Accordions />
                        </Box>
                        <Flex >
                            <Box ml={4}>
                                <Tooltip label="Solved">
                                    <Button variant="outline" colorScheme="green" borderRadius="full">
                                        <BsCheck2Circle />
                                    </Button>
                                </Tooltip>
                            </Box>
                            <Box ml={4}>
                                <Button variant="outline" colorScheme="gray" borderRadius="full" leftIcon={<AiFillLike />}>
                                    <Text>120</Text>
                                </Button>
                            </Box>
                            <Box ml={4}>
                                <Button variant="outline" colorScheme="gray" borderRadius="full" leftIcon={<AiFillDislike />}>
                                    <Text>2</Text>
                                </Button>
                            </Box>
                            <Box ml={4}>
                                <Button variant="outline" colorScheme="yellow" borderRadius="full">
                                    <TiStarOutline />
                                </Button>
                            </Box>
                        </Flex>
                    </Box>
                </Box>
                <Box border={"1px solid #c7c7c7"}
                    bg={"#262626"}
                    borderRadius={"4px"}
                    overflowY={"hidden"}
                    flex={1}
                    height={inputPannel ? "55%" : "95%"}
                    transition={"height 0.3s ease"}
                >
                    <Box
                        position={"relative"}
                    >

                        <ProblemHeader />
                        <Box pt={8}>
                            <Flex alignItems="center"
                                mb={3} borderBottom={"1px solid #323232"}
                                justifyContent={"space-between"}
                                px={2}
                            >
                                <Box>
                                    <Menu>
                                        <MenuButton
                                            _hover={{
                                                bg: "none",
                                                py: "0px"
                                            }}
                                            as={Button} rightIcon={<ChevronDownIcon />}
                                            bg={"transparent"} fontSize={"12px"} >
                                            Actions
                                        </MenuButton>
                                        <MenuList bg={"#333333"}>
                                            <MenuItem>Download</MenuItem>
                                            <MenuItem>Create a Copy</MenuItem>
                                            <MenuItem>Mark as Draft</MenuItem>
                                            <MenuItem>Delete</MenuItem>
                                            <MenuItem>Attend a Workshop</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Box>
                                <Box display={"flex"} gap={3}>
                                    <FaAlignLeft onClick={formatCode} cursor={"pointer"} />

                                    <FaBookmark cursor={"pointer"} />

                                    <FaExpand onClick={toggleFullScreen} cursor={"pointer"} />
                                </Box>
                            </Flex>
                            <Box>
                                <MonacoEditor
                                    height="100vh"
                                    language={"cpp"}
                                    theme="myCustomTheme"
                                    value={code}
                                    onChange={(value) => setCode(value)}
                                    options={{
                                        lineNumbers: 'on',
                                        minimap: { enabled: true },
                                        automaticLayout: true,
                                        suggestOnTriggerCharacters: true,
                                        quickSuggestions: true,
                                        autoClosingBrackets: 'always',
                                        autoClosingQuotes: 'always',
                                        formatOnType: true,
                                        formatOnPaste: true,
                                    }}
                                    onMount={handleEditorDidMount}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box
                    height={inputPannel ? "42.5%" : "30px"}
                    width={"48.8%"}
                    bg={"#262626"}
                    border={"1px solid #c5c5c5"}
                    position={"absolute"}
                    bottom={4}
                    right={4}
                    borderRadius={"4px"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    transition={"height 0.3s ease"}
                    px={2}
                >
                    <Flex
                        width={"100%"}
                        height={"30px"} mt={"2px"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        borderBottom={inputPannel && "1px solid #323232"}
                        py={1}
                    >
                        <Flex gap={2} px={1} >
                            <Text> <CiSquareCheck color='green' /></Text>
                            <Heading size={"sm"}>Testcases</Heading>
                        </Flex>
                        <Flex gap={2} px={1}>
                            <Tooltip label="Test Cases" aria-label='A tooltip'
                                bg={"#262626"} color={"white"}>
                                <Text> <IoIosArrowDown
                                    onClick={() => setInputPannel(!inputPannel)}
                                    color='green' cursor={"pointer"} /></Text>
                            </Tooltip>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </>
    );
};

export default ProblemDescription;
