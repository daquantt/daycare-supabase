import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AddStudentPage from "./pages/AddStudentPage";
import StudentInfoPage from "./pages/StudentInfoPage";
import { studentLoader } from "./api/studentApi";
import DayReportPage from "./pages/DayReportPage";
import EditStudentPage from "./pages/EditStudentPage";
import StudentListPage from "./pages/StudentListPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      //webpage will load mainLayout first with the homepage (index) first
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/register-student" element={<AddStudentPage />} />
        <Route path="/student-list" element={<StudentListPage />} />
        <Route path="/edit-student/:id" element={<EditStudentPage />} loader={studentLoader} />
        <Route path="/students/:id" element={<StudentInfoPage />} loader={studentLoader} />
        <Route path="/student-report/:id" element={<DayReportPage />} loader={studentLoader} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
