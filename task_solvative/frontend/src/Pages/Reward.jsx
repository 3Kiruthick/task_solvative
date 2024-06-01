import { Box, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Header } from '../Components'
import axios from 'axios';

export default function Reward() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/trasactionhistory')
            .then((response) => {
                setData(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <Box bgcolor={"background.default"} color={"text.primary"}>
            <Header />
            <Stack direction={"row"} spacing={2} justifyContent={"center"} margin={10}>
                <Box>
                    <Typography variant='h4'>Reward List</Typography>
                    <table>
                        <thead>
                            <tr>
                                <th>From Name</th>
                                <th>To Name</th>
                                <th>Reward</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.fromName}</td>
                                    <td>{item.toName}</td>
                                    <td>{item.reward}</td>
                                    <td>{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Box>
            </Stack>
        </Box>
    )
}
