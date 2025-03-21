import React, { useState } from "react";
import { useUpdateStudentMutation } from "../../redux/apiSlice";

const UpdateStudent = ({ student }) => {
  const [updateStudent] = useUpdateStudentMutation();
  const [name, setName] = useState(student.name);

  const handleUpdate = async () => {
    await updateStudent({ id: student.id, name });
  };

  return (
    <div>
      <h2>Update Student</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateStudent;
