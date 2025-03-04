import React from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const SettingsPage = () => {
  return (
    <div
      className="bg-white min-h-[90vh]  rounded-xl p-10 "
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <Link to={`change-password`}>
        <div className="flex items-center justify-between me-20 border-b-2 border-[#9D9FA2]  max-w-[1000px] min-w-36 p-3 cursor-pointer">
          <h1 className="text-2xl hover:text-secondary-color">
            Change Password
          </h1>

          <div>
            <IoChevronForwardOutline className="text-3xl cursor-pointer  font-semibold" />
          </div>
        </div>
      </Link>

      <Link to={`privacy-policy`}>
        <div className="flex items-center justify-between me-20 border-b-2 border-[#9D9FA2]  max-w-[1000px] min-w-36 p-3 cursor-pointer">
          <h1 className="text-2xl hover:text-secondary-color">
            Privacy Policy
          </h1>
          <div>
            <IoChevronForwardOutline className="text-3xl cursor-pointer  font-semibold" />
          </div>
        </div>
      </Link>
      <Link to={`terms-and-condition`}>
        <div className="flex items-center justify-between me-20 border-b-2 border-[#9D9FA2]  max-w-[1000px] min-w-36 p-3 cursor-pointer">
          <h1 className="text-2xl hover:text-secondary-color">
            Terms & Conditions
          </h1>
          <div>
            <IoChevronForwardOutline className="text-3xl cursor-pointer  font-semibold" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SettingsPage;
