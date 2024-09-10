import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css'; // Import the default styles
import { Box, Text, Flex } from '@chakra-ui/react';

// Function to generate random streak data for one year
const generateStreakData = () => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setFullYear(today.getFullYear() - 1); // One year back

    const data = [];
    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
        data.push({
            date: d.toISOString().slice(0, 10), // Format date as YYYY-MM-DD
            count: Math.floor(Math.random() * 4), // Random count from 0 to 3 (representing activity level)
        });
    }

    return data;
};

const StreakPage = () => {
    const streakData = generateStreakData();

    return (
        <Box p={4} bg={"#2d2d2d"} mt={4} borderRadius={"6px"} pb={6}>

            <Flex
                justifyContent={"space-between"} alignItems={"center"}
                width={"100%"}
                p={2}
            >
                <Text gap={"5px"} color={"#b4bdc2"} display={"flex"} alignItems={"center"}>
                    <b style={{ fontSize: "18px", color: "white" }}>99</b>
                    {" "}<Text>submissions in the past one year</Text>
                </Text>
                <Flex
                    fontSize={"12px"}
                    color={"#b4bdc2"}
                    alignItems={"center"}
                    gap={4}
                >
                    <Flex gap={"5px"}>
                        <Text>Total active day:{" "}</Text>{" "}
                        <Text>31</Text>
                    </Flex>
                    <Flex gap={"5px"}>
                        <Text>Max streak:{" "}</Text>{" "}
                        <Text>{" "}31</Text>
                    </Flex>
                </Flex>
            </Flex>

            <Flex justifyContent="center">
                <CalendarHeatmap
                    startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                    endDate={new Date()}
                    values={streakData}
                    classForValue={(value) => {
                        if (!value) {
                            return 'color-empty'; // CSS class for no activity
                        }
                        return `color-scale-${value.count}`; // CSS class based on activity count
                    }}
                    tooltipDataAttrs={(value) => {
                        return {
                            'data-tip': `${value.date}: ${value.count} streak`,
                        };
                    }}
                    showMonthLabels={true} // Show month labels at the bottom
                />
            </Flex>
        </Box>
    );
};

export default StreakPage;
