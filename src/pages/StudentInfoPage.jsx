import LikesDislikes from "../components/LikesDislikes";
import { useLoaderData } from "react-router-dom";

const StudentInfoPage = () => {
  const student = useLoaderData();

  return (
    <section>
      <h2 className="text-center my-3">Student Details</h2>
      <div className="container border rounded">
        <div className="d-flex p-2 mb-2">
          <div className="w-50 border-end p-3">
            <h3>Student Info</h3>
            <p>
              Name: {student.firstName} {student.lastName}
            </p>
            <p>Date of birth: {student.birthDate}</p>
          </div>
          <LikesDislikes />
        </div>
      </div>
    </section>
  );
};

export default StudentInfoPage;
