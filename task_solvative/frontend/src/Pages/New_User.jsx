import React, { useState } from 'react'
import { Header } from '../Components'
import { Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function New_User() {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/createuser', formData);
            toast.success('User added successfully');
            navigate("/");
        } catch (error) {
            toast.error('There was an error adding the user');
        }
    };

    return (
        <Box bgcolor={"background.default"} color={"text.primary"}>
            <Header />
            <Stack direction={"row"} spacing={2} justifyContent={"center"} margin={10}>
                <Container maxWidth="sm">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mt: 4,
                            p: 3,
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            boxShadow: 3,
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Add User
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        name="name"
                                        label="User Name"
                                        fullWidth
                                        variant="outlined"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                                <Button type="submit" variant="contained" sx={{ bgcolor: "#009879" }}>
                                    Submit
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={() => { navigate("/") }}>
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Stack>
        </Box>
    )
}
