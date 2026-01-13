import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FormatBold, FormatItalic, FormatStrikethrough, FormatUnderlined } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, SELECTION_CHANGE_COMMAND } from "lexical";
import { useCallback, useEffect, useState } from "react";

export default function TextFormatToolbar() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
  }, []);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateToolbar();
        return false;
      },
      1
    );
  }, [editor, updateToolbar]);

  const applyFormat = (format: 'bold' | 'italic' | 'underline' | 'strikethrough') => {    
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);

    setTimeout(() => {
      editor.getEditorState().read(() => {
        updateToolbar();
      });
    }, 0);
  };

  return (
    <Stack direction="row" spacing={0.5}>
      <IconButton
        size="small"
        onClick={() => applyFormat('bold')}
        color={isBold ? 'primary' : 'default'}
        sx={{ bgcolor: isBold ? 'action.selected' : 'transparent' }}
      >
        <FormatBold fontSize="small" />
      </IconButton>

      <IconButton
        size="small"
        onClick={() => applyFormat('italic')}
        color={isItalic ? 'primary' : 'default'}
        sx={{ bgcolor: isItalic ? 'action.selected' : 'transparent' }}
      >
        <FormatItalic fontSize="small" />
      </IconButton>

      <IconButton
        size="small"
        onClick={() => applyFormat("underline")}
        color={isUnderline ? "primary" : "default"}
        sx={{ bgcolor: isUnderline ? "action.selected" : "transparent" }}
      >
        <FormatUnderlined fontSize="small" />
      </IconButton>

      <IconButton
        size="small"
        onClick={() => applyFormat("strikethrough")}
        color={isStrikethrough ? "primary" : "default"}
        sx={{ bgcolor: isStrikethrough ? "action.selected" : "transparent" }}
      >
        <FormatStrikethrough fontSize="small" />
      </IconButton>
    </Stack>
  );
}