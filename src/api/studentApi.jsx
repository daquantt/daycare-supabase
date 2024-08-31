import { toast } from "react-toastify";
import { supabase } from "../supabaseClient";

// add student
export const addStudent = async (newStudent) => {
  const { error } = await supabase.from("students").insert(newStudent);
  if (error) {
    toast.error("Error adding student");
    console.log("Error adding student", error);
  }
  return;
};

//get all students
export const fetchStudents = async () => {
  const { data, error } = await supabase.from("students").select("*").order("firstName", { ascending: true });
  if (error) {
    console.log(error);
  }
  return data;
};

fetchStudents();

//get all students in a class
export const fetchStudentsInClass = async (classroom) => {
  const { data, error } = await supabase.from("students").select().eq("classroom", classroom);
  if (error) {
    console.log(error);
  }
  return data;
};

export const fetchOneStudent = async (id) => {
  const { data, error } = await supabase.from("students").select().eq("id", id);
  if (error) {
    console.log(error, "Error fetching one student by id");
  }
  return data;
};

// update student
export const updateStudent = async (student) => {
  const { error } = await supabase.from("students").update(student).eq("id", student.id);
  if (error) {
    console.log(error);
  }
  return;
};

// delete student
export const deleteStudent = async (id) => {
  const response = await supabase.from("students").delete().eq("id", id);
  return;
};

//to get student using id in address bar
export const studentLoader = async ({ params }) => {
  const { data, error } = await supabase.from("students").select().eq("id", params.id).maybeSingle();
  if (error) {
    console.log(error, "Error fetching one student by id from params");
  }
  return data;
};
