"use client"
import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Alert from 'editorjs-alert';
import EditorjsList from '@editorjs/list';
import SimpleImage from 'simple-image-editorjs';
import Table from '@editorjs/table';
import Undo from 'editorjs-undo';
import CodeTool from '@editorjs/code';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useUser } from '@clerk/nextjs';
import GenerateAITemplate from './GenerateAITemplate';

function RichDocumentEditor({ params }) {
  const editorRef = useRef(null);
  const hasRenderedOnce = useRef(false);
  const { user } = useUser();
  const [initialData, setInitialData] = useState(null);

  // 🔁 Fetch document data
  useEffect(() => {
    if (!params?.documentid) return;

    const docRef = doc(db, 'documentOutput', params.documentid);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      const data = docSnap.data();
      if (!hasRenderedOnce.current && data?.output) {
        setInitialData(data.output);
      }
    });

    return () => unsubscribe();
  }, [params?.documentid]);

  // 🧠 Initialize EditorJS
  useEffect(() => {
    if (editorRef.current || typeof window === 'undefined' || !initialData) return;

    const editor = new EditorJS({
      holder: 'editorjs',
      tools: {
        header: Header,
        list: {
          class: EditorjsList,
          inlineToolbar: true,
          config: { defaultStyle: 'unordered' },
        },
        table: Table,
        image: SimpleImage,
        code: CodeTool,
        alert: Alert,
        delimiter: Delimiter,
      },
      data: initialData,
      autofocus: true,
      async onReady() {
        editorRef.current = editor;
        new Undo({ editor });
        hasRenderedOnce.current = true;
      },
      onChange: async (api) => {
        try {
          const outputData = await api.saver.save();
          const docRef = doc(db, 'documentOutput', params?.documentid);
          await updateDoc(docRef, {
            output: outputData,
            editedBy: user?.primaryEmailAddress?.emailAddress || 'Unknown',
          });
        } catch (error) {
          console.error('Error saving document:', error);
        }
      },
    });

    return () => {
      editor.isReady
        .then(() => {
          editor.destroy();
          editorRef.current = null;
          hasRenderedOnce.current = false;
        })
        .catch((e) => console.error('Editor cleanup failed:', e));
    };
  }, [initialData]);

  // 🔁 Handle AI Output
  const handleAIOutput = async (output) => {
    const editor = editorRef?.current;
    if (editor) {
      try {
        await editor.render(output);

        setTimeout(async () => {
          const savedOutput = await editor.save();
          const docRef = doc(db, 'documentOutput', params?.documentid);
          await updateDoc(docRef, {
            output: savedOutput,
            editedBy: user?.primaryEmailAddress?.emailAddress || 'Unknown',
          });
          console.log("✅ AI content saved to Firestore");
        }, 200);
      } catch (e) {
        console.error("❌ Error rendering or saving AI content:", e);
      }
    }
  };

  return (
    <div className="lg:-ml-40">
      <div id="editorjs" className="min-h-[400px]"></div>
      <div className='fixed bottom-10 md:ml-85 left-0 z-10'>
        <GenerateAITemplate setGenerateAIOutput={handleAIOutput} />
      </div>
    </div>
  );
}

export default RichDocumentEditor;
