import { Button, Container, Divider, Stack, TextField } from "@mui/material";
import { PostEditor } from "@/features/posts/components/editor/PostEditor";
import type { PostEditorHandle } from "@/features/posts/components/editor/PostEditorTypes";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { usePost } from "@/features/posts/hooks/usePost";
import { PostStatus } from "@/features/posts/types/post";
import PostPublishModal from "@/features/posts/components/PostPublishModal";
import { useUpdatePost } from "@/features/posts/hooks/useUpdatePost";
import { useAlert } from "@/shared/hooks/useAlert";

export interface PublishDataState {
  slug: string;
  description: string;
  categoryId: number;
  status: PostStatus;
}

export default function PostEditPage() {

  const navigate = useNavigate();

  const { showAlert } = useAlert();

  const { postId } = useParams() as { postId: string };

  const editorRef = useRef<PostEditorHandle>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();

  const [title, setTitle] = useState("");
  const [publishData, setPublishData] = useState({
    slug: "",
    description: "",
    categoryId: 0,
    status: PostStatus.DRAFT as PostStatus,
  });

  const { data: post, isPending: isLoading } = usePost(postId);

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      if (post.publishInfo) {
        setPublishData({
          slug: post.publishInfo.slug || "",
          description: post.publishInfo.description || "",
          categoryId: post.publishInfo.categoryId || 0,
          status: post.publishInfo.status || PostStatus.DRAFT,
        })
      }
    }
  }, [post]);

  const handlePublishDataChange = <K extends keyof PublishDataState>(key: K, value: PublishDataState[K]) => {
    setPublishData(prev => ({ ...prev, [key]: value }));
  };

  const getPayload = () => {
    const { html, json } = editorRef.current?.getContent() || { html: '', json: '' }

    return {
      title,
      content: html,
      contentJson: json,
      description: publishData.description,
      categoryId: publishData.categoryId,
    }
  }

  const handleDraftSave = () => {
    const payload = getPayload();

    updatePost(
      {
        id: postId,
        payload: {
          ...payload,
          slug: publishData.slug || null,
          status: PostStatus.DRAFT,
        },
      },
      {
        onSuccess: () => {
          showAlert('임시 저장되었습니다!', 'success');
        },
      }
    );
  };

  const handleConfirm = () => {
    const slug = publishData.slug?.trim();
    const description = publishData.description?.trim();
    const categoryId = publishData.categoryId;

    if (publishData.status === PostStatus.PUBLISHED) {
      if (!slug) {
        return showAlert('URL SLUG를 입력해주세요.', 'warning');
      }
      if (!description) {
        return showAlert('요약 내용을 입력해주세요.', 'warning');
      }
      if (!categoryId) {
        return showAlert('카테고리를 선택해주세요.', 'warning');
      }
    }

    const payload = getPayload();

    updatePost(
      {
        id: postId,
        payload: {
          ...payload,
          slug: slug,
          description: description,
          categoryId: categoryId,
          status: publishData.status,
        },
      },
      {
        onSuccess: () => {
          const message = publishData.status === PostStatus.PUBLISHED
            ? '성공적으로 발행되었습니다! 🎉'
            : '성공적으로 저장되었습니다.';

          showAlert(message, 'success');
          setIsModalOpen(false);
          navigate('/posts');
        },
      }
    );
  };

  if (!postId) return <div>잘못된 접근이거나 로딩 중입니다.</div>;
  if (isLoading) return <div>데이터를 불러오는 중...</div>;

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 2,
        px: { xs: 0, sm: 2, md: 3 }
      }}
    >
      <Stack spacing={3}>

        <TextField
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="standard"
          fullWidth
          slotProps={{
            htmlInput: {
              style: { fontSize: '2rem', fontWeight: 'bold' }
            }
          }}
          sx={{
            '& .MuiInput-underline:before': { borderBottomColor: 'divider' },
            '& .MuiInput-underline:after': { borderBottomColor: 'primary.main' },
          }}
        />

        <PostEditor
          postId={postId}
          ref={editorRef}
          initialContent={post?.content}
        />

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pb: 10 }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={handleDraftSave}
            disabled={isUpdating}
          >
            임시 저장
          </Button>
          <Button
            variant="contained"
            disableElevation
            size="large"
            onClick={() => setIsModalOpen(true)}
            disabled={isUpdating}
          >
            작성 완료
          </Button>
        </Stack>

      </Stack>

      <PostPublishModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={publishData}
        onChange={handlePublishDataChange}
        onConfirm={handleConfirm}
      />
    </Container>
  );
}