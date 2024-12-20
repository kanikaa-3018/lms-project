import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import Course from "./Course";

const Profile = () => {
  // const {data: loggedInUserData}= useLoadUserQuery();

  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, refetch } = useLoadUserQuery();

  const [
    updateUser,
    { data: updateData, isLoading: updateLoading, isError, isSuccess, error },
  ] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
    setIsDialogOpen(false);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(updateData?.message || "Profile updated.");
    }
    if (isError) {
      toast.error(error?.message || "Failed to update profile");
    }
  }, [error, updateData, isSuccess, isError]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Skeleton className="w-40 h-40" />
        <Skeleton className="w-80 h-12 mt-4" />
      </div>
    );

  const user = data && data.user;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#677D6A] to-[#40534C] text-gray-900 -mt-16">
      <div className="container mx-auto py-16 px-6 md:px-12 lg:px-20 text-center">
        <h1 className="text-5xl font-extrabold text-white mb-6">
          Welcome, {user?.name}
        </h1>
        <p className="text-lg text-gray-200 mb-8">
          Manage your profile details here.
        </p>

        <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 md:flex-row md:gap-10">
          <Avatar className="h-32 w-32 md:h-40 md:w-40">
            <AvatarImage
              src={user?.photoUrl || "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold text-gray-800">
              {user?.name}
            </h2>
            <span
              style={{ textTransform: "capitalize" }}
              className="text-xl font-light"
            >
              {user.role}
            </span>
            <p className="text-gray-600 text-sm">{user?.email}</p>
          </div>
        </div>

        <div className="mt-8">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#D6BD98] text-black font-bold py-3 px-6 rounded hover:bg-[#b6915b] focus:outline-none focus:ring focus:ring-blue-400">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white rounded-lg shadow-lg p-8 md:w-96">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-800">
                  Edit Your Profile
                </DialogTitle>
              </DialogHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <Label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={data.user.name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Role
                  </Label>
                  <Input
                    id="role"
                    value={data.user.role}
                    disabled={true}
                    className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="profilePhoto"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Profile Photo
                  </Label>
                  <Input
                    id="profilePhoto"
                    type="file"
                    onChange={onChangeHandler}
                    accept="image/*"
                    className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <DialogFooter className="mt-8">
                <Button
                  onClick={updateUserHandler}
                  disabled={updateLoading}
                  className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-400"
                >
                  {updateLoading ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-3xl text-center ">
          Courses you're enrolled in
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5 text-center">
          {user.enrolledCourses.length === 0 ? (
            <h1 className="text-center">You haven't enrolled yet</h1>
          ) : (
            user.enrolledCourses.map((course) => (
              <Course course={course} key={course._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
