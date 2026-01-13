import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { Box, styled } from "@mui/material";

export const StyledEditable = styled(ContentEditable)({
  minHeight: 'calc(100dvh - 450px)',
  width: '100%',
  padding: '7px 24px',

  color: 'text.primary',

  outline: 'none',
  border: 'none',

  fontFamily: 'Pretendard, -apple-system, sans-serif',
  fontSize: '1rem',
  lineHeight: 1.6,

  '&:focus': {
    outline: 'none',
  },
  '&:focus-visible': {
    outline: 'none',
  },

  // Lexical Theme Styles

  // 문단
  '& .editor-paragraph': {
    marginBottom: '1em',
  },

  // 제목 (H1)
  '& .editor-h1': {
    fontSize: '2rem',
    fontWeight: 700,
    color: 'text.primary',
    marginTop: '1.5em',
    marginBottom: '0.5em',
    borderBottom: `1px solid`,
    borderColor: 'divider',
    paddingBottom: '0.3em',
  },

  // 제목 (H2)
  '& .editor-h2': {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: 'text.primary',
    marginTop: '1.2em',
    marginBottom: '0.5em',
  },

  // 리스트 (UL/OL)
  '& .editor-list-ul': {
    paddingLeft: '1.5em',
    listStyleType: 'disc',
    marginBottom: '1em',
  },
  '& .editor-list-ol': {
    paddingLeft: '1.5em',
    listStyleType: 'decimal',
    marginBottom: '1em',
  },

  // 텍스트 스타일
  '& .editor-text-bold': {
    fontWeight: '700',
    color: 'text.primary',
  },
  '& .editor-text-italic': {
    fontStyle: 'italic',
  },
  '& .editor-text-underline': {
    textDecoration: 'underline',
  },
  '& .editor-text-strikethrough': {
    textDecoration: 'line-through',
    color: 'text.disabled',
  },
  '& .editor-text-underlineStrikethrough': {
    textDecoration: 'underline line-through',
  },

  // 인용구 (Quote)
  '& .editor-quote': {
    margin: '1.5em 0',
    paddingLeft: '1em',
    borderLeft: `4px solid`,
    borderColor: 'primary.main',
    backgroundColor: 'action.hover',
    color: 'text.secondary',
    fontStyle: 'italic',
  },

  // 코드 블럭 (Inline Code)
  '& .editor-code': {
    backgroundColor: 'action.selected',
    color: 'text.primary',
    fontFamily: 'monospace',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.9em',
  },

  // 링크
  '& .editor-link': {
    color: 'primary.main',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  // 구분선 (Horizontal Rule)
  '& hr': {
    border: 'none',
    borderTop: '1px solid',
    borderColor: 'divider',
    margin: '32px 0',
    cursor: 'pointer',
    transition: 'all 0.2s ease',

    '&.selected': {
      outline: '2px solid',
      outlineColor: 'primary.main',
      borderColor: 'transparent',
    },

    '&:hover': {
      borderColor: 'primary.light',
      borderTopWidth: '2px',
    },

    // 정렬 (Align)
    '& .editor-align-left': {
      textAlign: 'left',
    },
    '& .editor-align-center': {
      textAlign: 'center',
    },
    '& .editor-align-right': {
      textAlign: 'right',
    },
  },
});

export const PlaceholderText = styled(Box)({
  position: 'absolute',
  top: '24px',
  left: '24px',
  color: 'text.secondary',
  pointerEvents: 'none',
  userSelect: 'none',
});