import dateFormat, { masks } from "dateformat";

// add student to attendance
export const addStudentToClass = async (student) => {
  const res = await fetch("/api/attendance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  return;
};

//get all students in class for today's date
export const fetchTodayStudents = async () => {
  const today = new Date().toLocaleDateString();
  const todayAsString = dateFormat(today, "yyyy-mm-dd");

  const res = await fetch(`/api/attendance?date=${todayAsString}`);
  const data = await res.json();
  return data;
};

// update student attendance
export const updateAttendance = async (attendance) => {
  const res = await fetch(`/api/attendance/${attendance.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(attendance),
  });
  return;
};

//to get a student attendance using id in address bar
export const attendanceLoader = async ({ params }) => {
  const res = await fetch(`/api/attendance/${params.id}`);
  const data = await res.json();
  return data;
};
