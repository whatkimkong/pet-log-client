import React from "react";

const ProtectedPage = ({ user }) => {
  return (
    <div>
      <h1>This page is hyper protected!</h1>
      <h1>user {user && user._id}</h1>
    </div>
  );
};

export default ProtectedPage;
