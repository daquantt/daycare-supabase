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

//get all students attendance
export const fetchAttendance = async () => {
  const res = await fetch("/api/attendance?_sort=-date,firstName,classroom&_limit=31");
  const data = await res.json();
  return data;
};

//get all students in class for today's date
export const fetchTodayStudents = async (date) => {
  const res = await fetch(`/api/attendance?date=${date}`);
  const data = await res.json();
  return data;
};

//get all of a student's attendance dates
export const fetchStudentAttendance = async (studentId) => {
  const res = await fetch(`/api/attendance?studentId=${studentId}`);
  const data = await res.json();
  return data;
};

//get students attendance by classroom
export const fetchClassroomAttendance = async (classroom) => {
  const res = await fetch(`/api/attendance?classroom=${classroom}`);
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
