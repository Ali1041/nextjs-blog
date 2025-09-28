"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bold, Italic, Strikethrough, Code, Heading1, Heading2, List, ListOrdered, Quote } from "lucide-react"
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'

export default function RichTextEditor({ content, onChange, placeholder = "Start writing..." }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: content,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none p-4 min-h-[200px] outline-none',
                placeholder: placeholder,
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    useEffect(() => {
        if (editor && content !== null && content !== undefined && editor.getHTML() !== content) {
            editor.commands.setContent(content)
        }
    }, [editor, content])

    return (
        <div className="bg-gray-900/50 border border-gray-800 rounded-md">
            <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-700">
                <Button
                    type="button"
                    size="sm"
                    variant={editor?.isActive('bold') ? 'default' : 'outline'}
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant={editor?.isActive('italic') ? 'default' : 'outline'}
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant={editor?.isActive('strike') ? 'default' : 'outline'}
                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                >
                    <Strikethrough className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant={editor?.isActive('code') ? 'default' : 'outline'}
                    onClick={() => editor?.chain().focus().toggleCode().run()}
                >
                    <Code className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-gray-600 mx-1" />
                <Button
                    type="button"
                    size="sm"
                    variant={editor?.isActive('heading', { level: 1 }) ? 'default' : 'outline'}
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                    <Heading1 className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant={editor?.isActive('heading', { level: 2 }) ? 'default' : 'outline'}
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    <Heading2 className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-gray-600 mx-1" />
                <Button
                    type="button"
                    size="sm"
                    variant={editor?.isActive('bulletList') ? 'default' : 'outline'}
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant={editor?.isActive('orderedList') ? 'default' : 'outline'}
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant={editor?.isActive('blockquote') ? 'default' : 'outline'}
                    onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                >
                    <Quote className="h-4 w-4" />
                </Button>
            </div>
            <EditorContent
                editor={editor}
                placeholder={placeholder}
            />
        </div>
    )
}
