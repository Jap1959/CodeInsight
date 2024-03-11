import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Avatar,
    CircularProgress,
    IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ResponsiveAppBar from './Navbar';
import { useTheme } from '@mui/material/styles';

const ProfilePage = () => {
    const [profilePic, setProfilePic] = useState('/path-to-default-profile-pic.jpg');
    const [username, setUsername] = useState('');
    const [Linkedin, setLinkendin] = useState('');
    const [Github, setGithub] = useState('');
    const [email, setEmail] = useState('user@example.com');
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const theme = useTheme();

    const handleImageChange = (event) => {
        setLoading(true);
        // Simulate image upload, you can replace this with your own logic
        setTimeout(() => {
            setProfilePic(URL.createObjectURL(event.target.files[0]));
            setLoading(false);
        }, 2000);
    };

    const handleUpdateProfile = () => {
        setLoading(true);
        // Simulate update profile data, you can replace this with your own logic
        setTimeout(() => {
            // Update username, email, or any other data here
            setUsername('New Username');
            setLoading(false);
            setIsEditing(false);
        }, 2000);
    };




    return (
        <>
            <ResponsiveAppBar />
            <Typography variant='h3' align='center' margin={1} >
                <strong>Update</strong> Profile
            </Typography>
            <Container maxWidth='lg' style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Paper elevation={3} style={{
                    width: '400px',
                    padding: '20px',
                    textAlign: 'center',
                    boxShadow: `0 0 10px ${theme.palette.primary.main}`, // Replace 'theme' with your theme object
                }}>
                    <Avatar src={profilePic} style={{ width: '150px', height: '150px', margin: '0 auto' }} />
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} id="profilePicInput" />
                    <label htmlFor="profilePicInput">
                        <IconButton variant="contained" component="span" color="primary">
                            <EditIcon />
                        </IconButton>
                    </label>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        disabled
                        value={email}
                        style={{ marginBottom: '20px' }}
                    />
                    <TextField
                        label="username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        style={{ marginBottom: '20px' }}
                    />
                    <TextField
                        label="LinkedIn"
                        variant="outlined"
                        fullWidth
                        value={Linkedin}
                        style={{ marginBottom: '20px' }}
                    />
                    <TextField
                        label="Github"
                        variant="outlined"
                        fullWidth
                        value={Github}
                        style={{ marginBottom: '20px' }}
                    />
                    {loading ? <CircularProgress style={{ marginTop: '20px' }} /> : <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
                        Update Profile
                    </Button>
                    }
                </Paper>
            </Container>
        </>
    );
};

export default ProfilePage;
