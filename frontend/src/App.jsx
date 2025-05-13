import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Toaster } from "sonner";
import Home from "./pages/home/Home";
import LayOut from "./pages/LayOut";
import CourseList from "./pages/courses/CourseList";
import CourseDetail from "./pages/courses/CourseDetail";
import Topic from "./pages/courses/Topic";
import Dashboard from "./pages/admin/Dashboard";
import LayOut2 from "./pages/LayOut2";
import CreateCourse from "./pages/admin/CreateCourse";
import CreateCourseContent from "./pages/admin/CreateCourseContent";
import TopicQuestions from "./pages/admin/TopicQuestions";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import Profile from "./pages/profile/Profile";
import AdminCourseList from "./pages/admin/AdminCourseList";
import SearchReturnComponent from "./pages/courses/SearchReturnComponent";

function App() {
  const { token, userRole } = useContext(AppContext);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/course/:courseTitle/topic/:course_id"
            element={<Topic />}
          />

          {token && userRole === "ADMIN" ? (
            <Route path="/dashboard" element={<LayOut2 />}>
              <Route index element={<Dashboard />} />
              <Route path="courses" element={<AdminCourseList />} />
              <Route path="create-course" element={<CreateCourse />} />
              <Route
                path="create-course/:topic_id"
                element={<CreateCourseContent />}
              />
              <Route
                path="create-course/topic/:topic_id"
                element={<TopicQuestions />}
              />
            </Route>
          ) : (
            <Route path="/dashboard" element={<Login />} />
          )}

          <Route path="/" element={<LayOut />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="courses" element={<CourseList />} />
            <Route path="course/:id" element={<CourseDetail />} />
            <Route path="/search" element={<SearchReturnComponent />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        toastOptions={{
          style: {
            background: "#BFECFF",
            color: "#000",
            border: "1px solid #60B5FF",
            padding: "20px 24px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "500",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#ecfdf5",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fee2e2",
            },
          },
        }}
      />
    </>
  );
}

export default App;
