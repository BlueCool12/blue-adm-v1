import { AddRounded, CloseRounded, DeleteOutlineRounded, EditOutlined, RefreshRounded, SearchRounded } from "@mui/icons-material";
import { Box, Button, Card, Chip, Container, IconButton, InputBase, Pagination, Skeleton, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import ConfirmDialog from "@/shared/components/ConfirmDialog";
import { usePosts } from "@/features/posts/hooks/usePosts";
import { useDeletePost } from "@/features/posts/hooks/useDeletePost";
import { useCreateDraft } from "@/features/posts/hooks/useCreateDraft";

export default function PostListPage() {

  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  const { data, isLoading, isPlaceholderData } = usePosts(search, page);

  const { mutate: createDraft, isPending: isDrafting } = useCreateDraft();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

  const handleCreateDraft = () => {
    createDraft();
  };

  const handleReset = () => {
    setSearch('');
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleDeleteClick = (id: string, title: string) => {
    setDeleteTarget({ id, title });
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deletePost(deleteTarget.id, {
        onSuccess: () => setDeleteTarget(null),
      });
    }
  };

  return (
    <Container maxWidth="lg" disableGutters>
      <Stack spacing={4}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              차곡차곡 쌓인 지식의 기록들을 살펴보세요.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              지금까지 작성한 소중한 생각들을 한눈에 확인하고 관리할 수 있습니다.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddRounded />}
            onClick={handleCreateDraft}
            disabled={isDrafting}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              fontWeight: 600,
              whiteSpace: 'nowrap',
              height: { xs: '48px', sm: '40px' }
            }}
          >
            새 글 작성
          </Button>
        </Box>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', sm: 'center' }}
          spacing={2}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            width="100%"
            justifyContent="space-between"
          >
            <Search
              sx={{
                width: { xs: '100%', sm: '300px' },
                backgroundColor: 'action.hover',
                borderRadius: '20px',
                '&:hover': {
                  backgroundColor: 'action.selected'
                },
                display: 'flex',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              <SearchIconWrapper>
                <SearchRounded fontSize="small" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="글 검색..."
                value={search}
                onChange={handleSearchChange}
              />
              {search && (
                <IconButton
                  size="small"
                  onClick={handleReset}
                  sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}
                >
                  <CloseRounded fontSize="inherit" />
                </IconButton>
              )}
            </Search>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                width: { xs: '100%', sm: 'auto' },
                justifyContent: { xs: 'space-between' }
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ pl: { xs: 1, sm: 0 } }}>
                총 <b>{data?.total ?? 0}</b>개의 게시물이 검색되었습니다.
              </Typography>

              <IconButton
                onClick={handleReset}
                size="small"
                title="필터 초기화"
                sx={{ border: '1px solid', borderColor: 'divider' }}
              >
                <RefreshRounded fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>


        <Card
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            overflowX: 'auto',
            opacity: isPlaceholderData ? 0.6 : 1,
            transition: 'opacity 0.2s'
          }}
        >
          <TableContainer sx={{ minWidth: { xs: 600, sm: 'auto' } }}>
            <Table>
              <TableHead sx={{ bgcolor: 'action.hover' }}>
                <TableRow>
                  <TableCell width={80} align="center">번호</TableCell>
                  <TableCell>제목</TableCell>
                  <TableCell width={120} align="center">상태</TableCell>
                  <TableCell width={150} align="center">작성일</TableCell>
                  <TableCell width={120} align="center">관리</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {isLoading ? (
                  Array.from({ length: 10 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={10}><Skeleton variant="text" height={40} /></TableCell>
                    </TableRow>
                  ))
                ) : data?.items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                      <Typography color="text.secondary">검색 결과가 없습니다.</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.items.map((post) => (
                    <TableRow key={post.id} hover>

                      <TableCell align="center">{post.id}</TableCell>

                      <TableCell>
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          sx={{
                            cursor: 'pointer',
                            '&:hover': { color: 'primary.main' },
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                          }}
                          onClick={() => navigate(`/posts/${post.id}/edit`)}
                        >
                          {post.title}
                        </Typography>
                      </TableCell>

                      <TableCell align="center">
                        {(() => {
                          const status = post.publishInfo?.status;
                          const statusConfig = {
                            PUBLISHED: { label: '공개', color: 'info' as const },
                            DRAFT: { label: '초안', color: 'default' as const },
                            ARCHIVED: { label: '보관', color: 'warning' as const },
                          };

                          const config = statusConfig[status as keyof typeof statusConfig] || { label: status, color: 'default' as const };

                          return (
                            <Chip
                              label={config.label}
                              size="small"
                              variant="outlined"
                              color={config.color}
                              sx={{ fontWeight: 600, fontSize: '0.75rem' }}
                            />
                          );
                        })()}
                      </TableCell>

                      <TableCell color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        {dayjs(post.createdAt).format('YYYY-MM-DD')}
                      </TableCell>

                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <IconButton
                            size="small"
                            sx={{
                              color: 'text.disabled',
                              '&:hover': {
                                color: 'primary.main'
                              }
                            }}
                            onClick={() => navigate(`/posts/${post.id}/edit`)}
                          >
                            <EditOutlined fontSize="small" />
                          </IconButton>

                          <IconButton
                            size="small"
                            sx={{
                              color: 'text.disabled',
                              '&:hover': {
                                color: 'error.main'
                              }
                            }}
                            onClick={() => handleDeleteClick(post.id, post.title)}
                          >
                            <DeleteOutlineRounded fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <Pagination
            count={data?.lastPage ?? 1}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
          />
        </Box>
      </Stack>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="글 삭제"
        content={
          <>
            정말로 <b>{deleteTarget?.title}</b> 글을 삭제하시겠습니까? <br /><br />
            삭제된 데이터는 복구할 수 없습니다.
          </>
        }
        isLoading={isDeleting}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
}

const Search = styled('div')({
  position: 'relative',
  borderRadius: '8px',
  backgroundColor: 'action.hover',
  '&:hover': { backgroundColor: 'action.selected' },
  width: '300px',
});

const SearchIconWrapper = styled('div')({
  padding: '0 16px',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'text.secondary',
});

const StyledInputBase = styled(InputBase)({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '8px 8px 8px 0',
    paddingLeft: `calc(1em + 32px)`,
    fontSize: '0.875rem',
  },
});