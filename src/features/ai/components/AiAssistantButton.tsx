import { useState } from 'react';
import { Fab, Popover, Box, Typography, Paper, IconButton, CircularProgress, Skeleton } from '@mui/material';
import { RefreshRounded, SmartToyRounded, ErrorOutlineRounded, AutoAwesomeRounded } from '@mui/icons-material';
import { useSuggestedTopic } from '../hooks/useSuggestedTopic';

export function AiAssistantButton() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { data, isLoading, isError, refetch, isFetching } = useSuggestedTopic();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);

    if (!data) {
      refetch();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRefresh = () => {
    refetch();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'ai-assistant-popover' : undefined;

  return (
    <>
      <Fab
        color="primary"
        aria-label="ai-assistant"
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1300,
        }}
      >
        <SmartToyRounded />
      </Fab>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: {
              width: 320,
              marginTop: -2,
              borderRadius: 3,
              overflow: 'hidden'
            }
          }
        }}
      >
        <Paper elevation={0} sx={{ display: 'flex', flexDirection: 'column', maxHeight: 400 }}>
          <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText', display: 'flex', alignItems: 'center', gap: 1 }}>
            <AutoAwesomeRounded fontSize="small" />
            <Typography variant="subtitle1" fontWeight="bold">
              AI 블로그 어시스턴트
            </Typography>
          </Box>

          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" fontWeight="bold" color="text.secondary" textTransform="uppercase">
                추천 주제
              </Typography>
              <IconButton
                size="small"
                onClick={handleRefresh}
                aria-label="refresh topic"
                disabled={isFetching}
              >
                {isFetching ? <CircularProgress size={16} /> : <RefreshRounded fontSize="small" />}
              </IconButton>
            </Box>

            {isError ? (
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  bgcolor: 'error.50',
                  borderColor: 'error.200',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <ErrorOutlineRounded color="error" />
                <Typography variant="body2" color="error.main" fontWeight="medium">
                  주제를 불러오지 못했습니다.
                </Typography>
              </Paper>
            ) : isLoading ? (
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Skeleton variant="text" width="30%" height={16} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="80%" height={24} />
              </Paper>
            ) : (
              <Paper
                variant="outlined"
                sx={{
                  p: 1.5,
                }}
              >
                {data?.category && (
                  <Typography variant="caption" fontWeight="bold" color="primary.main" sx={{ display: 'block', mb: 0.5 }}>
                    [{data.category}]
                  </Typography>
                )}
                <Typography variant="body2" fontWeight="bold" color="text.primary">
                  {data?.topic || "새로운 주제를 찾아볼까요?"}
                </Typography>
              </Paper>
            )}
          </Box>
        </Paper>
      </Popover>
    </>
  );
}
