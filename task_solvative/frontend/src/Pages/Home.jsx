import { Box, Stack, ThemeProvider, createTheme } from '@mui/material';
import React from 'react'
import { Header, UserList } from '../Components';

export default function Home() {
    const darkTheme = createTheme({
        palette: {
            mode: "light",
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <Box bgcolor={"background.default"} color={"text.primary"}>
                <Header />
                <Stack direction={"row"} spacing={2} justifyContent={"center"} margin={10}>
                    <UserList />
                </Stack>
            </Box>
        </ThemeProvider>
    )
}
