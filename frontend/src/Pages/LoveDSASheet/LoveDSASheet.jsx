import React from 'react'
'use client'

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Flex,
    useColorModeValue,
    Text,
    Container,
    Box,
    Heading,
    Progress,
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'
import ProblemSetTopicWise from '../../Components/ProblemSetTopicWise/ProblemSetTopicWise'

const accordianData = [
    { progressMeter: 64, topicTag: "Step 1 : Learn the basics" },
    { progressMeter: 44, topicTag: "Step 2 : Learn Important Sorting Techniques" },
    { progressMeter: 21, topicTag: "Step 3 : Solve Problems on Arrays [Easy -> Medium -> Hard]" },
    { progressMeter: 46, topicTag: "Step 4 : Binary Search [1D, 2D Arrays, Search Space]" },
    { progressMeter: 78, topicTag: "Step 5 : Strings [Basic and Medium]" },
    { progressMeter: 39, topicTag: "Step 6 : Learn LinkedList [Single LL, Double LL, Medium, Hard Problems]" },
    { progressMeter: 56, topicTag: "Step 7 : Recursion [PatternWise]" },
    { progressMeter: 50, topicTag: "Step 8 : Bit Manipulation [Concepts & Problems]" },
    {
        topicTag: "Step 9 : Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation]"
    },
    { progressMeter: 23, topicTag: "Step 10 : Sliding Window & Two Pointer Combined Problems" },
    { progressMeter: 45, topicTag: "Step 11 : Heaps [Learning, Medium, Hard Problems]" },
    { progressMeter: 57, topicTag: "Step 12 : Greedy Algorithms [Easy, Medium/Hard]" },
    { progressMeter: 65, topicTag: "Step 13 : Binary Trees [Traversals, Medium and Hard Problems]" },
    { progressMeter: 32, topicTag: "Step 14 : Binary Search Trees [Concept and Problems]" },
    { progressMeter: 10, topicTag: "Step 15 : Graphs [Concepts & Problems]" },
    { progressMeter: 33, topicTag: "Step 16 : Dynamic Programming [Patterns and Problems]" },
    { progressMeter: 39, topicTag: "Step 17 : Tries" },
    { progressMeter: 100, topicTag: "Step 18 : Strings" },
]

const LoveDSASheet = () => {
    return (
        <>
            <Box width={"100%"} py={12}>
                <Box width="75%" margin={"0 auto"} p={4} px={1} mb={6}>
                    <Heading mb={5}>Love Babbar's DSA Sheet</Heading>
                    <Text color={"#afafaf"}>
                        This course is made for people who want to learn DSA from A to Z for free in a well-organized and structured manner. The lecture quality is better than what you get in paid courses, the only thing we don’t provide is doubt support, but trust me our YouTube video comments resolve that as well, we have a wonderful community of 250K+ people who engage in all of the videos.
                    </Text>
                </Box>
                {
                    accordianData.map((topic, index) => {
                        return (
                            <Accordion
                                key={index}
                                allowMultiple
                                width="75%"
                                margin={"0 auto"}
                                border={"1px solid #27272a"}
                                borderRadius={"8px"}
                                bg={"#191919"}
                                mb={6}
                            >

                                <AccordionItem>
                                    <Box
                                        width={`${topic.progressMeter}%`} // Set width based on progress
                                        height="4px"
                                        bg="#ed8936" // Progress color
                                    />
                                    <AccordionButton
                                        display="flex"
                                        alignItems="start"
                                        justifyContent="space-between"
                                        p={4}>
                                        <Text fontSize="md">
                                            {topic.topicTag}
                                        </Text>
                                        <ChevronDownIcon fontSize="24px" />
                                    </AccordionButton>
                                    <AccordionPanel pb={4}>
                                        <Accordion
                                            allowMultiple
                                            width="100%"
                                            margin={"0 auto"}
                                            border={"1px solid #27272a"}
                                            borderRadius={"8px"}
                                            bg={"#191919"}
                                        >
                                            <AccordionItem>
                                                <AccordionButton
                                                    display="flex"
                                                    alignItems="start"
                                                    justifyContent="space-between"
                                                    p={4}>
                                                    <Text fontSize="md">
                                                        Lec 1: Things to Know in C++/Java/Python or any language
                                                    </Text>
                                                    <ChevronDownIcon fontSize="24px" />
                                                </AccordionButton>
                                                <AccordionPanel pb={4}>
                                                    <ProblemSetTopicWise />
                                                </AccordionPanel>
                                            </AccordionItem>
                                        </Accordion>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        )
                    })
                }
            </Box >
        </>
    )
}

export default LoveDSASheet

