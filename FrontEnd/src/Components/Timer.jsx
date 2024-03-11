import { Tab, TableCell, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
const TimerCell = ({ startTime }) => {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    function calculateTimeRemaining() {
        const now = new Date();
        const start = new Date(startTime);
        const timeDiff = start - now;

        if (timeDiff <= 0) {
            return { hours: 0, minutes: 0, seconds: 0 };
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        return { days, hours, minutes, seconds };
    }

    useEffect(() => {
        const timerInterval = setInterval(() => {
            const remainingTime = calculateTimeRemaining();
            setTimeRemaining(remainingTime);

            if (remainingTime.days === 0 && remainingTime.hours === 0 && remainingTime.minutes === 0 && remainingTime.seconds === 0) {
                window.location.reload();
            }
        }, 1000);

        return () => {
            clearInterval(timerInterval);
        };
    }, [startTime]);

    return (
        <TableCell>
            <Typography>
                {timeRemaining.days !== 0 ? `${timeRemaining.days}days` : `${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s`
                }
            </Typography>
        </TableCell>
    );
};
export default TimerCell;