import { AllIcons } from "../../../public/images/AllImages";
import RecentUserTable from "../../Components/Tables/RecentUserTable";

import UserRatioBarChart from "../../Components/Chart/UserRatioBarChart";
import { useUserRatioQuery } from "../../redux/api/profileApi";
import { useState } from "react";

const AdminDashboard = () => {
  // const { data, error, isLoading } = useGetAllusersListQuery();
  const [year, setYear] = useState("");
  const { data: userRatio, isLoading } = useUserRatioQuery(year);


  return (
    <div>
      <>
        <div className=" items-stretch">
          <div className="xl:col-span-2">
            {/* Card Items */}
            <div className="flex flex-col sm:flex-row gap-1 lg:gap-5 mb-5">
              {/* Carer  */}
              <div className="flex bg-white border border-secondary-color gap-5 flex-wrap rounded-lg py-2 px-1 lg:p-5 items-center justify-center flex-1">
                <div className="flex gap-2 xl:gap-4 items-center ">
                  <img src={AllIcons.totalUser} className="h-14 w-12" alt="" />

                  <div className="text-center w-fit">
                    <p className="text-sm lg:text-base xl:text-2xl font-medium ">
                      Total Users
                    </p>
                    <p className="text-xs lg:text-sm xl:text-xl  mb-1 text-secondary-color">
                      {userRatio?.data.totalUsers}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* State */}
            <div className="w-full h-fit  rounded-xl">
              <UserRatioBarChart
                setYear={setYear}
                userRatio={userRatio?.data.userOverview}
              />
            </div>
          </div>
        </div>
        {/* Table  */}

        <div className="text-xl font-medium whitespace-nowrap mt-5">
          Recent Users
        </div>

        <div
          className="w-full h-fit  rounded-xl mt-2 border border-secondary-color"
          style={{ boxShadow: "0px 0px 2px 1px #00000030" }}
        >
          {/* Recent User table  */}
          <RecentUserTable
            data={userRatio?.data?.recentUsers}
            loading={isLoading}
          />
        </div>
      </>
    </div>
  );
};

export default AdminDashboard;
