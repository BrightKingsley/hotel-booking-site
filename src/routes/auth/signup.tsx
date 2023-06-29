import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context";
import { useButtonStyle } from "@/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { Hands, Girl, Coding } from "@/assets";
import { AnimateInOut, Button } from "@/components";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { motion } from "framer-motion";

export default function Signup() {
  const inputStyles = `focus:outline-primary p-2 rounded-md w-full bg-primary/10 focus:bg-white transition-all duration-200 `;

  const navigate = useNavigate();
  const location = useLocation();

  const source = location.state?.source;

  const { error, googleAuth, loading, signUpWithEmailAndPassword, user } =
    useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Raale. || Login";
  }, []);

  useEffect(() => {
    if (user) {
      setEmail("");
      setPassword("");

      // navigate(source || "/listings", { state: location.state });
    } else {
      // console.log(error);
      return;
    }
  }, [user, error, source, navigate]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    signUpWithEmailAndPassword({ email, firstname, lastname, password });
  };

  const handleLinkToSignup = () => {
    navigate("../login", { state: location.state });
  };
  return (
    <div className="bg-primary h-screen flex flex-col justify-center items-center text-gray-600">
      <p className="text-white">
        Already have an account?{" "}
        <span
          onClick={handleLinkToSignup}
          className="cursor-pointer underline underline-offset-4 font-semibold"
        >
          Login
        </span>
      </p>
      <div className="bg-body h-[80%] mx-auto w-[80vw] rounded-lg overflow-clip flex items-center justify-center">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 w-1/2 h-full hidden md:inline-block"
        >
          <img src={Hands} className="w-full h-full" />
        </motion.div>
        <motion.form
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="flex w-1/2 flex-col justify-center space-y-2 p-4"
        >
          <h2 className="mx-auto font-bold ">Sign Up</h2>
          <div className="relative flex flex-col items-center w-full">
            <small
              className={`self-start ${
                firstname.length > 0 ? "inline" : "hidden"
              } transition-all duration-200 text-primary`}
            >
              firstname
            </small>
            <input
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
                (prev: any) => {
                  return { ...prev, firstname: "" };
                };
              }}
              name="firstname"
              type="text"
              placeholder="firstname"
              className={`${inputStyles}`}
            />
          </div>
          <div className="relative flex flex-col items-center w-full">
            <small
              className={`self-start ${
                lastname.length > 0 ? "inline" : "hidden"
              } transition-all duration-200 text-primary`}
            >
              lastname
            </small>
            <input
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
                (prev: any) => {
                  return { ...prev, lastname: "" };
                };
              }}
              name="lastname"
              type="text"
              placeholder="lastname"
              className={`${inputStyles}`}
            />
          </div>

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
              disabled={
                loading ||
                firstname.length < 1 ||
                lastname.length < 1 ||
                email.length < 1 ||
                password.length < 1
              }
              loading={loading}
              full={true}
            >
              sign up
            </Button>
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
