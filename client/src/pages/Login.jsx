import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [signUpInput, setSignUpInput] = useState({
    name: "",
    email: "",
    password: "",
    role:"",
  });
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e, type) => {
    const { name, value } = e.target;
    if (type == "register") {
      setSignUpInput({ ...signUpInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerLoading,
      isSuccess: registerSuccess,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginLoading,
      isSuccess: loginSuccess,
    },
  ] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleRegistration = async (type) => {
    const inputData = type === "register" ? signUpInput : loginInput;
    const action = type === "register" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
    }
    if (loginSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");
      navigate("/");
    }
    if (registerError) {
      toast.error(registerError.data.message || "Signup failed.");
    }
    if (loginError) {
      toast.error(loginError.data.message || "Login failed.");
    }
  }, [
    loginLoading,
    registerLoading,
    loginData,
    registerData,
    loginError,
    registerError,
  ]);

  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your login details, then click on Login
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                defaultValue="xyz@gmail.com"
                name="email"
                onChange={(e) => onChangeHandler(e, "login")}
                value={loginInput.email}
                required="true"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                defaultValue="123jhhg"
                name="password"
                onChange={(e) => onChangeHandler(e, "login")}
                value={loginInput.password}
                required="true"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              disabled={loginLoading}
              onClick={() => handleRegistration("login")}
            >
              {loginLoading?(
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                wait
              </>
              ):(
                "Login"
              )
              }
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register </CardTitle>
            <CardDescription>
              Enter your registration details, then click Register.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue="Pedro Duarte"
                onChange={(e) => onChangeHandler(e, "register")}
                value={signUpInput.name}
                required="true"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                defaultValue="xy@gmail.com"
                onChange={(e) => onChangeHandler(e, "register")}
                value={signUpInput.email}
                required="true"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                defaultValue="kjfh6588"
                onChange={(e) => onChangeHandler(e, "register")}
                value={signUpInput.password}
                required="true"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Role</Label>
              <Input
                id="role"
                name="role"
                defaultValue="[Student, Instructor]"
                onChange={(e) => onChangeHandler(e, "register")}
                value={signUpInput.role}
                required="true"
              />
            </div>
          </CardContent>
          <CardFooter>
          <Button
              disabled={registerLoading}
              onClick={() => handleRegistration("register")}
            >
              {registerLoading?(
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                wait
              </>
              ):(
                "Register"
              )
              }
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default Login;
