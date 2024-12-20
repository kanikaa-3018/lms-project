import { useCreateCourseMutation } from "@/features/api/courseApi";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();

  const getSelectedCategory = (value) => setCategory(value);

  const createCourseHandler = async () => createCourse({ courseTitle, category });

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created.");
      navigate("/admin/course");
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-10 bg-white text-[#1A3636]">
      <div className="mb-6">
        <h1 className="font-bold text-2xl text-[#40534C]">Add a New Course</h1>
        <p className="text-sm text-[#677D6A]">
          Provide the details for your new course below.
        </p>
      </div>
      <div className="space-y-6">
        <div>
          <Label className="text-[#40534C]">Course Title</Label>
          <Input
            className="bg-[#F9FAFB] border border-[#677D6A] text-[#1A3636] focus:outline-none focus:ring-2 focus:ring-[#D6BD98]"
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Enter course title"
          />
        </div>
        <div>
          <Label className="text-[#40534C]">Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-full bg-[#F9FAFB] border border-[#677D6A] focus:ring-[#D6BD98]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-white text-[#1A3636]">
              <SelectGroup>
                <SelectLabel>Available Categories</SelectLabel>
                <SelectItem value="Next JS">Next JS</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Frontend Development">
                  Frontend Development
                </SelectItem>
                <SelectItem value="Fullstack Development">
                  Fullstack Development
                </SelectItem>
                <SelectItem value="MERN Stack Development">
                  MERN Stack Development
                </SelectItem>
                <SelectItem value="Javascript">Javascript</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Docker">Docker</SelectItem>
                <SelectItem value="MongoDB">MongoDB</SelectItem>
                <SelectItem value="HTML">HTML</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="text-[#1A3636] border border-[#677D6A] hover:bg-[#D6BD98] hover:text-black"
            onClick={() => navigate("/admin/course")}
          >
            Back
          </Button>
          <Button
            disabled={isLoading}
            className="bg-[#D6BD98] text-black hover:bg-[#677D6A] hover:text-white"
            onClick={createCourseHandler}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
