import { supabase } from "../supabaseClient";

//to get a class using id in address bar
export const classLoader = async ({ params }) => {
  const { data, error } = await supabase.from("classrooms").select().eq("id", params.id).maybeSingle();
  if (error) {
    console.log(error);
  }
  return data;
};
