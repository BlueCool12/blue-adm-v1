import { $createHorizontalRuleNode } from "@lexical/extension";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HorizontalRule } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { $getSelection, $isRangeSelection } from "lexical";

export default function InsertRuleToolbar() {
  const [editor] = useLexicalComposerContext();

  const onClick = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.insertNodes([$createHorizontalRuleNode()]);
      }
    });
  };

  return (
    <IconButton
      size="small"
      onClick={onClick}
      title="구분선 삽입"
      sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
    >
      <HorizontalRule fontSize="small" />
    </IconButton>
  );
}