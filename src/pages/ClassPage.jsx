import React from "react";

const ClassPage = (prop) => {
  const { classroom } = prop;

  return (
    <section>
      <h2>{classroom} Classroom</h2>
    </section>
  );
};

export default ClassPage;
