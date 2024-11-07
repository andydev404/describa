import EditorJS, { OutputData } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import ImageTool from '@editorjs/image'
import List from '@editorjs/list'
import Paragraph from '@editorjs/paragraph'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
  initialContent?: OutputData
  onSave?: (data: OutputData) => void
}

export const DescriptionEditor = ({ initialContent, onSave }: Props) => {
  const editorRef = useRef<EditorJS | null>(null)
  const [isReady, setIsReady] = useState(false)

  // Initialize editor
  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: 'productDescription',
        tools: {
          header: Header,
          list: List,
          paragraph: Paragraph,
          image: ImageTool
        },
        readOnly: true,

        data: initialContent,
        onChange: async () => {
          const savedData = await editorRef.current?.save()
          if (savedData) {
            onSave?.(savedData)
          }
        },
        onReady: () => {
          setIsReady(true)
        }
      })

      editorRef.current = editor
    }

    return () => {
      if (
        editorRef.current &&
        typeof editorRef.current.destroy === 'function'
      ) {
        editorRef.current.destroy()
        editorRef.current = null
      }
    }
  }, [])

  // Handle content updates
  useEffect(() => {
    if (isReady && editorRef.current && initialContent) {
      editorRef.current.render(initialContent)
    }
  }, [initialContent, isReady])

  return <div id="productDescription" className="prose max-w-full" />
}
