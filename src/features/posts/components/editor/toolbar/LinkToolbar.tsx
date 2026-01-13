import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Link, LinkOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { $getSelection, $isRangeSelection, SELECTION_CHANGE_COMMAND } from "lexical";
import { useCallback, useEffect, useState } from "react";

export default function LinkToolbar() {
  const [editor] = useLexicalComposerContext();
  const [isLink, setIsLink] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = selection.getNodes()[0];
      const parent = node?.getParent();
      setIsLink($isLinkNode(node) || $isLinkNode(parent));
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

  const insertLink = useCallback(() => {
    if (!isLink) {
      const url = prompt("연결할 URL을 입력하세요:", "https://");
      if (url) {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
      }
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  return (
    <IconButton
      size="small"
      onClick={insertLink}
      color={isLink ? "primary" : "default"}
      title={isLink ? "링크 해제" : "링크 삽입"}
    >
      {isLink ? <LinkOff fontSize="small" /> : <Link fontSize="small" />}
    </IconButton>
  );
}