import { useEffect } from "react";
import { supabase } from "../supabaseClient";

const TestSupaPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("students") // Replace with your table name
          .select("*"); // Fetch all columns
          console.log(import.meta.env.VITE_APP_SUPABASE_URL);
          console.log(import.meta.env.VITE_APP_SUPABASE_KEY);


        if (error) {
          console.error("Error fetching data:", error);
        } else {
          console.log("Fetched data:", data);
        }
      } catch (err) {
        console.error("Error during fetching:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Test Supabase Page</h1>
      <p>This is a test page for fetching data from Supabase.</p>
    </div>
  );
};

export default TestSupaPage;
