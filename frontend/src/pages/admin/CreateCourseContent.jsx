// import Editors from "@/components/Editors";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/config";
import { AppContext } from "@/context/AppContext";
import { EditorContext } from "@/context/EditorContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function CreateCourseContent() {
  const { topic_id } = useParams();
  const { token } = useContext(AppContext);
  const { initEditor, editorInstanceRef } = useContext(EditorContext);
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    
    try {
      const data = await editorInstanceRef.current.save();
      
      const payload = {
        title: title,
        content: data,
      };
      console.log(topic_id);
      
      const res = await fetch(`${API_URL}/subtopics/topic/${topic_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
      });
      console.log(JSON.stringify(payload));

      const returnData = await res.json();
      console.log(returnData);

      // Navigate back to the previous page
      window.history.back();
    } catch (err) {
      console.log(err.message);
    }
  };


  

  useEffect(() => {
    if (!editorRef.current) {
      initEditor();
      editorRef.current = true;
    }
  }, []);
  return (
    <div>
      <h1 className="text-xl font-bold capitalize mb-4">
        {"// Create Sub-topic Content >>"}{" "}
      </h1>
      <form action="" onSubmit={handleClick}>
        <div className="mb-4">
          <input
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Enter title here"
            className="w-full px-4 text-3xl font-bold outline-none py-4 mx-auto "
          />
        </div>
        <div className="editor-wrapper">
          <div id="editorjs"></div>
        </div>
        <Button
          type="submit"
          className={
            "fixed bottom-10 bg-orange-500 right-24 cursor-pointer z-50"
          }
        >
          Publish
        </Button>
      </form>
    </div>
  );
}
