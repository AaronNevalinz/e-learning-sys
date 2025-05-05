// import Editors from "@/components/Editors";
import { Button } from "@/components/ui/button";
import { EditorContext } from "@/context/EditorContext";
import { useContext, useEffect, useRef } from "react";

export default function CreateCourseContent() {
  const { initEditor, editorInstanceRef } = useContext(EditorContext)
  const editorRef = useRef(null);

   const handleClick = async () => {
     const data = await editorInstanceRef.current.save();
     console.log(data);
   };

  useEffect(()=>{
    if (!editorRef.current) {
      initEditor();
      editorRef.current = true;
    }
  }, [])
  return (
    <div>
      <h1 className="text-xl font-bold capitalize mb-4"> {'// Create Sub-topic Content >>'} </h1>
      <div className="max-w-6xl mx-auto editor-wrapper">
        <div id="editorjs"></div>
      </div>
      <Button onClick={handleClick} className={'fixed bottom-10 bg-orange-500 right-24 cursor-pointer z-50'}>Publish</Button>
    </div>
  );
}
