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
  // try {
  const res = await fetch("/api/students?_sort=firstName");
  const data = await res.json();
  return data;
  // } catch (error) {
  //   console.log("There was a problem with the fetchStudents operation:", error);
  // }
};

export const fetchStudent = async (id) => {
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

//to get student using id in address bar
export const studentLoader = async ({ params }) => {
  const res = await fetch(`/api/students/${params.id}`);
  const data = await res.json();
  return data;
};
