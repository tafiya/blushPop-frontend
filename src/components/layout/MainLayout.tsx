import { Breadcrumb, Layout } from "antd";
import { Outlet } from "react-router-dom";
const { Header, Content, Footer } = Layout;
const MainLayout = () => {
  return (
    <Layout style={{ height: "" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#c5d9f6",
        }}
      >
        <h2>BlushPop</h2>
      </Header>
      <Content style={{ backgroundColor: "#ecf2fa" }} >
        <Breadcrumb style={{ margin: "16px 48px" ,}}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
         
            // minHeight: 280,
            padding: 24,
          }}
        >
          <Outlet></Outlet>

        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default MainLayout;
