import Topbar from "../Shared/Topbar";

// import logo from "/images/logo.png";
import dashboardLogo from "../../../public/images/dashboard-logo/dashboard.svg";

import companies from "../../../public/images/dashboard-logo/companies.svg";
import carer from "../../../public/images/dashboard-logo/carer.svg";
import serviceUser from "../../../public/images/dashboard-logo/service.svg";
import employee from "../../../public/images/dashboard-logo/employee.svg";
import report from "../../../public/images/dashboard-logo/report.svg";
import setting from "../../../public/images/dashboard-logo/setting.svg";
import profile from "../../../public/images/dashboard-logo/profile.svg";
import feedback from "../../../public/images/dashboard-logo/feedback.svg";
import logout from "../../../public/images/dashboard-logo/logout.svg";

import {
  Link,
  NavLink,
  Outlet,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { AllIcons, AllImages } from "../../../public/images/AllImages";
import TopLoadingBar from "react-top-loading-bar";

const DashboardLayout = () => {
  const userRole = JSON.parse(localStorage.getItem("home_care_user")); // Parse the stored JSON string

  const location = useLocation();
  const pathSegment = location.pathname.split("/").pop();

  const currentPath = location.pathname;

  // Logic to set active keys
  const activeKeys = (() => {
    if (
      currentPath.includes("/profile") ||
      currentPath.includes("/edit-profile")
    ) {
      return ["profile"];
    }
    if (currentPath.includes("/settings")) {
      return ["settings"];
    }
    return [currentPath.split("/")[1]]; // Default fallback
  })();

  const [collapsed, setCollapsed] = useState(false);

  // Use effect to handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const adminMenuItems = [
    {
      key: "dashboard",
      icon: (
        <img
          src={AllIcons.one}
          alt="dashboard"
          width={20}
          style={{
            filter: location.pathname.includes("dashboard")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="dashboard">Dashboard</NavLink>,
    },
    {
      key: "users",
      icon: (
        <img
          src={AllIcons.two}
          alt="users"
          width={20}
          style={{
            filter: location.pathname.includes("users")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="users">Users</NavLink>,
    },
    {
      key: "categories",
      icon: (
        <img
          src={AllIcons.three}
          alt="categories"
          width={20}
          style={{
            filter: location.pathname.includes("categories")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="categories">Categories</NavLink>,
    },
    {
      key: "settings",
      icon: (
        <img
          src={AllIcons.four}
          alt="settings"
          width={20}
          style={{
            filter: location.pathname.includes("settings")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="settings">Settings</NavLink>,
    },
  ];

  const companyMenuItems = [
    {
      key: "dashboard",
      icon: (
        <img
          src={dashboardLogo}
          alt="dashboard"
          width={20}
          style={{
            filter: location.pathname.includes("dashboard")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="dashboard">Dashboard</NavLink>,
    },
    {
      key: "service-user",
      icon: (
        <img
          src={serviceUser}
          alt="service-user"
          width={20}
          style={{
            filter: location.pathname.includes("service-user")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="service-user">Service User</NavLink>,
    },
    {
      key: "carer",
      icon: (
        <img
          src={carer}
          alt="carer"
          width={20}
          style={{
            filter: location.pathname.includes("carer")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="carer">Carer</NavLink>,
    },
    {
      key: "employee",
      icon: (
        <img
          src={employee}
          alt="employee"
          width={20}
          style={{
            filter: location.pathname.includes("employee")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="employee">Employee</NavLink>,
    },
    {
      key: "report",
      icon: (
        <img
          src={report}
          alt="report"
          width={20}
          style={{
            filter: location.pathname.includes("report")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="report">Report</NavLink>,
    },
  ];

  const commonItems = [
    {
      key: "profile",
      icon: (
        <img
          src={AllIcons.five}
          alt="profile"
          width={16}
          height={16}
          style={{
            filter:
              location.pathname.includes("/profile") ||
              location.pathname.includes("/edit-profile")
                ? "brightness(0) invert(1)"
                : undefined,
          }}
        />
      ),
      label: <NavLink to="profile">Profile</NavLink>,
    },

    {
      key: "logout",
      icon: (
        <img
          src={AllIcons.six}
          alt="logout"
          width={16}
          height={16}
          style={{ color: "#222222", fontSize: "16px" }}
        />
      ),
      label: (
        <div onClick={() => localStorage.removeItem("home_care_user")}>
          <NavLink to="/signin">Logout</NavLink>
        </div>
      ),
    },
  ];

  // Select the appropriate menu items based on user role
  const menuItems =
    userRole?.role === "admin" ? adminMenuItems : companyMenuItems;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start the progress bar when the route changes
    setProgress(0);

    // After a delay, finish loading the progress bar (you can adjust this delay)
    const timeout = setTimeout(() => {
      setProgress(100);
    }, 100); // Adjust delay as necessary

    // Reset progress once loading is finished
    const resetTimeout = setTimeout(() => {
      setProgress(0);
    }, 200); // Reset after 1.5 seconds to ensure it reaches 100%

    // Cleanup timeouts on component unmount
    return () => {
      clearTimeout(timeout);
      clearTimeout(resetTimeout);
    };
  }, [location]);

  return (
    <div className="h-screen bg-white ">
      <TopLoadingBar
        color="#559BAC" // Customize the color
        progress={progress} // Dynamic progress based on state
        height={5} // Customize height of the bar
        onLoaderFinished={() => setProgress(0)} // Reset after loading
      />
      <ScrollRestoration />
      <Layout className="!relative !bg-white">
        <Sider
          width={240}
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            background: "#FFFFFF",
            boxShadow: "0px 0px 5px #00000040",
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
          }}
          className=""
        >
          <Link to="/">
            <img
              src={AllImages.logo}
              alt="logo"
              width={0}
              height={0}
              sizes="100vw"
              className="my-7 mx-auto w-40"
            />
          </Link>

          {/* Menu items */}
          {/* <Typography.Title
            className="mb-1"
            level={5}
            style={{
              paddingLeft: "6px",
              paddingRight: "6px",
              marginLeft: "12%",
            }}
          >
            Menu
          </Typography.Title> */}
          <Menu
            mode="inline"
            defaultSelectedKeys={pathSegment}
            selectedKeys={pathSegment}
            style={{
              backgroundColor: "transparent",
              border: "none",
              paddingLeft: "6px",
              paddingRight: "6px",
            }}
            items={menuItems}
          />

          {/* Other menu items */}
          {/* <Typography.Title
            level={5}
            className="mt-5"
            style={{
              paddingLeft: "6px",
              paddingRight: "6px",
              marginLeft: "12%",
            }}
          >
            Other
          </Typography.Title> */}
          <Menu
            mode="inline"
            defaultSelectedKeys={pathSegment}
            selectedKeys={activeKeys}
            style={{
              paddingBottom: "40px",
              backgroundColor: "transparent",
              border: "none",
              paddingLeft: "6px",
              paddingRight: "6px",
            }}
            items={commonItems}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              background: "#ffffff",
              position: "sticky",
              top: 0,
              zIndex: 999,
              marginLeft: 2,
            }}
          >
            <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          </Header>
          <Content>
            <div className="bg-base-color px-2 xl:px-5 py-4 xl:py-5">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default DashboardLayout;
