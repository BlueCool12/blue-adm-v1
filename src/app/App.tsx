import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/routes';

import { CssBaseline, InitColorSchemeScript } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/shared/theme';
import '@/shared/styles/lexical.css';
import '@/shared/styles/globals.css';

import { queryClient } from '@/shared/api/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { AlertProvider } from '@/app/providers/AlertProvider';


function App() {

    return (
        <>
            <InitColorSchemeScript
                attribute='data'
                defaultMode='system'
                modeStorageKey='bluecool-adm-color'
            />

            <ThemeProvider
                theme={theme}
                defaultMode='system'
                modeStorageKey='bluecool-adm-color'
                disableTransitionOnChange
                noSsr
            >
                <CssBaseline />
                <AlertProvider>
                    <QueryClientProvider client={queryClient}>
                        <RouterProvider router={router} />
                    </QueryClientProvider>
                </AlertProvider>
            </ThemeProvider>
        </>
    )
}

export default App
