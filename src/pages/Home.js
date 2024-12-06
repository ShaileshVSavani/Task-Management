
import React from "react";


const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 px-6 ">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
        Welcome to Task Manager App
      </h1>
      <p className="text-lg sm:text-xl mb-8 text-center">
        Organize your tasks efficiently with role-based access.
      </p>
      <div className="flex justify-center gap-6">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Explore button */}
          <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 text-white rounded-full shadow-lg hover:from-indigo-700 hover:to-indigo-900 focus:ring-4 focus:ring-indigo-300 transition duration-300 ease-in-out">
            Start Managing Tasks
          </button>
        </div>
      </div>

    </div>
  );
};

export default Home;
