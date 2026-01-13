import React, { useState } from "react";
import { useLocation, useNavigate, type Location } from "react-router-dom";

import {
    Alert, Box, Button, Checkbox, FormControlLabel, IconButton,
    InputAdornment, Paper, Stack, TextField, Typography, Collapse
} from "@mui/material";
import { CheckCircleOutlineRounded, CheckCircleRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import { useLogin } from "@/features/auth/hooks/useLogin";
import type { NestErrorResponse } from "@/shared/types/api";
import type { AxiosError } from "axios";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation() as Location & { state?: { from?: Location } };

    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = useLogin();

    const from = location.state?.from?.pathname || '/dashboard';

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const id = loginId.trim();
        if (!id || !password) {
            setError('아이디와 비밀번호를 입력하세요.');
            return;
        }

        try {
            await login.mutateAsync({ loginId: id, password, remember });
            navigate(from, { replace: true });
        } catch (e) {
            const axiosError = e as AxiosError<NestErrorResponse>;
            const serverMessage = axiosError.response?.data?.message;
            const displayMessage = Array.isArray(serverMessage)
                ? serverMessage[0]
                : serverMessage || '로그인 중 오류가 발생했습니다.';

            setError(displayMessage);
        }
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: 'background.default',
                display: 'grid',
                placeItems: 'center',
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    maxWidth: 480,
                    px: { xs: 4, sm: 5 },
                    pt: 5,
                    pb: 2,
                    border: (t) =>
                        t.palette.mode === 'dark'
                            ? '1px solid rgba(255,255,255,0.08)'
                            : '1px solid rgba(2,6,23,0.06)',
                    borderRadius: 4,
                }}
            >
                <Stack
                    spacing={2}
                    sx={{ px: { xs: 1.5, sm: 3 } }}
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                >

                    <Stack alignItems="center" textAlign="center" sx={{ pb: 3 }}>
                        <Typography variant="h5" fontWeight={700}>관리자 로그인</Typography>
                    </Stack>

                    <Stack spacing={2}>
                        <TextField
                            label="아이디"
                            required
                            autoFocus
                            fullWidth
                            disabled={login.isPending}
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                            autoComplete="username"
                        />

                        <TextField
                            label="비밀번호"
                            required
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            disabled={login.isPending}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end" sx={{ pr: 0.5 }}>
                                            <IconButton
                                                aria-label="비밀번호 표시 전환"
                                                onClick={() => setShowPassword((v) => !v)}
                                                edge="end"
                                                disabled={login.isPending}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                    </Stack>

                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <FormControlLabel
                            label="로그인 상태 유지"
                            control={
                                <Checkbox
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                    size="small"
                                    disableRipple
                                    icon={<CheckCircleOutlineRounded fontSize="small" />}
                                    checkedIcon={<CheckCircleRounded fontSize="small" />}
                                    sx={{
                                        color: 'text.secondary',
                                        '&.Mui-checked': { color: 'primary.main' },
                                        p: 0.25,
                                        mr: 0.5,
                                    }}
                                />
                            }
                            slotProps={{
                                typography: { variant: 'body2', sx: { color: 'text.secondary' } },
                            }}
                            sx={{ m: 0 }}
                        />
                    </Stack>

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={login.isPending}
                        sx={{ py: 1.25 }}
                    >
                        {login.isPending ? '로그인 중...' : '로그인'}
                    </Button>

                    <Box sx={{ minHeight: 56 }}>
                        <Collapse in={!!error} timeout={200} unmountOnExit>
                            <Alert severity="error" variant="filled">{error}</Alert>
                        </Collapse>
                    </Box>

                </Stack>

            </Paper>
        </Box>
    );
}