import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode, $createQuoteNode, $isHeadingNode, type HeadingTagType } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { FormatListBulleted, FormatListNumbered, FormatQuote, TextFormat, Title } from "@mui/icons-material";
import { Box, FormControl, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import { $createParagraphNode, $findMatchingParent, $getSelection, $isRangeSelection } from "lexical";
import { useEffect, useState } from "react";

const BLOCK_OPTIONS = {
  paragraph: { label: '본문', icon: <TextFormat fontSize="small" /> },
  h1: { label: '제목 1', icon: <Title fontSize="small" sx={{ fontWeight: 900 }} /> },
  h2: { label: '제목 2', icon: <Title fontSize="small" sx={{ scale: '0.8' }} /> },
  h3: { label: '제목 3', icon: <Title fontSize="small" sx={{ scale: '0.6' }} /> },
  bullet: { label: '불렛 목록', icon: <FormatListBulleted fontSize="small" /> },
  number: { label: '숫자 목록', icon: <FormatListNumbered fontSize="small" /> },
  quote: { label: '인용구', icon: <FormatQuote fontSize="small" /> },
};

export default function HeadingToolbar() {
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState<string>('paragraph');

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;

        const anchorNode = selection.anchor.getNode();
        const element = anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
            const type = e.getType();
            return type === 'heading' || type === 'quote' || type === 'paragraph';
          });

        if (!element) {
          setBlockType('paragraph');
          return;
        }

        const type = element.getType();

        let currentType = type;
        if ($isHeadingNode(element)) currentType = element.getTag();

        if (currentType in BLOCK_OPTIONS) {
          setBlockType(currentType);
        } else {
          setBlockType('paragraph');
        }
      });
    });
  }, [editor]);

  const handleChange = (event: SelectChangeEvent) => {
    const type = event.target.value;
    setBlockType(type);

    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (type === 'bullet') {
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        } else if (type === 'number') {
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        } else {
          if (blockType === 'bullet' || blockType === 'number') {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
          } else if (type === 'paragraph') {
            $setBlocksType(selection, () => $createParagraphNode());
          } else if (type === 'quote') {
            $setBlocksType(selection, () => $createQuoteNode());
          } else if (type === 'h1' || type === 'h2' || type === 'h3') {
            $setBlocksType(selection, () => $createHeadingNode(type as HeadingTagType));
          }
        }
      }
    });
  };

  return (
    <FormControl size="small" variant="standard" sx={{ minWidth: 100 }}>
      <Select
        value={blockType}
        onChange={handleChange}
        disableUnderline
        displayEmpty
        sx={{
          fontSize: '0.875rem',
          height: '32px',
          '& .MuiSelect-select': {
            py: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          },
        }}
        renderValue={(selected) => {
          const option = BLOCK_OPTIONS[selected as keyof typeof BLOCK_OPTIONS];
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {option?.icon}
              {option?.label}
            </Box>
          );
        }}
      >
        {Object.entries(BLOCK_OPTIONS).map(([key, { label, icon }]) => (
          <MenuItem key={key} value={key} sx={{ gap: 1.5, py: 1 }}>
            {icon}
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}