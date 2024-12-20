import {
    useEditCourseMutation,
    useGetCourseByIdQuery,
    usePublishCourseMutation,
  } from "@/features/api/courseApi";
  import React, { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import { toast } from "sonner";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Label } from "@/components/ui/label";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Loader2 } from "lucide-react";
  import RichTextEditor from "@/components/RichTextEditor";
  
  const CourseTab = () => {
    const [input, setInput] = useState({
      courseTitle: "",
      category: "",
      description: "",
      subTitle: "",
      coursePrice: "",
      courseLevel: "",
      courseThumbnail: "",
    });
    const params = useParams();
    const navigate = useNavigate();
    const courseId = params.courseId;
    const { data: courseData, isLoading: courseLoading, refetch } =
      useGetCourseByIdQuery(courseId);
    const [publishCourse] = usePublishCourseMutation();
  
    useEffect(() => {
      if (courseData?.course) {
        const course = courseData?.course;
        setInput({
          courseTitle: course.courseTitle,
          subTitle: course.subTitle,
          description: course.description,
          category: course.category,
          courseLevel: course.courseLevel,
          coursePrice: course.coursePrice,
          courseThumbnail: "",
        });
      }
    }, [courseData]);
  
    const [viewThumbnail, setViewThumbnail] = useState("");
    const [editCourse, { data, isLoading, isSuccess, error }] =
      useEditCourseMutation();
  
    const onChangeHandler = (e) => {
      const { name, value } = e.target;
      setInput({ ...input, [name]: value });
    };
  
    const selectCategory = (value) => {
      setInput({ ...input, category: value });
    };
    const selectCourseLevel = (value) => {
      setInput({ ...input, courseLevel: value });
    };
  
    const selectThumbnail = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        setInput({ ...input, courseThumbnail: file });
        const fileReader = new FileReader();
        fileReader.onloadend = () => setViewThumbnail(fileReader.result);
        fileReader.readAsDataURL(file);
      }
    };
  
    const updateCourseHandler = async () => {
      const formData = new FormData();
      formData.append("courseTitle", input.courseTitle);
      formData.append("subTitle", input.subTitle);
      formData.append("description", input.description);
      formData.append("category", input.category);
      formData.append("courseLevel", input.courseLevel);
      formData.append("coursePrice", input.coursePrice);
      formData.append("courseThumbnail", input.courseThumbnail);
  
      await editCourse({ formData, courseId });
    };
    const publishStatusHandler = async (action) => {
      try {
        const response = await publishCourse({ courseId, query: action });
        if (response.data) {
          refetch();
          toast.success(response.data.message);
        }
      } catch (error) {
        toast.error("Failed to publish or unpublish course");
      }
    };
  
    useEffect(() => {
      if (isSuccess) {
        toast.success(data.message || "Course updated.");
      }
      if (error) {
        toast.error(error.data.message || "Failed to update course");
      }
    }, [isSuccess, error]);
  
    if (courseLoading)
      return <h1 className="text-center text-primary">Loading...</h1>;
  
    return (
      <Card className="shadow-xl rounded-lg p-6 bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-col md:flex-row justify-between">
          <div>
            <CardTitle className="text-2xl text-primary font-bold">
              Basic Course Information
            </CardTitle>
            <CardDescription className="text-gray-500">
              Update your course details here and click save.
            </CardDescription>
          </div>
          <div className="space-x-2">
            <Button
              className="bg-primary hover:bg-primary/90 text-white"
              disabled={courseData?.course.lectures.length === 0}
              onClick={() =>
                publishStatusHandler(
                  courseData?.course.isPublished ? "false" : "true"
                )
              }
            >
              {courseData?.course.isPublished ? "Unpublish" : "Publish"}
            </Button>
            <Button variant="destructive" className="hover:bg-red-600">
              Remove Course
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="courseTitle"
                value={input.courseTitle}
                onChange={onChangeHandler}
                placeholder="Ex. Fullstack Developer"
                className="rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input
                type="text"
                name="subTitle"
                value={input.subTitle}
                onChange={onChangeHandler}
                placeholder="Ex. Zero to Hero in 2 months"
              />
            </div>
            <div>
              <Label>Description</Label>
              <RichTextEditor input={input} setInput={setInput} />
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="w-full md:w-1/3">
                <Label>Category</Label>
                <Select defaultValue={input.category} onValueChange={selectCategory}>
                  <SelectTrigger className="w-full rounded-md">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      <SelectItem value="Next JS">Next JS</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Python">Python</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-1/3">
                <Label>Course Level</Label>
                <Select defaultValue={input.courseLevel} onValueChange={selectCourseLevel}>
                  <SelectTrigger className="w-full rounded-md">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-1/3">
                <Label>Price (INR)</Label>
                <Input
                  type="number"
                  name="coursePrice"
                  value={input.coursePrice}
                  onChange={onChangeHandler}
                  placeholder="199"
                  className="rounded-md"
                />
              </div>
            </div>
            <div>
              <Label>Course Thumbnail</Label>
              <Input type="file" onChange={selectThumbnail} accept="image/*" />
              {viewThumbnail && (
                <img
                  src={viewThumbnail}
                  alt="Thumbnail"
                  className="w-48 rounded-lg mt-2 shadow"
                />
              )}
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => navigate("/admin/course")}>
                Cancel
              </Button>
              <Button
                onClick={updateCourseHandler}
                className="bg-primary text-white hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  export default CourseTab;
  