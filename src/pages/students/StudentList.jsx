import React from "react";
import { useGetStudentQuery } from "../../redux/apiSlice";

const StudentList = () => {
  const { data: students, error, isLoading } = useGetStudentQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading students</p>;
  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students?.map((student) => (
          <li key={student.id}>
            {student.name} {student.rollNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
