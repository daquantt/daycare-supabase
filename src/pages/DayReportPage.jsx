import { Link, useLoaderData } from "react-router-dom";
import DayReport from "../components/DayReport";

const DayReportPage = () => {
  const student = useLoaderData();

  return (
    <section className="container my-4">
      <DayReport student={student} />
    </section>
  );
};

export default DayReportPage;
