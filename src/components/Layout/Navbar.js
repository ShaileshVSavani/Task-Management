
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <h1
            className="text-2xl font-semibold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Task Manager
          </h1>

          {/* Hamburger Icon (for mobile) */}
          <div className="lg:hidden">
            <button
              className="text-white focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Menu for larger screens */}
          <div className="hidden lg:flex space-x-8 items-center">
            <ul className="flex space-x-6">
            
              {/* Role-Specific Links */}
              {user?.role === "admin" && (
                <li>
                  <button
                    className="hover:text-indigo-300 transition duration-200"
                    onClick={() => navigate("/admin")}
                  >
                    Admin
                  </button>
                </li>
              )}

              {user?.role === "user" && (
                <li>
                  <button
                    className="hover:text-indigo-300 transition duration-200"
                    onClick={() => navigate("/user")}
                  >
                    User
                  </button>
                </li>
              )}

              {/* Authentication Links */}
              {user ? (
                <li>
                  <button
                    className="hover:text-indigo-300 transition duration-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <button
                      className="hover:text-indigo-300 transition duration-200"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </button>
                  </li>
                  <li>
                    <button
                      className="hover:text-indigo-300 transition duration-200"
                      onClick={() => navigate("/register")}
                    >
                      Register
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="space-y-4 py-4 px-6">
          <ul className="space-y-2">
          
            {/* Role-Specific Links */}
            {user?.role === "admin" && (
              <li>
                <button
                  className="w-full text-left hover:text-indigo-300 transition duration-200"
                  onClick={() => navigate("/admin")}
                >
                  Admin
                </button>
              </li>
            )}

            {user?.role === "user" && (
              <li>
                <button
                  className="w-full text-left hover:text-indigo-300 transition duration-200"
                  onClick={() => navigate("/user")}
                >
                  User
                </button>
              </li>
            )}

            {/* Authentication Links */}
            {user ? (
              <li>
                <button
                  className="w-full text-left hover:text-indigo-300 transition duration-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <button
                    className="w-full text-left hover:text-indigo-300 transition duration-200"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left hover:text-indigo-300 transition duration-200"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
