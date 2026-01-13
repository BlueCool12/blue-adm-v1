import { BrokenImageOutlined } from "@mui/icons-material";
import { Box, Skeleton, Typography } from "@mui/material";
import type React from "react";
import { useState, type ImgHTMLAttributes } from "react";

interface ImageComponentProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  maxWidth?: number;
  nodeKey?: string;
  className?: string;
}

export const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  alt,
  width = '100%',
  height = 'auto',
  className,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setIsError(true);
  };

  return (
    <Box
      className={className}
      sx={{
        position: 'relative',
        width: width,
        minHeight: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
        borderRadius: 1,
        overflow: 'hidden'
      }}
    >
      {/* Loading */}
      {isLoading && !isError && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ position: 'absolute', inset: 0 }}
        />
      )}

      {/* Error */}
      {isError && (
        <Box sx={{ textAlign: 'center', color: 'text.secondary', p: 2 }}>
          <BrokenImageOutlined sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="caption" display="block">
            이미지 로드 실패
          </Typography>
        </Box>
      )}

      {/* Rendering */}
      {!isError && (
        <Box
          component="img"
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          sx={{
            display: isLoading ? 'none' : 'block',
            width: '100%',
            height: height,
            objectFit: 'cover',
            transition: 'opacity 0.3s',
          }}
        />
      )}
    </Box>
  );
};

export default ImageComponent;