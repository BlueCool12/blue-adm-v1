import { ChevronRightRounded, CommentRounded, DescriptionRounded, PeopleAltRounded, TrendingUpRounded } from "@mui/icons-material";
import { alpha, Box, Container, Grid, IconButton, Paper, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { LineChart } from '@mui/x-charts/LineChart';
import { useNavigate } from "react-router-dom";
import { SummaryCard } from "../components/SummaryCard";

const dailyData = [
    { day: '01/10', pv: 400, uv: 120 },
    { day: '01/11', pv: 300, uv: 110 },
    { day: '01/12', pv: 200, uv: 90 },
    { day: '01/13', pv: 278, uv: 130 },
    { day: '01/14', pv: 189, uv: 115 },
    { day: '01/15', pv: 239, uv: 145 },
    { day: '01/16', pv: 349, uv: 160 },
];

export default function DashboardPage() {
    const navigate = useNavigate();

    const theme = useTheme();

    return (
        <Container maxWidth="lg" sx={{ py: 3 }} disableGutters>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard title="오늘 방문자 (UV)" value="124" icon={<PeopleAltRounded />} />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard title="오늘 페이지뷰 (PV)" value="452" icon={<TrendingUpRounded />} />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard title="대기 중인 댓글" value="8" icon={<CommentRounded />} />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard title="전체 게시글" value="1,024" icon={<DescriptionRounded />} />
                </Grid>

                <Grid size={{ xs: 12, lg: 8 }}>
                    <Paper sx={{ p: 3, borderRadius: 3, height: 400 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>방문자 추이 (최근 7일)</Typography>

                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
                                    <Typography variant="caption" fontWeight={600}>페이지뷰 (PV)</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: theme.palette.primary.main }} />
                                    <Typography variant="caption" fontWeight={600}>방문자 (UV)</Typography>
                                </Box>
                            </Stack>
                        </Box>

                        <Box sx={{ height: 300, width: '100%' }}>
                            <LineChart
                                dataset={dailyData}
                                xAxis={[{
                                    scaleType: 'point',
                                    dataKey: 'day',
                                    valueFormatter: (value) => value.toString()
                                }]}
                                series={[
                                    {
                                        dataKey: 'pv',
                                        color: alpha(theme.palette.primary.main, 0.2),
                                        area: true,
                                        showMark: false,
                                    },
                                    {
                                        dataKey: 'uv',
                                        color: theme.palette.primary.main,
                                    },
                                ]}
                                slotProps={{
                                    legend: {
                                        sx: { display: 'none' }
                                    }
                                }}
                                margin={{ left: 40, right: 20, top: 20, bottom: 20 }}
                            />
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, lg: 4 }}>
                    <Paper sx={{ p: 3, borderRadius: 3, height: 400, display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>최근 댓글</Typography>

                            <Tooltip title="댓글 관리" arrow>
                                <IconButton onClick={() => navigate('/comments')} size="small">
                                    <ChevronRightRounded fontSize="medium" />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                            {[1, 2, 3].map((i) => (
                                <Box key={i} sx={{ mb: 2, p: 1.5, bgcolor: 'action.hover', borderRadius: 2 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>작성자 {i}</Typography>
                                    <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>
                                        댓글 내용이 여기에 표시됩니다. 길어지면 생략...
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Paper sx={{ p: 3, borderRadius: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>가장 많이 본 콘텐츠</Typography>

                            <Tooltip title="글 관리" arrow>
                                <IconButton onClick={() => navigate('/posts')} size="small">
                                    <ChevronRightRounded fontSize="medium" />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {[
                                { title: 'React에서 Lazy Loading 적용하기', url: '/posts/1', views: 842 },
                                { title: 'MUI v6 Grid 시스템 완벽 가이드', url: '/posts/2', views: 651 },
                                { title: 'Clean Architecture를 향한 여정', url: '/posts/3', views: 432 },
                            ].map((post, idx) => (
                                <Box key={idx} sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    p: 2,
                                    borderRadius: 2,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    '&:hover': { bgcolor: 'action.hover' }
                                }}>
                                    <Box>
                                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{post.title}</Typography>
                                        <Typography variant="caption" color="text.secondary">{post.url}</Typography>
                                    </Box>
                                    <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.main' }}>
                                        {post.views.toLocaleString()} PV
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};