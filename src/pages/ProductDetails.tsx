import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../redux/features/products/productSlice";
import {
  Button,
  Col,
  Divider,
  Image,
  Rate,
  Row,
  Spin,
  Tag,
  Typography,
} from "antd";
import ProductTabs from "../components/productList/ProductTabs";
import { ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductByIdQuery(id!);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const discountPrice =
    product.price - (product.price * (product.discountPercentage || 0)) / 100;

  return (
    <div style={{ padding: "20px" }}>
      <Row
        gutter={[24, 24]}
        justify="center"
        style={{
         
          borderRadius: "12px",
          padding: "16px",
        }}
      >
        {/* Product Image */}
        <Col
          xs={24}
          md={10}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            width="100%"
            src={product.thumbnail}
            alt={product.title}
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
              backgroundColor: "white",
              objectFit: "contain",
              padding: "10px",
            }}
          />
        </Col>

        {/* Product Info */}
        <Col xs={24} md={14}>
          <Rate allowHalf disabled defaultValue={product.rating} />
          <Title level={2}>{product.title}</Title>

          <div style={{ margin: "8px 0" }}>
            {product.tags.map((tag: string, index: string) => (
              <Tag color="blue" key={index}>
                {tag}
              </Tag>
            ))}
          </div>

          <div style={{ margin: "12px 0" }}>
            <Title level={3} style={{ color: "#c90076" }}>
              ${discountPrice.toFixed(2)}
            </Title>

            {product.discountPercentage && (
              <>
                <Tag color="purple">{product.discountPercentage}% OFF</Tag>
                <Text delete style={{ marginLeft: 8 }}>
                  ${product.price.toFixed(2)}
                </Text>
              </>
            )}
          </div>

          <Divider />

          <Paragraph style={{ maxWidth: "100%" }}>
            {product.description ||
              "Rejuvenate and refresh your skin with our Rosewater Hydrating Mist..."}
          </Paragraph>

          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Text strong>
                Availability:{" "}
                <span style={{ color: "green" }}>
                  {product.availabilityStatus || "In Stock"}
                </span>
              </Text>
            </Col>

            <Col span={12}>
              <Text strong>
                Brand: <span style={{ fontWeight: "normal" }}>{product.brand}</span>
              </Text>
            </Col>

            <Col span={12}>
              <Text strong>
                Category: <span style={{ fontWeight: "normal" }}>{product.category}</span>
              </Text>
            </Col>

            <Col span={12}>
              <Text strong>
                SKU: <span style={{ fontWeight: "normal" }}>{product.sku}</span>
              </Text>
            </Col>
          </Row>

          <Divider />

          <Row gutter={[12, 12]}>
            <Col xs={24} sm={12}>
              <Button
                block
                type="primary"
                shape="round"
                icon={<ShoppingCartOutlined />}
                size="large"
              >
                Add to Cart
              </Button>
            </Col>

            <Col xs={24} sm={12}>
              <Button
                block
                type="primary"
                ghost
                shape="round"
                icon={<ShoppingOutlined />}
                size="large"
              >
                Buy Now
              </Button>
            </Col>
          </Row>
        </Col>

        {/* Product Tabs */}
        <Col span={24}>
          <ProductTabs
            description={product.description}
            brand={product.brand}
            size={product.size}
            sku={product.sku}
            weight={product.weight}
            warrantyInformation={product.warrantyInformation}
            shippingInformation={product.shippingInformation}
            availabilityStatus={product.availabilityStatus}
            returnPolicy={product.returnPolicy}
            minimumOrderQuantity={product.minimumOrderQuantity}
            category={product.category}
            dimensions={product.dimensions}
            stock={product.stock}
            rating={product.rating}
            reviews={product.reviews}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
