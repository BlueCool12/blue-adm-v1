import { $createCodeNode } from "@lexical/code";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $setBlocksType } from "@lexical/selection";
import { Code } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { $getSelection, $isRangeSelection } from "lexical";

export default function CodeBlockToolbar() {
  const [editor] = useLexicalComposerContext();

  const insertCodeBlock = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createCodeNode());
      }
    });
  };

  return (
    <IconButton size="small" onClick={insertCodeBlock} title="코드 블록 삽입">
      <Code fontSize="small" />
    </IconButton>
  );
}