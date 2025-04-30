import Title from "antd/es/typography/Title";
import EditProduct from "../components/productList/EditProduct";

const EditProductsPage = () => {
  return (
    <div>
      <Title level={1} style={{ textAlign: "center", paddingBottom:"4px" }}>
        Edit Product
      </Title>
      <EditProduct></EditProduct>
    </div>
  );
};

export default EditProductsPage;
