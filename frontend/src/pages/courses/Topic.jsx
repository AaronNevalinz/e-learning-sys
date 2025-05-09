/* eslint-disable react/no-unescaped-entities */
import { AppSidebar } from "@/components/app-sidebar";
import SideNavbar from "@/components/side-nav-bar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { API_URL } from "@/config";
import { AppContext } from "@/context/AppContext";
import RenderEditorContent from "@/RenderEditorContent";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Topic() {
  const { course_id } = useParams();
  const { token } = useContext(AppContext);
  const [course, setCourse] = useState({});
  const fetchCourseDetails = async () => {
    const res = await fetch(`${API_URL}/courses/${course_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (data.status === 200) {
      setCourse(data.result);
    }
  };
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState("")

  const handleSubtopicClick = async (subtopicId) => {
    const res = await fetch(`${API_URL}/subtopics/${subtopicId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    
    setTitle(data.result.title)
    setContent(JSON.parse(data.result.content)); // Update the content state with the fetched data
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);
  return (
    <>
      <SidebarProvider>
        <AppSidebar
          topics={course.topics}
          title={course.title}
          onSubTopicClick={handleSubtopicClick}
        />
        <main className="w-full ">
          <div className="">
            <SideNavbar />
          </div>

          <div className="p-8 max-w-6xl mx-auto leading-7">
            <RenderEditorContent data={content} title={title}/>
          </div>
        </main>
      </SidebarProvider>
    </>
  );
}
