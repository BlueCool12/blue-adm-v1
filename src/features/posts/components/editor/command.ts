import { createCommand, type LexicalCommand } from "lexical";
import type { ImagePayload } from "@/features/posts/components/editor/nodes/ImageNode";

export const INSERT_IMAGE_COMMAND: LexicalCommand<ImagePayload> = createCommand(
  'INSERT_IMAGE_COMMAND'
);