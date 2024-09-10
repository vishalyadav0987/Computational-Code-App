import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const QuestionPicto = ({ data }) => {
    const bgColor = useColorModeValue('#f5f5f5', '#2d2d2d');
    const textColor = useColorModeValue('black', 'white');

    // Calculate the total number of questions by difficulty
    const difficultyCounts = {
        easy: 0,
        medium: 0,
        hard: 0,
    };

    data.forEach((item) => {
        item.difficulty.forEach((diff) => {
            if (diff === 'easy') difficultyCounts.easy += item.questions;
            if (diff === 'medium') difficultyCounts.medium += item.questions;
            if (diff === 'hard') difficultyCounts.hard += item.questions;
        });
    });

    // Prepare data for Pie Chart
    const chartData = {
        labels: [
            `Easy (${difficultyCounts.easy})`,
            `Medium (${difficultyCounts.medium})`,
            `Hard (${difficultyCounts.hard})`
        ],
        datasets: [
            {
                label: 'Question Difficulty Distribution',
                data: [difficultyCounts.easy, difficultyCounts.medium, difficultyCounts.hard],
                backgroundColor: ['#4CAF50', '#FFC107', '#F44336'], // Colors for easy, medium, and hard
                borderColor: '#333333',
                borderWidth: 1,
            },
        ],
    };

    return (
        <Box bg={bgColor} p={4} borderRadius="md" color={textColor}>
            <Text fontSize="lg" fontWeight="bold" mb={4}>
                Question Difficulty Distribution
            </Text>
            <Pie data={chartData} />
        </Box>
    );
};

export default QuestionPicto;
