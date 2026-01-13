import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { Redo, Undo } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { CAN_REDO_COMMAND, CAN_UNDO_COMMAND, REDO_COMMAND, UNDO_COMMAND } from "lexical";
import { useEffect, useState } from "react";

export default function HistoryToolbar() {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        1
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        1
      )
    );
  }, [editor]);

  return (
    <Stack direction="row" spacing={0.5}>
      <IconButton
        size="small"
        disabled={!canUndo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        title="실행 취소"
      >
        <Undo fontSize="small" />
      </IconButton>

      <IconButton
        size="small"
        disabled={!canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        title="다시 실행"
      >
        <Redo fontSize="small" />
      </IconButton>
    </Stack>
  );
}