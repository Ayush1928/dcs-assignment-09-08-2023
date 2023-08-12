import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import OTPInput from "@/components/OTPInput";
import { poppins } from "@/font";
import { useRouter } from "next/router";
const verify = () => {
  const router = useRouter();
  const otpRef = useRef(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (router.query.user) {
      const userObject = JSON.parse(router.query.user);
      setUser(userObject);
    }
  }, [router.query.user]);
  const onOTPVerify = (event) => {
    event.preventDefault();
    const otp = otpRef.current;
    window.confirmationResult
      .confirm(otp)
      .then(() => {
        router.push({
            pathname: '/',
            query: { user: JSON.stringify(user) }
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={poppins.className}>
      <div className="pt-16">
        <div className="font-normal text-center ">
          <p className="text-[26px] ">
            Downpour Consultancy Services Assignment
          </p>
          <p className="text-[26px] mt-5">Verify Yourself</p>
        </div>
        <div className=" max-w-screen-sm mx-auto">
          <p className="text-[20px] mt-5 text-[#747474]">
            Lorem ipsum dolor sit amet consectetur. Placerat in suspendisse
            donec eget elementum bibendum sed. Maecenas lectus.
          </p>

          <div>
            <div className="w-[283px] lg:w-[400px] mx-auto mt-5">
              <OTPInput otpRef={otpRef} />
            </div>
          </div>
          <div className="flex justify-center items-center mt-12 gap-3">
            <button className="text-[20px] font-normal text-[#444242] bg-[#9D9D9D] w-[115px] h-[41px] rounded-[7px] lg:hidden">
              <Link href="/login"> Back</Link>
            </button>
            <button
              className="text-[20px] lg:text-[24px] lg:w-[200px] lg:h-[55px] text-[#FFFFFF] bg-[#444242] lg:bg-[#303030] w-[115px] h-[41px] rounded-[7px]"
              onClick={(event) => onOTPVerify(event)}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default verify;
