import React from 'react'
import ProblemSetPage from '../ProblemSetPage/ProblemSetPage'
import { Box, Flex } from '@chakra-ui/react';
import Strick from '../../Components/Strick/Strick';
import QuestionPicto from '../../Components/questionPicto/QuestionPicto';

const ProblemHomePage = () => {
    const sampleData = [
        { topic: 'BST', attempts: 45, questions: 10, difficulty: ['easy', 'medium'] },
        { topic: 'String', attempts: 30, questions: 8, difficulty: ['medium', 'hard'] }
    ];
    return (
        <>

            <Box width={"100%"} p={2}>
                <Flex width={"85%"} margin={"0 auto"} gap={2}>
                    <ProblemSetPage />
                    <Box display={"flex"}
                        flexDirection={"column"}
                        gap={4}
                        py={2}
                    >
                        <Box>
                            <Strick />
                        </Box>
                        <Box>
                            <QuestionPicto data={sampleData} />
                        </Box>
                    </Box>
                </Flex>
            </Box>

        </>
    )
}

export default ProblemHomePage
