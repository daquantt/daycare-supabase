import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import AddStudentPage from "./pages/AddStudentPage";
import StudentInfoPage from "./pages/StudentInfoPage";
import { studentLoader } from "./api/studentApi";
import EditStudentPage from "./pages/EditStudentPage";
import StudentListPage from "./pages/StudentListPage";
import { attendanceLoader } from "./api/attendanceApi";
import DayReportPage from "./pages/DayReportPage";
import EditDayReportPage from "./pages/EditDayReportPage";
import ClassPage from "./pages/ClassPage";
import { classLoader } from "./api/classApi";
import CreateAttendancePage from "./pages/CreateAttendancePage";
import ViewAttendancePage from "./pages/ViewAttendancePage";
import ClassHoursReportPage from "./pages/ClassHoursReportPage";
import StudentHoursReportPage from "./pages/StudentHoursReportPage";
import TestSupaPage from "./pages/TestSupaPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      //webpage will load mainLayout first with the homepage (index) first
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/test" element={<TestSupaPage />} />
        <Route path="/register-student" element={<AddStudentPage />} />
        <Route path="/student-list" element={<StudentListPage />} />
        <Route path="/edit-student/:id" element={<EditStudentPage />} loader={studentLoader} />
        <Route path="/students/:id" element={<StudentInfoPage />} loader={studentLoader} />
        <Route path="/day-report/:id" element={<DayReportPage />} loader={attendanceLoader} />
        <Route path="/edit-day-report/:id" element={<EditDayReportPage />} loader={attendanceLoader} />
        <Route path="/class/:id" element={<ClassPage />} loader={classLoader} />
        <Route path="/create-attendance" element={<CreateAttendancePage />} />
        <Route path="/student-hours-report" element={<StudentHoursReportPage />} />
        <Route path="/class-hours-report" element={<ClassHoursReportPage />} />
        <Route path="/view-attendance" element={<ViewAttendancePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
