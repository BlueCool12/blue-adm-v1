import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FormatAlignCenter, FormatAlignLeft, FormatAlignRight } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { FORMAT_ELEMENT_COMMAND, type ElementFormatType } from "lexical";

export default function AlignmentToolbar() {
  const [editor] = useLexicalComposerContext();

  const formatElement = (format: ElementFormatType) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format);
  };

  return (
    <Stack direction="row" spacing={0.5}>
      <IconButton
        size="small"
        onClick={() => formatElement('left')}
        title="왼쪽 정렬"
        sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
      >
        <FormatAlignLeft fontSize="small" />
      </IconButton>

      <IconButton
        size="small"
        onClick={() => formatElement('center')}
        title="중앙 정렬"
        sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
      >
        <FormatAlignCenter fontSize="small" />
      </IconButton>

      <IconButton
        size="small"
        onClick={() => formatElement('right')}
        title="오른쪽 정렬"
        sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
      >
        <FormatAlignRight fontSize="small" />
      </IconButton>
    </Stack>
  );
}