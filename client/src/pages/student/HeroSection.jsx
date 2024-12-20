import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  FaBook,
  FaLaptopCode,
  FaChalkboardTeacher,
  FaAward,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };
  return (
    <div className="relative bg-gradient-to-r from-[#1A3636] to-[#40534C] dark:from-gray-800 dark:to-gray-900 py-16 px-6 md:px-12 text-center text-white -mt-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Unlock Your Potential with Expert-Led Courses
        </h1>
        <p className="text-sm md:text-sm mb-8 mt-4">
          Explore a world of learning with a variety of courses designed to
          enhance your skills, knowledge, and career opportunities. Join a
          community of learners today!
        </p>
        <div className="flex justify-center gap-12 mb-12 mt-24">
          <div className="flex flex-col items-center justify-center p-4 rounded-md bg-[#677D6A] w-[150px] transition transform hover:bg-[#829981] hover:scale-105">
            <FaBook className="text-4xl mb-2" />
            <p>Comprehensive Resources</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-md bg-[#677D6A] w-[150px] transition transform hover:bg-[#829981] hover:scale-105">
            <FaLaptopCode className="text-4xl mb-2" />
            <p>Practical Projects</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-md bg-[#677D6A] w-[150px] transition transform hover:bg-[#829981] hover:scale-105">
            <FaChalkboardTeacher className="text-4xl mb-2" />
            <p>Expert Instructors</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-md bg-[#677D6A] w-[150px] transition transform hover:bg-[#829981] hover:scale-105">
            <FaAward className="text-4xl mb-2" />
            <p>Certification</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-md bg-[#677D6A] w-[150px] transition transform hover:bg-[#829981] hover:scale-105">
            <FaUsers className="text-4xl mb-2" />
            <p>Global Community</p>
          </div>
        </div>
        {/* <button className="bg-[#D6BD98] hover:bg-[#ac987a] text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 mt-8">
          Get Started Now
        </button> */}
        <form
          onSubmit={searchHandler}
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6 mt-12"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Courses"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <Button
            type="submit"
            className="hover:bg-[#40534C] dark:bg-blue-700 text-white px-6 py-3 rounded-r-full bg-[#1A3636] dark:hover:bg-blue-800"
          >
            Search
          </Button>
        </form>
        <Button
          onClick={() => navigate(`/course/search?query`)}
          className="bg-white dark:bg-gray-800 text-[#D6BD98] rounded-full hover:bg-[#D6BD98] hover:text-white"
        >
          Explore Courses
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
