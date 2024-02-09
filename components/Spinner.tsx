import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-5 w-5 border-t-4 border-white"></div>
    </div>
  );
};

export default Spinner;
