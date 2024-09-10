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
    Tag,
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'
import { FaBuilding, FaLightbulb, FaTag } from 'react-icons/fa6'

const AccordianData = [
    { type: 'Topic', icon: <FaTag />, topic: ["binary search", "Array"] },
    { type: 'Companies', icon: <FaBuilding />, topic: ["Google", "Microsoft"] },
    { type: 'Hint 1', icon: <FaLightbulb />, topic: ["Given the speed the trains are traveling at, can you find the total time it takes for you to arrive?"] },
    { type: 'Hint 2', icon: <FaLightbulb />, topic: ["Is there a cutoff where any speeds larger will always allow you to arrive on time?"] },
]

export default function Accordions() {
    return (
        <>
            <Accordion allowMultiple width={"100%"}>
                {
                    AccordianData.map((data, index) => {
                        return (
                            <AccordionItem key={index}>
                                <AccordionButton
                                    display="flex"
                                    alignItems="start"
                                    justifyContent="space-between"
                                    p={4}>
                                    <Box fontSize="md"
                                        display={"flex"} gap={3}
                                        alignItems={"center"}>
                                        <Text>{data.icon}</Text>
                                        <Text>{data.type}</Text>
                                    </Box>
                                    <ChevronDownIcon fontSize="24px" />
                                </AccordionButton>
                                <AccordionPanel pb={4}>
                                    <Text color="gray.600" display={"flex"} gap={2}>
                                        {
                                            data.topic.map((topc, index) => (
                                                <Tag>{topc}</Tag>
                                            ))
                                        }
                                    </Text>
                                </AccordionPanel>
                            </AccordionItem>
                        )
                    })
                }
            </Accordion>
        </>
    )
}