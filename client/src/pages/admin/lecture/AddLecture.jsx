import {
    useCreateLectureMutation,
    useGetCourseLectureQuery,
  } from "@/features/api/courseApi";
  import React, { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import { toast } from "sonner";
  import Lecture from "./Lecture";
  import { Loader2 } from "lucide-react";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  
  const AddLecture = () => {
    const [lectureTitle, setLectureTitle] = useState("");
    const params = useParams();
    const courseId = params.courseId;
    const navigate = useNavigate();
  
    const [createLecture, { data, isLoading, isSuccess, error }] =
      useCreateLectureMutation();
  
    const {
      data: lectureData,
      isLoading: lectureLoading,
      isError: lectureError,
      refetch,
    } = useGetCourseLectureQuery(courseId);
  
    const createLectureHandler = async () => {
      createLecture({ lectureTitle, courseId });
    };
  
    useEffect(() => {
      if (isSuccess) {
        refetch();
        toast.success(data.message);
      }
      if (error) {
        toast.error(error.data.message);
      }
    }, [isSuccess, error]);
  
    return (
      <div className="flex-1 mx-10 bg-[#D6BD98] p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <h1 className="font-bold text-3xl text-[#1A3636]">
            Let's add lectures, add some basic details for your new lecture
          </h1>
          <p className="text-md text-[#40534C]">
            Add essential information about your new lecture below. It's quick and easy!
          </p>
        </div>
        <div className="space-y-6">
          <div>
            <Label className="text-[#1A3636]">Title</Label>
            <Input
              type="text"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              placeholder="Enter the title of the lecture"
              className="w-full mt-2 p-3 border border-[#677D6A] rounded-lg bg-white"
            />
          </div>
          <div className="flex items-center gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => navigate(`/admin/course/${courseId}`)}
              className="px-6 py-3 border border-[#40534C] text-[#1A3636] hover:bg-[#677D6A] transition"
            >
              Back to Course
            </Button>
            <Button
              disabled={isLoading}
              onClick={createLectureHandler}
              className={`px-6 py-3 bg-[#677D6A] text-white ${
                isLoading ? "cursor-not-allowed" : "hover:bg-[#40534C]"
              } transition`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Please wait
                </>
              ) : (
                "Create Lecture"
              )}
            </Button>
          </div>
          <div className="mt-10 space-y-6">
            {lectureLoading ? (
              <p className="text-[#40534C]">Loading lectures...</p>
            ) : lectureError ? (
              <p className="text-red-500">Failed to load lectures.</p>
            ) : lectureData.lectures.length === 0 ? (
              <p className="text-[#40534C]">No lectures available.</p>
            ) : (
              lectureData.lectures.map((lecture, index) => (
                <Lecture
                  key={lecture._id}
                  lecture={lecture}
                  courseId={courseId}
                  index={index}
                />
              ))
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default AddLecture;
  