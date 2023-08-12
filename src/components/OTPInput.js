import React, { useState, useEffect, useRef } from "react";

const OTPInput = ({ otpRef }) => {
  const [showResend, setShowResend] = useState(true);
  const [countdown, setCountdown] = useState(56);
  const otpInputRefs = useRef([]);

  useEffect(() => {
    otpInputRefs.current = otpInputRefs.current.slice(0, 6);
  }, []);

  const handleInputChange = (event, index) => {
    const { value } = event.target;

    if (otpInputRefs.current[index]) {
      otpInputRefs.current[index].value = value;
    }

    if (value && index < 5 && otpInputRefs.current[index + 1]) {
      otpInputRefs.current[index + 1].focus();
    }

    const otpArray = otpInputRefs.current.map((inputRef) => inputRef.value);
    const otpString = otpArray.join("");
    otpRef.current = otpString;
  };

  const handleResendClick = () => {
    setShowResend(false);
    setCountdown(56);
  };

  useEffect(() => {
    let interval;

    if (!showResend && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [showResend, countdown]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="lg:w-full">
      <div className="flex gap-1 md:gap-3 lg:gap-5 justify-center items-center lg:w-full">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <input
            key={index}
            type="text"
            id={`otpInput${index}`}
            maxLength={1}
            className="otp-box  bg-[#D9D9D9] w-16 h-16 lg:w-[80px] lg:h-[80px] text-[24px] font-normal rounded-lg p-4 text-center "
            ref={(inputRef) => (otpInputRefs.current[index] = inputRef)}
            onChange={(event) => handleInputChange(event, index)}
          />
        ))}
      </div>
      {/* Rest of the code for resend functionality */}
    </div>
  );
};

export default OTPInput;
