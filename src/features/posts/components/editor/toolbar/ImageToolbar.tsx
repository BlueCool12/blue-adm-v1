import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useRef } from "react";
import { INSERT_IMAGE_COMMAND } from "@/features/posts/components/editor/command";
import { CircularProgress, IconButton } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import { useImageUpload } from "@/features/posts/hooks/useImageUpload";

interface ImageToolbarProps {
  postId: string;
}

export default function ImageToolbar({ postId }: ImageToolbarProps) {
  const [editor] = useLexicalComposerContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadImage, isUploading } = useImageUpload(postId);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    try {
      const url = await uploadImage(file);

      editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
        src: url,
        altText: file.name,
      });

    } finally {
      event.target.value = '';
    }
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={handleClick}
        disabled={isUploading}
      >
        {isUploading ? <CircularProgress size={24} /> : <ImageIcon />}
      </IconButton>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </>
  )
}