import React from "react";

const JobDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div>
      <h2>job details page</h2>
      <h3>{id}</h3>
    </div>
  );
};

export default JobDetailsPage;
