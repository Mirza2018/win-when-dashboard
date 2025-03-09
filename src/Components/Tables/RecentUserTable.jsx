import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ConfigProvider, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IoMdAddCircleOutline } from "react-icons/io";

//* Modal Table
import AllCompanyTable from "./Admin/AllUserTable";
import AddCompanyModal from "../Modal/Admin/AddCategoriesModal";
import ViewCompanyModal from "../Modal/Admin/ViewUserModal";
import BlockCompanyModal from "../Modal/Admin/BlockUserModal";
import AllUserTable from "./Admin/AllUserTable";
import ViewUserModal from "../Modal/Admin/ViewUserModal";
import BlockUserModal from "../Modal/Admin/BlockUserModal";
import { toast } from "sonner";
import { useUserBlockMutation } from "../../redux/api/usersApi";

const RecentUserTable = ({ data: users, loading: isLoading }) => {
    const [blockUser] = useUserBlockMutation();
  //* It's Use to Show Modal
  const [isCompanyViewModalVisible, setIsCompanyViewModalVisible] =
    useState(false);

  //* It's Use to Block Modal
  const [isCompanyBlockModalVisible, setIsCompanyBlockModalVisible] =
    useState(false);

  //* It's Use to Add Modal
  const [isAddCompanyModalVisible, setIsAddCompanyModalVisible] =
    useState(false);

  //* It's Use to Set Seclected User to Block and view
  const [currentCompanyRecord, setCurrentCompanyRecord] = useState(null);

  const showAddCompanyModal = () => {
    setIsAddCompanyModalVisible(true);
  };

  const showCompanyViewModal = (record) => {
    setCurrentCompanyRecord(record);
    setIsCompanyViewModalVisible(true);
  };

  const showCompanyBlockModal = (record) => {
    setCurrentCompanyRecord(record);
    setIsCompanyBlockModalVisible(true);
  };

  const handleCancel = () => {
    setIsCompanyViewModalVisible(false);
    setIsCompanyBlockModalVisible(false);
    setIsAddCompanyModalVisible(false);
  };

  const handleCompanyBlock = async (data) => {
    let toastId;
    if (data?.isBlocked) {
      toastId = toast.loading("User is Unblocking....");
    } else {
      toastId = toast.loading("User is Blocking....");
    }

    const id = data?._id;
    if (id) {
      try {
        const res = await blockUser(id);
        console.log(res?.data?.message);

        toast.success(
          res?.message || res?.data?.message || res?.error?.data?.message,
          {
            id: toastId,
            duration: 2000,
          }
        );
      } catch (error) {
        console.log(error);
        toast.error(
          error?.data?.res?.message ||
            error?.error ||
            "An error occurred during block User",
          {
            id: toastId,
            duration: 2000,
          }
        );
      }
    } else {
      toast.error("An error occurred during block User", {
        id: toastId,
        duration: 2000,
      });
    }
    setIsCompanyViewModalVisible(false);
    setIsCompanyBlockModalVisible(false);
  };

  return (
    <div className="bg-highlight-color   rounded-xl">
      {/* Add Service User Button  */}
      {/* <div className="px-10 mt-10 ">
        <div
          onClick={showAddCompanyModal}
          className="bg-secondary-color text-primary-color flex justify-center items-center gap-2 py-2 w-full rounded-lg cursor-pointer"
        >
          <IoMdAddCircleOutline className="text-3xl" />
          <p className="text-2xl font-semibold">Add Companies</p>
        </div>
      </div> */}

      {/* Table  */}
      <div className="">
        {/* <AllCompanyTable
          data={users}
          loading={isLoading}
          showCompanyViewModal={showCompanyViewModal}
          showCompanyBlockModal={showCompanyBlockModal}
          pageSize={2}
        /> */}

        <AllUserTable
          data={users}
          loading={isLoading}
          showCompanyViewModal={showCompanyViewModal}
          showCompanyBlockModal={showCompanyBlockModal}
          pageSize={2}
        />
      </div>

      {/* Modals */}
      <AddCompanyModal
        isAddCompanyModalVisible={isAddCompanyModalVisible}
        handleCancel={handleCancel}
      />
      <ViewUserModal
        isCompanyViewModalVisible={isCompanyViewModalVisible}
        handleCancel={handleCancel}
        currentCompanyRecord={currentCompanyRecord}
        handleCompanyBlock={handleCompanyBlock}
        showCompanyBlockModal={showCompanyBlockModal}
      />

      <BlockUserModal
        isCompanyBlockModalVisible={isCompanyBlockModalVisible}
        handleCompanyBlock={handleCompanyBlock}
        handleCancel={handleCancel}
        currentCompanyRecord={currentCompanyRecord}
      />
    </div>
  );
};

export default RecentUserTable;
