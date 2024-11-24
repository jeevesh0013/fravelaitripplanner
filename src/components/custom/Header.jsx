import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <header
      style={{
        background: "linear-gradient(90deg, #8290ff, #ec9eff, #fc7a7a)",
        backgroundSize: "200% 200%",
        animation: "gradientMove 8s ease infinite",
      }}
      className="flex flex-col sm:flex-row justify-between items-center px-8 py-4 shadow-sm w-full"
    >
      {/* Keyframes for the gradient animation */}
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <div className="flex items-center justify-between w-full sm:w-auto">
        <div className="flex items-center space-x-4">
          <img src="/logo.svg" alt="Travel" className="w-20 h-auto sm:w-24" />
          <span className="text-2xl sm:text-3xl font-bold text-gray-900">
            FRAVEL
          </span>
        </div>
        {/* Hamburger menu for smaller screens */}
        <button
          className="sm:hidden block bg-blue-2 text-gray-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      <div
        className={`flex-col sm:flex-row items-center space-y-4 sm:space-y-0 space-x-0 sm:space-x-4 mt-4 sm:mt-0 ${
          isMenuOpen ? "flex" : "hidden"
        } sm:flex`}
      >
        {/* Show "Create Trip" button after sign in */}
        <SignedIn>
          <a href="/create-trip">
            <Button
              variant="outline"
              className="rounded-full text-[#004D40] border-gray-900 hover:bg-gray-100"
            >
              + Create Trip
            </Button>
          </a>
        </SignedIn>

        {/* Show "My Trips" button and UserButton only when signed in */}
        <SignedIn>
          <a href="/my-trips">
            <Button
              variant="outline"
              className="rounded-full text-[#004D40] border-gray-900 hover:bg-gray-100"
            >
              My Trips
            </Button>
          </a>

          <UserButton
            showName={false}
            afterSignOutUrl="/"
            className="rounded-full bg-black p-2 shadow-lg hover:shadow-xl"
          />
        </SignedIn>

        {/* Show Sign In button when the user is not signed in */}
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="px-5 py-2 bg-black text-white rounded-md hover:bg-slate-700 transition-colors duration-300 shadow-lg">
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;
