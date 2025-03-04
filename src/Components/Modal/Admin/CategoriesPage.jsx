import axios from "axios";
import { ConfigProvider, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IoMdAddCircleOutline } from "react-icons/io";
import AddCompanyModal from "./AddCategoriesModal";
import { useMemo, useState } from "react";

const categories = [
  { id: 1, name: "sports" },
  { id: 2, name: "Academic" },
  { id: 3, name: "Music" },
  { id: 4, name: "clothing" },
  { id: 5, name: "electronics" },
  { id: 6, name: "furniture" },
  { id: 7, name: "books" },
  { id: 8, name: "beauty" },
  { id: 9, name: "health" },
];
const CategoriesPage = () => {
  const [isAddCompanyModalVisible, setIsAddCompanyModalVisible] =
    useState(false);
  const [searchText, setSearchText] = useState("");

  const handleCancel = () => {
    setIsAddCompanyModalVisible(false);
  };
  const onSearch = (value) => {
    setSearchText(value);
  };

  const showAddCompanyModal = () => {
    setIsAddCompanyModalVisible(true);
  };
  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      {/* Header  */}
      <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center justify-between">
          <p className="text-3xl text-primary-color font-semibold">
            Categories
          </p>
          <div className="flex gap-4 items-center"></div>
        </div>
      </div>

      {/* Add Service User Button  */}
      <div className="md:px-10 px-6 mt-10 ">
        <div
          onClick={showAddCompanyModal}
          className="bg-secondary-color text-primary-color flex justify-center items-center gap-2 py-2 w-full rounded-lg cursor-pointer"
        >
          <div>
            <IoMdAddCircleOutline className="md:text-3xl text-2xl" />
          </div>
          <p className="md:text-2xl text-lg font-semibold whitespace-nowrap">
            Add Categories
          </p>
        </div>
      </div>

      {/* Modals */}
      <AddCompanyModal
        isAddCompanyModalVisible={isAddCompanyModalVisible}
        handleCancel={handleCancel}
      />
      <div className="flex  gap-5 p-5 justify-between items-center border-b border-secondary-color max-w-[400px] mx-auto">
        <h1 className="text-xl text-secondary-color">Category Serial</h1>
        <h1 className="text-xl text-secondary-color ">Category Name</h1>
      </div>
      {categories.map((category) => (
        <div className="flex  gap-5 p-5 justify-between items-center border-b border-base-color  max-w-[400px] mx-auto">
          <h1 className="text-lg text-black flex justify-center w-full">
            {category.id}
          </h1>
          <h1 className="text-lg text-black flex justify-center w-full">
            {category.name}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default CategoriesPage;
