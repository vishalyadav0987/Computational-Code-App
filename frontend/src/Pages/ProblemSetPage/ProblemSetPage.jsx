import React, { useState } from 'react';
import {
    Box, Flex, Text, Button, Input, Select, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Tag, IconButton,
} from '@chakra-ui/react';
import { FaCheckCircle, FaTimesCircle, FaEdit, FaTrash, FaVideoSlash, FaFileVideo } from 'react-icons/fa';
import { FaNoteSticky } from 'react-icons/fa6';
import { Link } from 'react-router-dom'

const ProblemSetPage = () => {
    const [problems] = useState([
        { id: 1, title: 'Two Sum', difficulty: 'Easy', tags: ['Array', 'Hash Table'], topic: 'Array', solved: true },
        { id: 2, title: 'Add Two Numbers', difficulty: 'Medium', tags: ['Linked List', 'Math'], topic: 'Linked List', solved: false },
        { id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', tags: ['Hash Table', 'Sliding Window'], topic: 'String', solved: true },
        { id: 4, title: 'Binary Search Tree', difficulty: 'Hard', tags: ['Tree', 'Binary Search'], topic: 'BST', solved: false },
        // Add more problems as needed
    ]);
    const [search, setSearch] = useState('');
    const [filterDifficulty, setFilterDifficulty] = useState('');
    const [filterTopic, setFilterTopic] = useState('');

    const filteredProblems = problems.filter(problem =>
        problem.title.toLowerCase().includes(search.toLowerCase()) &&
        (!filterDifficulty || problem.difficulty === filterDifficulty) &&
        (!filterTopic || problem.topic === filterTopic)
    );

    const topics = Array.from(new Set(problems.map(problem => problem.topic))); // Extract unique topics

    return (
        <Flex direction="column" p={4} color="white" width={"100%"}>
            <Flex mb={4} gap={4} direction={{ base: 'column', md: 'row' }}>
                <Input
                    placeholder="Search problems..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    bg="#333333"
                    borderColor="gray.600"
                />
                <Select
                    placeholder="Select difficulty"
                    value={filterDifficulty}
                    onChange={(e) => setFilterDifficulty(e.target.value)}
                    bg="#333333"
                    borderColor="gray.600"
                >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </Select>
                <Select
                    placeholder="Select topic"
                    value={filterTopic}
                    onChange={(e) => setFilterTopic(e.target.value)}
                    bg="#333333"
                    borderColor="gray.600"
                >
                    {topics.map((topic, index) => (
                        <option key={index} value={topic}>{topic}</option>
                    ))}
                </Select>
            </Flex>

            <Table variant="unstyled" colorScheme="teal" >
                <TableCaption>Problem Set</TableCaption>
                <Thead >
                    <Tr 
                    height="50px"
                    borderBottom={"1px solid #323232"}>
                        <Th >Status</Th>
                        <Th >Title</Th>
                        <Th >Solution</Th>
                        <Th >Difficulty</Th>
                        <Th >Topic</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {filteredProblems.map((problem, index) => (
                        <Tr
                        cursor={"pointer"}
                        key={problem.id}
                        bg={index % 2 === 0 ? '' : '#333333'}
                        height="20px"
                        >
                            <Td>
                                {problem.solved ? (
                                    <FaCheckCircle color="green" />
                                ) : (
                                    <FaTimesCircle color="red" />
                                )}
                            </Td>
                            <Link to={`/problem/${"two-sum"}/description`}>
                                <Td _hover={{ color: "#ed8936" }}>{problem.title}</Td>
                            </Link>
                            <Td>
                                <IconButton
                                    aria-label="Edit"
                                    icon={<FaFileVideo />}
                                    size="sm"
                                    colorScheme="blue"
                                    variant="outline"
                                    mr={2}
                                />
                                <IconButton
                                    aria-label="Delete"
                                    icon={<FaNoteSticky />}
                                    size="sm"
                                    colorScheme="red"
                                    variant="outline"
                                />
                            </Td>
                            <Td>
                                <Tag colorScheme={problem.difficulty === 'Easy' ? 'green' : problem.difficulty === 'Medium' ? 'orange' : 'red'}>
                                    {problem.difficulty}
                                </Tag>
                            </Td>
                            <Td>{problem.topic}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Flex>
    );
};

export default ProblemSetPage;
