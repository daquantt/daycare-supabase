// add student
export const addStudent = async (newStudent) => {
  const res = await fetch("/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newStudent),
  });
  return;
};

//get all students
export const fetchStudents = async () => {
  const res = await fetch("/api/students?_sort=firstName");
  const data = await res.json();
  return data;
};

//get all students in a class
export const fetchStudentsInClass = async (classroom) => {
  const res = await fetch(`/api/students/?classroom=${classroom}`);
  const data = await res.json();
  return data;
};

export const fetchOneStudent = async (id) => {
  const res = await fetch(`/api/students?id=${id}`);
  const data = await res.json();
  return data;
};

// update student
export const updateStudent = async (student) => {
  const res = await fetch(`/api/students/${student.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  return;
};

// delete student
export const deleteStudent = async (id) => {
  const res = await fetch(`/api/students/${id}`, {
    method: "DELETE",
  });
  return;
};

//to get student using id in address bar
export const studentLoader = async ({ params }) => {
  const res = await fetch(`/api/students/${params.id}`);
  const data = await res.json();
  return data;
};
