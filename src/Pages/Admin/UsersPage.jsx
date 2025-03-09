import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ConfigProvider, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IoMdAddCircleOutline } from "react-icons/io";

//* Modal Table
import AllUserTable from "../../Components/Tables/Admin/AllUserTable";
import ViewUserModal from "../../Components/Modal/Admin/ViewUserModal";
import BlockUserModal from "../../Components/Modal/Admin/BlockUserModal";
import AddCategoriesModal from "../../Components/Modal/Admin/AddCategoriesModal";
import {
  useGetAllusersListQuery,
  useUserBlockMutation,
} from "../../redux/api/usersApi";
import { toast } from "sonner";
import { resolvePath } from "react-router-dom";

const UsersPage = () => {
  const [blockUser] = useUserBlockMutation();
  //* Store Search Value
  const { data, error, isLoading } = useGetAllusersListQuery();
  // console.log(data?.data, "All Users", error, isLoading);

  const [searchText, setSearchText] = useState("");

  //* Use to set user
  // const [data, setData] = useState([]);

  // const [loading, setLoading] = useState(true);

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/data/userData.json");
  //       setData(response?.data); // Make sure this is an array
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const filteredCompanyData = useMemo(() => {
    if (!searchText) return data?.data;
    console.log(data?.data, "forme");

    return data?.data.filter((item) => {
      console.log(item, searchText, "forme2");

      return item?.email.toLowerCase().includes(searchText.toLowerCase());
    });
  }, [data?.data, searchText]);

  // const filteredCompanyData = useMemo(() => {
  //   if (!searchText) return data?.data;

  //   console.log(data?.data, "forme");

  //   return data?.data.filter((item) => {
  //     console.log(item, searchText, "forme2");
  //     return item?.email.includes(searchText.toLowerCase()); // Add return here
  //   });
  // }, [data?.data, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

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
    // console.log("Blocked Users from me:", {
    //   id: data?._id,
    // });

    setIsCompanyViewModalVisible(false);
    setIsCompanyBlockModalVisible(false);
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
            Users List
          </p>
          <div className="flex gap-4 items-center">
            <ConfigProvider
              theme={{ token: { colorTextPlaceholder: "#f3f3f3" } }}
            >
              <Input
                placeholder={`search User...`}
                value={searchText}
                onChange={(e) => onSearch(e.target.value)}
                className="search-input font-semibold !border-primary-color !placeholder:text-secondary-color !bg-white text-secondary-color py-2 !rounded-full"
                prefix={
                  <SearchOutlined className="text-secondary-color font-bold text-lg mr-2" />
                }
              />
            </ConfigProvider>
          </div>
        </div>
      </div>

      {/* Table  */}
      <div className="px-10 py-10">
        <AllUserTable
          data={filteredCompanyData}
          loading={isLoading}
          showCompanyViewModal={showCompanyViewModal}
          showCompanyBlockModal={showCompanyBlockModal}
          pageSize={8}
        />
      </div>

      {/* Modals */}
      <AddCategoriesModal
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

export default UsersPage;
