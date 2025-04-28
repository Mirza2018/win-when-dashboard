/* eslint-disable react/prop-types */
import { Button, Space, Table, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AllImages } from "../../../../public/images/AllImages";
import { render } from "react-dom";
import { getImageUrl } from "../../../redux/getBaseUrl";
import { FaUserCircle } from "react-icons/fa";

const AllUserTable = ({
  data,
  loading,
  showCompanyViewModal,
  showCompanyBlockModal,
  pageSize = 0,
}) => {
  const columns = [
    {
      title: "S.lD",
      dataIndex: "key",
      key: "key",
      rowScope: "row",
      render: (_, record, index) => <p>{index + 1}</p>,
      responsive: ["md"],
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          {(() => {
            const url = getImageUrl()
            return (
              <>
                {console.log(url + record?.profileImage)}
                {record?.profileImage ? (
                  <img
                    src={url + record?.profileImage}
                    alt={record?.fullName}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <FaUserCircle className="text-3xl text-gray-500" />
                )}

                <p className="whitespace-normal">{record?.fullName}</p>
              </>
            );
          })()}
        </div>
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Joining Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <div className="flex items-center gap-2">
          {(() => {
            const date = new Date(text);
            return (
              <>
                <p>{date.toLocaleDateString()}</p>
              </>
            );
          })()}
        </div>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          {record.isBlocked ? (
            <div className="flex justify-end items-center  w-fit text-end">
              <Tooltip placement="left" title="View Details">
                <p
                  className="!p-0"
                  style={{
                    background: "#FFFFFF",
                    border: "none",
                    color: "#839F9F",
                  }}
                  onClick={() => showCompanyViewModal(record)}
                >
                  <GoEye style={{ fontSize: "24px" }} />
                </p>
              </Tooltip>
            </div>
          ) : (
            <div className="flex justify-center items-center text-cente gap-2 w-fit">
              <Tooltip placement="left" title="View Details">
                <p
                  className="!p-0"
                  style={{
                    background: "#FFFFFF",
                    border: "none",
                    color: "#839F9F",
                  }}
                  onClick={() => showCompanyViewModal(record)}
                >
                  <GoEye style={{ fontSize: "24px" }} />
                </p>
              </Tooltip>
              {/* Block User Tooltip */}
              <Tooltip placement="right" title="Block this User">
                <p
                  className="!p-0"
                  style={{
                    background: "#FFFFFF",
                    border: "none",
                    color: "#C50000",
                  }}
                  onClick={() => showCompanyBlockModal(record)}
                >
                  <RiDeleteBin6Line style={{ fontSize: "24px" }} />
                </p>
              </Tooltip>
              {/* View Details Tooltip */}
            </div>
          )}
        </>
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={pageSize > 0 ? { pageSize } : false}
        rowKey="id"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default AllUserTable;
