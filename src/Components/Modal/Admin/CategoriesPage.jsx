import { Button, Form, Input, Modal, Spin } from "antd";
import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import {
  useDeleteCategoryMutation,
  useGetAllcategoryListQuery,
  useUpdateCtegoryMutation,
} from "../../../redux/api/categoryApi";
import AddCompanyModal from "./AddCategoriesModal";

const CategoriesPage = () => {
  const { data, isLoading } = useGetAllcategoryListQuery();
  const [updateCategory] = useUpdateCtegoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [id, setId] = useState(null);
  const [form] = Form.useForm();

  const [isAddCompanyModalVisible, setIsAddCompanyModalVisible] =
    useState(false);

  const handleCancel = () => {
    setIsAddCompanyModalVisible(false);
  };
  const showAddCompanyModal = () => {
    setIsAddCompanyModalVisible(true);
  };

  const updateModelOpen = (id) => {
    setIsUpdateModalOpen(true);
    setId(id);
  };
  const deleteModelOpen = (id) => {
    setIsDeleteModalOpen(true);
    setId(id);
  };

  const updateSingleCategory = async (values) => {
    // const toastId = toast.loading("Category is updateing...");
    const data = {
      id: id,
      categoryName: values.categoryName,
    };
    console.log("Service User:", data);

    try {
      const res = await updateCategory(data).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    form.resetFields();
    setIsUpdateModalOpen(false);
  };

  const deleteSingleCategory = async () => {
    // const toastId = toast.loading("Category is updateing...");

    const data = {
      id: id,
    };

    try {
      const res = await deleteCategory(data).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    setIsDeleteModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin></Spin>;
      </div>
    );
  }
  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      {/* Header  */}
      <div className="bg-secondary-color w-full p-4 rounded-tl-xl rounded-tr-xl">
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
        length={data?.data?.length}
      />
      <div className="flex  gap-5 p-5 justify-between items-center border-b border-secondary-color max-w-[400px] mx-auto">
        <h1 className="text-xl text-secondary-color">Category Serial</h1>
        <h1 className="text-xl text-secondary-color ">Category Name</h1>
      </div>
      {data?.data.map((category,index) => (
        <div
          key={category?._id}
          className="flex  gap-5 p-5 justify-between items-center border-b border-base-color  max-w-[400px] mx-auto"
        >
          <h1 className="text-lg text-black flex justify-center w-full">
            {index+1}
          </h1>
          <h1 className="text-lg text-black flex justify-center w-full">
            {category?.name}
          </h1>

          <div className="flex gap-2">
            <FaTrashAlt
              onClick={() => deleteModelOpen(category._id)}
              className="text-red-400 cursor-pointer"
            />

            <FaEdit
              onClick={() => updateModelOpen(category._id)}
              className="text-blue-400 cursor-pointer"
            />
          </div>
        </div>
      ))}

      {/* Update Modal */}
      <Modal
        title=""
        open={isUpdateModalOpen}
        onOk={() => setIsUpdateModalOpen(false)}
        onCancel={() => setIsUpdateModalOpen(false)}
        footer={[]}
      >
        <Form form={form} onFinish={updateSingleCategory}>
          <h1 className="text-center text-lg  font-semibold mt-5 mb-10">
            Update this the Category
          </h1>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please Write down Modify Category Name",
              },
            ]}
            name="categoryName"
          >
            <Input />
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "40px",
              marginTop: "30px",
            }}
          >
            <Button
              className="text-xl py-5 px-8 !text-black"
              type="primary"
              onClick={() => setIsUpdateModalOpen(false)}
              style={{
                marginRight: 12,
                background: "rgba(221, 221, 221, 1)",
              }}
            >
              Cancel
            </Button>
            <Button
              htmlType="submit"
              className={`text-xl py-5 px-8 `}
              type="primary"
            >
              Update
            </Button>
          </div>
        </Form>
      </Modal>
      {/* Delete Model */}
      <Modal
        title=""
        open={isDeleteModalOpen}
        onOk={() => setIsDeleteModalOpen(false)}
        onCancel={() => setIsDeleteModalOpen(false)}
        footer={[]}
      >
        <h1 className="text-center text-lg  font-semibold mt-5 mb-10">
          Delete this Category
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "40px",
            marginTop: "30px",
          }}
        >
          <Button
            className="text-xl py-5 px-8 !text-black"
            type="primary"
            onClick={() => setIsDeleteModalOpen(false)}
            style={{
              marginRight: 12,
              background: "rgba(221, 221, 221, 1)",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={deleteSingleCategory}
            className={`text-xl py-5 px-8 bg-red-600 !hover:bg-red-600 `}
            type="primary"
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CategoriesPage;
