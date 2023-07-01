import { useState, useContext, useEffect } from "react";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { Hands, Girl, Coding } from "@/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context";
import { useButtonStyle } from "@/hooks";
import { AnimateInOut, Button } from "@/components";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { inputStyles } from "@/constants";

export default function Login() {
  // const buttonStyles = useButtonStyle({ color: "primary", full: true });

  const navigate = useNavigate();
  const location = useLocation();

  const source = location.state?.source;

  const { error, googleAuth, loading, loginWithEmailAndPassword, user } =
    useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Raale. || Login";
  }, []);

  useEffect(() => {
    if (!user) return;

    setEmail("");
    setPassword("");

    navigate(source || "/app/hotels", { state: location.state });
  }, [user, error, source, navigate]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const loggedInUser = await loginWithEmailAndPassword({ email, password });
    if (!user) return;
    navigate(source || "/app/hotels", { state: location.state });
  };

  const handleGoogleLogin = async () => {
    const user = await googleAuth();
    console.log("USER_FROM_GOOGLE_LOGIN: ", user);
    if (!user) return;

    navigate("/app/hotels", { state: location.state });
  };

  const handleLinkToSignup = () => {
    navigate("../signup", { state: location.state });
  };

  return (
    <div className="bg-primary h-screen flex flex-col justify-center items-center">
      <p className="text-white">
        Don't have an account?{" "}
        <span
          onClick={handleLinkToSignup}
          className="cursor-pointer underline underline-offset-4 font-semibold"
        >
          Sign Up
        </span>
      </p>
      <div className="bg-body h-[80%] mx-auto w-[80vw] rounded-lg overflow-clip flex items-center justify-center">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 w-1/2 h-full hidden md:inline-block"
        >
          <img src={Hands} className="w-full h-full" />
        </motion.div>
        <motion.form
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="flex sm:w-1/2 flex-col justify-center space-y-2 p-4 w-full"
        >
          <h2 className="mx-auto font-bold">Login</h2>
          <div className="relative flex flex-col items-center w-full">
            <small
              className={`self-start ${
                email.length > 0 ? "inline" : "hidden"
              } transition-all duration-200 text-primary`}
            >
              email
            </small>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                (prev: any) => {
                  return { ...prev, email: "" };
                };
              }}
              name="email"
              type="email"
              placeholder="email"
              className={`${inputStyles}`}
            />
          </div>
          <div>
            <div className="relative flex flex-col items-center w-full">
              <small
                className={`self-start ${
                  password.length > 0 ? "inline-block" : "hidden"
                } transition-all duration-200 text-primary`}
              >
                password
              </small>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  (prev: any) => {
                    return { ...prev, password: "" };
                  };
                }}
                name="password"
                type={`${showPassword ? "text" : "password"}`}
                placeholder="password"
                className={inputStyles}
              />
              <span
                className="cursor-pointer text-gray-500 text-xl absolute bottom-1 right-1 h-8 rounded-r-md bg-body p-2 flex items-center justify-center"
                onClick={() => setShowPassword((prev: any) => !prev)}
              >
                {showPassword ? (
                  <ShowPassword showPassword={showPassword} />
                ) : (
                  <NotShowPassword showPassword={!showPassword} />
                )}
              </span>
            </div>
          </div>
          <div className="mx-auto w-[80%] rounded-full overflow-clip h-12 active:scale-95 transition-all duration-150 ease-in-out wobble">
            <Button
              disabled={loading || email.length < 1 || password.length < 1}
              loading={loading}
              full={true}
            >
              login
            </Button>
          </div>

          <p className="w-fit mx-auto">OR</p>

          <div
            className="w-fit mx-auto px-3 py-2 cursor-pointer bg-blue-400 rounded-md flex items-center gap-3 text-white active:scale-95 hover:opacity-80 transition-all duration-200"
            onClick={() => handleGoogleLogin()}
          >
            <span className="text-white">
              <FaGoogle />
            </span>
            <p>Sign in with google</p>
          </div>
        </motion.form>
      </div>
    </div>
  );
}

function ShowPassword({ showPassword }: { showPassword: boolean }) {
  return (
    <AnimateInOut
      init={{ y: -5 }}
      animate={{ y: 0 }}
      out={{ y: -5 }}
      // show={showPassword && "happy"}
      show={showPassword}
    >
      <IoMdEyeOff />
    </AnimateInOut>
  );
}

function NotShowPassword({ showPassword }: { showPassword: boolean }) {
  return (
    <AnimateInOut
      init={{ y: -5 }}
      animate={{ y: 0 }}
      out={{ y: -5 }}
      // show={showPassword && "happy"}
      show={showPassword}
    >
      <IoMdEye />
    </AnimateInOut>
  );
}
