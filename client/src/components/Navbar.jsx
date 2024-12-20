import { useLogoutUserMutation } from "@/features/api/authApi";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaUserCircle } from "react-icons/fa";
import Divider from "./Divider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess, navigate, data]);

  return (
    <>
      <nav className="bg-gradient-to-r from-[#1A3636] to-[#40534C] dark:from-gray-800 dark:to-gray-900 p-4 text-white">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Logo and Name */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="text-2xl font-bold">E-Learn</div>
          </div>

          {/* User Options */}
          <div className="flex items-center gap-6">
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage
                        src={user?.photoUrl || "https://github.com/shadcn.png"}
                        alt="@shadcn"
                      />

                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link to="my-learning">My learning</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="profile">Edit Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logoutHandler}>
                      Logout
                    </DropdownMenuItem>
                    </DropdownMenuGroup>
                    {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="bg-[#D6BD98] text-gray-900 font-bold hover:bg-[#d6b27b]"><Link to="/admin/dashboard">Dashboard</Link></DropdownMenuItem>
                  </>
                )}
                  </DropdownMenuContent>
                </DropdownMenu>

                <button
                  onClick={logoutHandler}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
      <Divider />
    </>
  );
};

export default Navbar;
