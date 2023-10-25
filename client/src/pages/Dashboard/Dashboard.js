import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/logo.png";
import { getUser } from "../../services/authService";
import { getUsers } from "../../redux/features/userSlice";
import DisplayUsers from "../../components/registration/DisplayUsers";
import DisplayData from "../../components/registration/DisplayData";
import RegistrationDataTable from "../../components/registration/RegistrationDataTable";
import RegistrationRecord from "../../components/registration/RegistrationRecord";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Header, Content, Sider } = Layout;

const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const Dashboard = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { id } = useParams();

  const [profile, setProfile] = useState(null);

  //   const isLoggedIn = useSelector(selectIsLoggedIn);
  const { users, isLoading, message } = useSelector(
    (state) => state.users
  );

  console.log(users);

  const items2 = ["Personal", "Business", "Messages"].map((icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: icon,
    };
  });

  useEffect(() => {
    async function getUserData() {
      const data = await getUser();
      console.log(data);

      setProfile(data);
      if (data) {
        await dispatch(SET_USER(data));
        await dispatch(SET_NAME(data.name));
      }
      await dispatch(getUsers())
    }
    getUserData();

  }, [dispatch]);

  return (
    <div>
      <Layout>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo">
            <img
              style={{ marginTop: "25px" }}
              width="50px"
              height="50px"
              src={logo}
            />
          </div>
        </Header>
        <Layout style={{ marginTop: "65px" }}>
          <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
              items={items2}
            />
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              <DisplayData data={users ? users[0] : []} />
              {/* <DisplayUsers /> */}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
