import React, { useState } from "react";
import { Tab, Tabs, AppBar } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PublishIcon from "@mui/icons-material/Publish";
import BarChartIcon from "@mui/icons-material/BarChart";

const TabAppBar = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Dashboard" icon={<DashboardIcon />} />
                    <Tab label="Submissions" icon={<AssignmentIcon />} />
                    <Tab label="Submit" icon={<PublishIcon />} />
                    <Tab label="Standings" icon={<BarChartIcon />} />
                </Tabs>
            </AppBar>
        </div>
    );
};

export default TabAppBar;
