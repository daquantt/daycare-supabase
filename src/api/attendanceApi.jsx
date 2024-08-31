import { toast } from "react-toastify";
import { supabase } from "../supabaseClient";

// add student to attendance
export const addStudentToClass = async (student) => {
  const { error } = await supabase.from("attendance").insert(student);
  if (error) {
    toast.error("Error adding student to class attendance. Please try again.");
    console.log("Error adding student to class attendance", error);
  } else toast.success(`${student.firstName} was added to the class`);
  return;
};

//get all students attendance
export const fetchAttendance = async () => {
  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .order("date", { ascending: false })
    .order("firstName", { ascending: true })
    .order("classroom", { ascending: true })
    .limit(30);
  console.log(data);
  if (error) {
    console.log(error);
  }
  return data;
};

//get all students in class for today's date
export const fetchTodayStudents = async (date) => {
  const { data, error } = await supabase.from("attendance").select().eq("date", date);
  if (error) {
    console.log(error);
  }
  return data;
};

//get all of a student's attendance dates
export const fetchStudentAttendance = async (studentId) => {
  const { data, error } = await supabase.from("attendance").select().eq("studentId", studentId);
  if (error) {
    console.log(error);
  }
  return data;
};

//get students attendance by classroom
export const fetchClassroomAttendance = async (classroom) => {
  const { data, error } = await supabase.from("attendance").select().eq("classroom", classroom);
  if (error) {
    console.log(error);
  }
  return data;
};

// update student attendance
export const updateAttendance = async (attendance) => {
  const { error } = await supabase.from("attendance").update(attendance).eq("id", attendance.id);
  if (error) {
    console.log(error);
  }
  return;
};

// delete attendance
export const deleteAttendance = async (id) => {
  const response = await supabase.from("attendance").delete().eq("id", id);
  return;
};

//to get a student attendance using id in address bar
export const attendanceLoader = async ({ params }) => {
  const { data, error } = await supabase.from("attendance").select().eq("id", params.id).maybeSingle();
  if (error) {
    console.log(error);
  }
  return data;
};
