import { Breadcrumb, Image, Layout } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
const { Header, Content, Footer } = Layout;
const MainLayout = () => {
  const location = useLocation();

const pathSnippets = location.pathname.split("/").filter((i) => i);


  // Remove the last segment (e.g., ID like '123')
  const visiblePathSnippets = pathSnippets.slice(0, -1);

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home / products</Link>
    </Breadcrumb.Item>,
    ...visiblePathSnippets.map((snippet, index) => {
      const url = `/${visiblePathSnippets.slice(0, index + 1).join("/")}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{decodeURIComponent(snippet)}</Link>
        </Breadcrumb.Item>
      );
    }),
  ];
  return (
    <Layout style={{ height: "" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#BBDEFB",
        }}
      >
      <Image 
    width={100}  // You can adjust the width as needed
    src="https://res.cloudinary.com/demnpqwx3/image/upload/v1745993442/logo_jcnaek.png" 
    alt="BlushPop Logo" 
  />
      </Header>
      <Content style={{ backgroundColor: "#ecf2fa" }} >
      <Breadcrumb style={{ margin: "16px 48px" }}>
  {breadcrumbItems}
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
      <Footer style={{ textAlign: "center",backgroundColor: "#BBDEFB" }}>
      <Image 
    width={100}  // You can adjust the width as needed
    src="https://res.cloudinary.com/demnpqwx3/image/upload/v1745993442/logo_jcnaek.png" 
    alt="BlushPop Logo" 
  /> <span style={{ fontSize:"17px", fontWeight:"revert"}}> Created by Tafiyatul Jannat</span>
      </Footer>
    </Layout>
  );
};

export default MainLayout;
