import { Form, Input, Spin, Typography } from "antd";
import profileImage from "/images/profileImage.png";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import { useGetProfileQuery } from "../../redux/api/profileApi";
import { getImageUrl } from "../../redux/getBaseUrl";

const Profile = () => {
  const { data, isLoading } = useGetProfileQuery();
  const myProfile = data?.data?.result;

  if (isLoading) {
     return (
       <div className="flex justify-center items-center">
         <Spin tip="Loading" size="large"></Spin>
       </div>
     );
  }

  const date = myProfile?.dateOfBirth.slice(0,10)


  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className=" w-full flex md:flex-row flex-col items-center  p-5 mb-10  rounded-tl-xl rounded-tr-xl">
        <p className="text-3xl text-black font-semibold w-[95%] mx-auto flex gap-1 items-center">
          Profile Information
        </p>
        <Link
          to={`/admin/edit-profile`}
          className="hover:text-primary-color ml-auto "
        >
          <div className="mt-10 bg-secondary-color px-5 py-3 rounded-lg">
            <div className="flex gap-1">
              <EditOutlined
                className="text-xl font-medium"
                style={{ color: "#FAFAFA" }}
              />
              <p className="text-primary-color whitespace-nowrap text-xl font-medium">
                Edit Profile
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className=" flex justify-center items-center">
        <div className=" rounded-lg h-full w-full md:grid grid-cols-3">
          <div className="flex flex-col items-center justify-between">
            <div className="flex flex-col items-center justify-center gap-5">
              <img
                className="h-36 aspect-square relative rounded-full object-cover object-top bg-base-color"
                src={getImageUrl() + myProfile?.profileImage}
                alt="Profile Image"
              />
              <p className="text-center text-2xl font-medium">Admin</p>
              <p className="text-3xl font-medium">{myProfile?.fullName}</p>
            </div>
          </div>

          <div className="col-span-2 flex flex-col items-center text-white mt-5">
            <Form layout="vertical" className="bg-transparent p-4 w-full">
              <Typography.Title level={5} style={{ color: "#222222" }}>
                FUll Name
              </Typography.Title>
              <Form.Item className="text-white">
                <Input
                  readOnly
                  value={myProfile?.fullName}
                  placeholder="Edit your full name"
                  className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border  hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                />
              </Form.Item>

              <Typography.Title level={5} style={{ color: "#222222" }}>
                Address
              </Typography.Title>
              <Form.Item className="text-white ">
                <Input
                  value={myProfile?.address}
                  readOnly
                  className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border  hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                />
              </Form.Item>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Phone Number
              </Typography.Title>
              <Form.Item className="text-white ">
                <PhoneInput
                  value={myProfile?.phone}
                  className=""
                  enableSearch={true}
                />
              </Form.Item>

              <Typography.Title level={5} style={{ color: "#222222" }}>
                Date Of Birth
              </Typography.Title>
              <Form.Item className="text-white">
                <Input
                  readOnly
                  value={date}
                  placeholder="Enter Date of Birth"
                  className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border  hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
