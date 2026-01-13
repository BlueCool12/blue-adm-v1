export interface PostEditorHandle {
  getContent: () => { json: string; html: string; };
}

export interface PostEditorProps {
  initialContent?: string | null;
  postId: string;
}