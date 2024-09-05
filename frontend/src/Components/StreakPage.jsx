import React, { useState, useEffect } from 'react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, getMonth } from 'date-fns';

const StreakPage = () => {
    const [streaks, setStreaks] = useState({}); // { 'YYYY-MM-DD': true }
    const [datesByMonth, setDatesByMonth] = useState([]);

    useEffect(() => {
        // Generate dates for each month of the current year
        const today = new Date();
        const year = today.getFullYear();
        const months = Array.from({ length: 12 }, (_, i) => i); // [0, 1, ..., 11]

        const allDatesByMonth = months.map((month) => {
            const startDate = startOfMonth(new Date(year, month));
            const endDate = endOfMonth(startDate);
            return eachDayOfInterval({ start: startDate, end: endDate });
        });

        setDatesByMonth(allDatesByMonth);
    }, []);

    const handleCorrectSubmission = (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        setStreaks((prevStreaks) => ({ ...prevStreaks, [formattedDate]: true }));
    };

    const renderMonth = (monthDates, monthIndex) => {
        // Get month name using date-fns
        const monthName = format(monthDates[0], 'MMMM'); // Get the full month name

        return (
            <div
                key={monthIndex}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 10px)',
                    gridTemplateRows: 'repeat(7, 10px)',
                    gap: '2px',
                    marginBottom: '30px', // Space between months
                    alignItems: 'center',
                    justifyItems: 'center'
                }}
            >
                {monthDates.map((date) => {
                    const formattedDate = format(date, 'yyyy-MM-dd');
                    const isGreen = streaks[formattedDate];

                    return (
                        <div
                            key={formattedDate}
                            onClick={() => handleCorrectSubmission(date)}
                            style={{
                                width: '10px',
                                height: '10px',
                                backgroundColor: isGreen ? 'green' : 'lightgray',
                                textAlign: 'center',
                                lineHeight: '40px',
                                cursor: 'pointer',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                            }}
                        >
                            {/* {date.getDate()} */}
                        </div>
                    );
                })}
                {/* Month name displayed below the calendar */}
                <div style={{
                    gridColumn: 'span 4', textAlign: 'center', marginTop: '50px', fontWeight: 'bold',
                    fontSize: "14px",
                    color: "#fff"
                }}>
                    {monthName.substring(0, 3)}
                </div>
            </div>
        );
    };

    return (
        <div>
            <h2>Your Yearly Streak</h2>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 80px)",
                gap: '10px', // Space between each month block
                background: "#282828",
                width: "fit-content",
                padding: "10px",
                margin: "0 auto",
            }}>
                {datesByMonth.map((monthDates, index) => renderMonth(monthDates, index))}
            </div>

            <div style={{
                width: "50px",
                height: "50px",
                backgroundImage: "conic-gradient(red, yellow, green)",
                borderRadius:"50%"
            }}></div>
        </div>
    );
};

export default StreakPage;
