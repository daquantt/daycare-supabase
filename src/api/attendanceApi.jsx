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
  const res = await fetch("/api/attendance?date=2024-08-06");
  const data = await res.json();
  return data;
};
