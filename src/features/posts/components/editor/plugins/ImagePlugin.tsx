import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from '@lexical/utils';
import { $insertNodes, COMMAND_PRIORITY_EDITOR } from "lexical";
import { useEffect, type JSX } from "react";
import { $createImageNode, ImageNode, type ImagePayload } from "@/features/posts/components/editor/nodes/ImageNode";
import { INSERT_IMAGE_COMMAND } from "@/features/posts/components/editor/command";

export default function ImagesPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) throw new Error('');

    return mergeRegister(
      editor.registerCommand<ImagePayload>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload);
          $insertNodes([imageNode]);

          return true;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    );
  }, [editor]);

  return null;
}