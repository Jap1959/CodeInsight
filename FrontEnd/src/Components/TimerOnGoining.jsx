import { Card, TableCell, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
const TimerOnCell = ({ EndTime, Tag }) => {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    function calculateTimeRemaining() {
        const now = new Date();
        const end = new Date(EndTime);
        let timeDiff = end - now;
        if (timeDiff <= 0) {
            return { days: 0, hours: 'Finished', minutes: '', seconds: '' };
        }
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        return { days: days , hours: hours + 'h', minutes: minutes + 'm', seconds: seconds + 's' };
    }

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        return () => {
            clearInterval(timerInterval);
        };
    }, [EndTime]);

    return (
        <Card sx={{ minHeight: '6rem', border: 1 }}>
            <center>
                <Typography style={{ fontSize: '1.5rem' }}>
                    {Tag}
                </Typography>
                <hr/>
                <Typography>

                    <b>{timeRemaining.days !== 0 ? `${timeRemaining.days}d` : `${timeRemaining.hours} ${timeRemaining.minutes} ${timeRemaining.seconds}`
                    }</b>
                </Typography>
            </center>
        </Card>
    );
};
export default TimerOnCell;