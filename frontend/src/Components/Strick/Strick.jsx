import React from 'react';
import { Box, Grid, Text, useBreakpointValue } from '@chakra-ui/react';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, isToday } from 'date-fns';

const Strick = () => {
    const today = new Date();
    const start = startOfMonth(today);
    const end = endOfMonth(today);

    const days = eachDayOfInterval({ start, end });
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const cellSize = useBreakpointValue({ base: '30px', md: '40px' });

    return (
        <Box bg="#2d2d2d" p={4} borderRadius="md" color="white" width={"fit-content"}>
            <Grid templateColumns={`repeat(7, ${cellSize})`} gap={1}>
                {dayNames.map(day => (
                    <Text key={day} textAlign="center">{day}</Text>
                ))}
                {days.map(day => (
                    <Box
                        key={day}
                        // p={2}
                        textAlign="center"
                        bg={isToday(day) ? 'green.300' : ''}
                        borderRadius="md"
                        borderWidth={isToday(day) ? '2px' : '1px'}
                        borderColor={isToday(day) ? 'green.500' : 'transparent'}
                    >
                        {format(day, 'd')}
                    </Box>
                ))}
            </Grid>
        </Box>
    );
};

export default Strick;
