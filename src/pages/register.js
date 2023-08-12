import React, { useState } from "react";
import google from "../assets/icons/Component 2.png";
import facebook from "../assets/icons/Component 3.png";
import Image from "next/image";
import Link from "next/link";
import { poppins } from "@/font";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/router'
const register = () => {
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState();
  const [error,setError] = useState()
  const [user, setUser] = useState({
    name: null,
    email: null,
    phone: null,
  });
  const router = useRouter()
  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        }
      );
    }
  };

  const onSignup = (event) => {
    event.preventDefault();
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+91" + user.phone;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log("signinwithphonenumber err.",error);
      });
  };

  const onOTPVerify = (event) => {
    event.preventDefault();
    console.log("onOTPVerify called.")
    window.confirmationResult
      .confirm(otp)
      .then(async () => {
        try {
          console.log("Register called.")
          const response = await axios.post(
            "http://localhost:5000/api/auth/register",
            {
              name: user.name,
              email: user.email,
              phone: user.phone,
            }
          );
          if(response.status === 201){
            router.push("/login")
          }else{
            setError("Wrong OTP.")
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleNameChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      name: event.target.value,
    }));
  };

  const handlePhoneChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      phone: event.target.value,
    }));
  };

  const handleEmailChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      email: event.target.value,
    }));
  };
  return (
    <div className={poppins.className}>
      <div className="flex justify-center items-center pt-12">
        <div className="font-normal text-center ">
          <p className="text-[26px] ">
            Downpour Consultancy Services Assignment
          </p>
          <p className="text-[26px] mt-5">Register Yourself</p>
        </div>
      </div>
      <div className=" max-w-[400px] mx-auto">
      <div id="recaptcha-container"></div>
        {!showOTP ? (
          <form className="mx-8 lg:mx-0 tracking-[1.7px] mt-3">
            <div>
              <p className="text-[#7D7D7D] font-normal text-[13px] ms-3 lg:hidden">
                Name
              </p>
              <input
                type="text"
                className="outline-none h-[43px] px-3 bg-[#E9E9E9] w-full rounded-[9px] mt-1 lg:text-[18px] lg:text-black lg:h-[50px] lg:ps-6 lg:mt-3 placeholder-black"
                placeholder="Jyotirmoy Mondal"
                onChange={handleNameChange}
              />
            </div>
            <div>
              <p className="text-[#7D7D7D] font-normal text-[13px] ms-3 lg:hidden">
                Phone
              </p>
              <input
                type="number"
                className="outline-none h-[43px] px-3 bg-[#E9E9E9] w-full rounded-[9px] mt-1 lg:text-[18px] lg:text-black lg:h-[50px] lg:ps-6 lg:mt-3 placeholder-black"
                placeholder="+91 86531 38715"
                onChange={handlePhoneChange}
              />
            </div>
            <div>
              <p className="text-[#7D7D7D] font-normal text-[13px] ms-3 lg:hidden">
                Email
              </p>
              <input
                type="email"
                className="outline-none h-[43px] px-3 bg-[#E9E9E9] w-full rounded-[9px] mt-1 lg:text-[18px] lg:text-black lg:h-[50px] lg:ps-6 lg:mt-3 placeholder-black"
                placeholder="example@gmail.com"
                onChange={handleEmailChange}
              />
            </div>
            <div className="flex justify-center items-center my-5">
              <button
                className="text-[20px] h-[45px] text-[#FFFFFF] bg-[#444242] lg:bg-[#303030] px-5 rounded-[7px]"
                onClick={(event)=>onSignup(event)}
              >
                Verify and Register
              </button>
            </div>
            <div>
              <p className="text-[#858585] text-[15px] font-normal lg:text-center mt-2 lg:text-[14px] lg:text-black">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#303030] lg:text-black font-bold"
                >
                  Login
                </Link>
              </p>
            </div>
            <div className="lg:max-w-screen-sm mx-auto lg:mx-20">
              <div className="flex justify-center items-center gap-2 mt-2">
                <hr className="w-full h-[1px] lg:h-[2px] bg-black lg:bg-[#263238]" />
                <p className="text-[12px]">OR</p>
                <hr className="w-full h-[1px] lg:h-[2px] bg-black lg:bg-[#263238]" />
              </div>
            </div>
          </form>
        ) : (
          <form className="mx-8 lg:mx-0 tracking-[1.7px] mt-3">
            <div className="flex justify-center items-center flex-col">
              <p className="text-[#7D7D7D] font-normal text-[13px] ms-3 lg:hidden">
                OTP
              </p>
              <input
                type="number"
                className="flex justify-center outline-none h-[43px] px-3 bg-[#E9E9E9] rounded-[9px] mt-1 lg:text-[18px] lg:text-black lg:h-[50px] lg:ps-6 lg:mt-3 placeholder-black"
                placeholder="XXXXXX"
                value={otp}
                onChange={(event)=>setOtp(event.target.value)}
              />
            </div>
            <div className="flex justify-center items-center my-5">
              <button
                className="text-[20px] h-[45px] text-[#FFFFFF] bg-[#444242] lg:bg-[#303030] px-5 rounded-[7px]"
                onClick={(event)=>onOTPVerify(event)}
              >
                Verify OTP
              </button>
            </div>
            <div>
              <p className="text-[#858585] text-[15px] font-normal lg:text-center mt-2 lg:text-[14px] lg:text-black">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#303030] lg:text-black font-bold"
                >
                  Login
                </Link>
              </p>
            </div>
            <div className="lg:max-w-screen-sm mx-auto lg:mx-20">
              <div className="flex justify-center items-center gap-2 mt-2">
                <hr className="w-full h-[1px] lg:h-[2px] bg-black lg:bg-[#263238]" />
                <p className="text-[12px]">OR</p>
                <hr className="w-full h-[1px] lg:h-[2px] bg-black lg:bg-[#263238]" />
              </div>
            </div>
          </form>
        )}

        <div>
          <p className="text-center text-[#222222] text-[14px] font-normal lg:text-[16px]">
            Continue With
          </p>
          <div className="flex justify-center items-center gap-3  mb-16 mt-2">
            <button className="w-[43px] h-[43px] lg:w-[45px] lg:h-[45px] rounded-[12px] bg-[#1B1919] flex justify-center items-center p-2">
              <Image src={google} alt="google" />
            </button>
            <button className="w-[43px] h-[43px] lg:w-[45px] lg:h-[45px] rounded-[12px] bg-[#1B1919] flex justify-center items-center p-2">
              <Image
                src={facebook}
                alt="facebook"
                className="w-[20px] h-[30px]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default register;
