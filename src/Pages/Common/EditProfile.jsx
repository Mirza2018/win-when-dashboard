/* eslint-disable no-unused-vars */
import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Spin,
  Typography,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { MdOutlineEdit } from "react-icons/md";
import { IoCameraOutline, IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import {
  useGetProfileQuery,
  useProfileUpdsateMutation,
} from "../../redux/api/profileApi";
import { toast } from "sonner";
import { getImageUrl } from "../../redux/getBaseUrl";

const EditProfile = () => {
  const { data, isLoading } = useGetProfileQuery();
  const myProfile = data?.data;
  const newDate = new Date(myProfile?.dateOfBirth);

  console.log(newDate, "kdjfuihuy");

  const [updateProfile] = useProfileUpdsateMutation();
  const navigate = useNavigate();
  // const profileData = {
  //   firstName: "James",
  //   LastName: "Mitchell",
  //   address: "emily@gmail.com",
  //   contactNumber: "+880171139055",
  //   dob: "10-10-1998",
  // };

  const [imageUrl, setImageUrl] = useState(
    getImageUrl() + myProfile?.profileImage
  );
console.log(getImageUrl() + myProfile?.profileImage);
  useEffect(() => {
    setImageUrl(getImageUrl() + myProfile?.profileImage);
  }, [myProfile]);




  console.log(data);

  
  const handleImageUpload = (info) => {
    if (info.file.status === "removed") {
      setImageUrl(getImageUrl() + myProfile?.profileImage); // Reset to null or fallback image
    } else {
      const file = info.file.originFileObj || info.file; // Handle the file object safely
      if (file) {
        setImageUrl(URL.createObjectURL(file)); // Set the preview URL of the selected image
      } else {
        console.error("No file selected or file object missing");
      }
    }
  };

  const onFinish = async (values) => {
    const toastId = toast.loading("Profile Updateing...");
    const formData = new FormData();

    const formattedDate = values?.dob?.format("YYYY-MM-DD");
    const image = values.image?.fileList[0]?.originFileObj;
    if (values.image) {
      formData.append("image", image, image?.name);
    }

    const jsonData = {
      fullName: values?.fullName,
      // about: "I am a tester",
      address: values?.address,
      phone: values?.contactNumber,
      dateOfBirth: formattedDate,
    };
    formData.append("data", JSON.stringify(jsonData));

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const res = await updateProfile(formData).unwrap();
      console.log("I am from profile update", res);
      toast.success(res?.message || "profile updated successfully", {
        id: toastId,
        duration: 2000,
      });
      navigate("/admin/profile");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "error", {
        id: toastId,
        duration: 2000,
      });
    }

    // formData.append("image", imageFile.originFileObj, imageFile.name);
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spin tip="Loading" size="large"></Spin>
      </div>
    );
  }

  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className=" w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center ">
          <IoChevronBackOutline
            className="text-4xl cursor-pointer  font-semibold"
            onClick={() => window.history.back()}
          />
          <p className="text-3xl text-black font-semibold">Edit Profile</p>
        </div>
      </div>
      <div className=" ">
        <Form
          onFinish={onFinish}
          layout="vertical"
          className="bg-transparent py-10  h-full w-full p-10"
        >
          <div className=" rounded-lg h-full w-full md:grid grid-cols-3">
            <div className="mt-5 flex flex-col justify-center items-center gap-x-4">
              <div className=" relative">
                <img
                  className="h-40 w-40 relative rounded-full border bg-base-color border-secondary-color object-contain"
                  src={imageUrl}
                  alt="Profile Image"
                />
                <Form.Item name="image">
                  <Upload
                    beforeUpload={() => false} // Prevent automatic upload to server
                    onChange={handleImageUpload}
                    maxCount={1}
                    accept="image/*"
                    className="absolute -top-10 !right-3 text-end noText"
                    style={{
                      width: "100%",
                      height: "100%",
                      opacity: 0,
                      cursor: "pointer",
                    }}
                  >
                    <Button
                      style={{
                        zIndex: 1,
                      }}
                      className="bg-white p-2 w-fit h-fit rounded-full shadow !border-none"
                    >
                      <IoCameraOutline
                        className="w-5 h-5"
                        style={{ color: "#19363D" }}
                      />
                    </Button>
                  </Upload>
                </Form.Item>
              </div>
              <p className="text-center text-2xl font-medium">Admin</p>
              <p className="text-3xl font-medium">{myProfile?.fullName}</p>
            </div>

            <div className=" col-span-2 text-white mt-5">
              <Typography.Title level={5} style={{ color: "#222222" }}>
                First Name
              </Typography.Title>
              <Form.Item
                initialValue={myProfile?.fullName}
                name="fullName"
                className="text-white "
              >
                <Input
                  suffix={<MdOutlineEdit />}
                  type="text"
                  placeholder="Enter your first name"
                  className="py-2 px-3 text-xl border  ! !bg-transparent"
                />
              </Form.Item>

              <Typography.Title level={5} style={{ color: "#222222" }}>
                Address
              </Typography.Title>
              <Form.Item
                initialValue={myProfile?.address}
                name="address"
                className="text-white "
              >
                <Input
                  suffix={<MdOutlineEdit />}
                  type="text"
                  placeholder="Enter your Address"
                  className="py-2 px-3 text-xl border  ! !bg-transparent"
                />
              </Form.Item>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Contact number
              </Typography.Title>

              <Form.Item
                initialValue={myProfile?.phone}
                name="contactNumber"
                className="text-white"
              >
                <PhoneInput className="" enableSearch={true} />
              </Form.Item>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Date Of Birth
              </Typography.Title>
              <Form.Item
                // initialValue={newDate}
                name="dob"
                className="text-white"
              >
                <DatePicker
                  suffix={<MdOutlineEdit />}
                  className="h-14 w-full"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
                  htmlType="submit"
                >
                  Save & Change
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default EditProfile;
