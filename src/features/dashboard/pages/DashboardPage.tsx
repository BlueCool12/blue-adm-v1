import { Card, CardContent, Typography, Grid } from '@mui/material';

export default function Dashboard() {
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
                <Card><CardContent>
                    <Typography variant="h6">오늘 PV</Typography>
                    <Typography variant="h4">1,234</Typography>
                </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <Card><CardContent>
                    <Typography variant="h6">게시글</Typography>
                    <Typography variant="h4">87</Typography>
                </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <Card><CardContent>
                    <Typography variant="h6">대기 댓글</Typography>
                    <Typography variant="h4">5</Typography>
                </CardContent></Card>
            </Grid>
        </Grid>
    );
}
