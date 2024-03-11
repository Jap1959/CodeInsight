import React, { useState } from 'react';
import { AppBar, Toolbar, Grid, Button, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { MdOutlineFileDownload, MdMenu } from 'react-icons/md';

function Navbar() {
    const [isMobileView, setIsMobileView] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleResize = () => {
        setIsMobileView(window.innerWidth <= 600);
    };

    React.useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid xs={1} sm={1} md={1} lg={2}>
                            {/* Space at the start */}
                        </Grid>
                        <Grid item xs={6} sm={1} md={2} lg={2}>
                            {/* Logo */}
                            <img src="logo.png" alt="Logo" style={{ height: 50 }} />
                        </Grid>
                        <Grid item xs={2} sm={7} md={6} lg={3}>
                            {/* Links */}
                            {!isMobileView ? (
                                <Grid container justifyContent="center">
                                    <Grid item>
                                        <Button color="inherit">About me</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button color="inherit">Skills</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button color="inherit">Projects</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button color="inherit">Experience</Button>
                                    </Grid>
                                </Grid>
                            ) : null}
                        </Grid>
                        <Grid item xs={2} sm={1} md={1} lg={2}>
                            {/* Space at the end */}
                        </Grid>
                        {!isMobileView && <Grid item xs={2} sm={2} md={2} lg={3}>
                            {/* Button */}
                            <Button
                                style={{ backgroundColor: 'black', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                variant="contained"
                                onClick={() => window.open('link_to_resume')}
                            >
                                Resume <MdOutlineFileDownload size={20} color="white" />
                            </Button>
                        </Grid>}
                        {isMobileView && (
                            <IconButton
                                edge="end"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleDrawerToggle}
                            >
                                <MdMenu />
                            </IconButton>
                        )}
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer sx={{
                width: '200px', // Adjust the width as needed
                '& .MuiDrawer-paper': {
                    width: '200px' // Adjust the width as needed
                }
            }} anchor="right" open={isDrawerOpen} onClose={handleDrawerToggle}>
                <List >
                    {['About me', 'Skills', 'Projects', 'Experience'].map((text, index) => (
                        <ListItem button key={text} onClick={handleDrawerToggle}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                    <ListItem >
                        <Button
                            style={{ backgroundColor: 'black' }}
                            variant="contained"
                            onClick={() => window.open('link_to_resume')}
                        >
                            <span>Resume <MdOutlineFileDownload size={20} color="white" /></span>
                        </Button>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}

export default Navbar;
