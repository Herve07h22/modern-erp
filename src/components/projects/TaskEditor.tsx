import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered } from 'lucide-react';

interface TaskEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const MenuBar = ({ editor }: any) => {
  if (!editor) return null;

  return (
    <div className="border-b border-gray-200 p-2 space-x-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1 rounded ${editor.isActive('bold') ? 'bg-gray-100' : ''}`}
      >
        <Bold className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1 rounded ${editor.isActive('italic') ? 'bg-gray-100' : ''}`}
      >
        <Italic className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1 rounded ${editor.isActive('bulletList') ? 'bg-gray-100' : ''}`}
      >
        <List className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1 rounded ${editor.isActive('orderedList') ? 'bg-gray-100' : ''}`}
      >
        <ListOrdered className="w-5 h-5" />
      </button>
    </div>
  );
};

export default function TaskEditor({ content, onChange }: TaskEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border rounded-lg overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="prose max-w-none p-4" />
    </div>
  );
}