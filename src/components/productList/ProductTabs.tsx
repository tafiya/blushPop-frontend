import { Divider, List, Rate, Tabs, Typography } from "antd";
import { ProductTabsProps } from "../../types/product";
const { Paragraph, Text } = Typography;

const labelStyle = {
  fontWeight: "bold",
  fontSize: "1rem",
  color: "#1a1a1a",
} as React.CSSProperties;

const listItemStyle = {
  marginBottom: 12,
} as React.CSSProperties;

const ProductTabs = ({
  description,
  brand,
  sku,
  weight,
  warrantyInformation,
  shippingInformation,
  availabilityStatus,
  returnPolicy,
  minimumOrderQuantity,
  category,
  dimensions,
  stock,
  reviews,
}: ProductTabsProps) => {
  const items = [
    {
      key: "1",
      label: "Description",
      children: (
        <Paragraph
          style={{ maxWidth: "100%", fontSize: "1rem", lineHeight: "1.6" }}
        >
          {description ||
            "This is a premium product designed to bring out the best experience for our customers."}
        </Paragraph>
      ),
    },
    {
      key: "2",
      label: "Specification",
      children: (
        <ul style={{ paddingLeft: 16, listStyle: "none", margin: 0 }}>
          <li style={listItemStyle}>
            <span style={labelStyle}>Brand:</span> {brand}
          </li>
          <Divider />
          <li style={listItemStyle}>
            <span style={labelStyle}>Category:</span> {category}
          </li>
          <Divider />
          <li style={listItemStyle}>
            <span style={labelStyle}>SKU:</span> {sku}
          </li>
          <Divider />
          <li style={listItemStyle}>
            <span style={labelStyle}>Weight:</span> {weight}
          </li>
          <Divider />
          <li style={listItemStyle}>
            <span style={labelStyle}>Height:</span> {dimensions.height} cm
          </li>
          <Divider />
          <li style={listItemStyle}>
            <span style={labelStyle}>Width:</span> {dimensions.width} cm
          </li>
          <Divider />
          <li style={listItemStyle}>
            <span style={labelStyle}>Depth:</span> {dimensions.depth} cm
          </li>
          <Divider />
          <li style={listItemStyle}>
            <span style={labelStyle}>Stock:</span> {stock}
          </li>
          <Divider />
          <li style={listItemStyle}>
            <span style={labelStyle}>Warranty:</span> {warrantyInformation}
          </li>
        </ul>
      ),
    },
    {
      key: "3",
      label: "Order Details",
      children: (
        <ul style={{ paddingLeft: 16, listStyle: "none", margin: 0 }}>
          <li style={listItemStyle}>
            <span style={labelStyle}>Status:</span> {availabilityStatus}
          </li>
          <Divider />
          <li style={listItemStyle}>
            <span style={labelStyle}>Minimum Order:</span>{" "}
            {minimumOrderQuantity}
          </li>
        </ul>
      ),
    },
    {
      key: "4",
      label: "Shipping & Returns",
      children: (
        <Paragraph
          style={{
            maxWidth: "100%",
            fontSize: "1rem",
            lineHeight: "1.7",
            color: "#555",
          }}
        >
          <span style={labelStyle}>Shipping:</span>{" "}
          {shippingInformation
            ? `Our products are carefully packaged and dispatched within the timeframe mentioned. ${shippingInformation}. Please allow for additional time during holidays or promotions.`
            : "Shipping details not available at this moment. Please contact support for more information."}
          <Divider />
          <span style={labelStyle}>Return:</span>{" "}
          {returnPolicy
            ? `We value your satisfaction. ${returnPolicy}. To initiate a return, ensure the product is unused and in original packaging. Terms and conditions apply.`
            : "No return policy has been provided. Please check with customer support before making a purchase."}
        </Paragraph>
      ),
    },
    {
      key: "5",
      label: `Reviews (${reviews?.length || 0})`,
      children:
        reviews?.length === 0 ? (
          <Text>No reviews yet.</Text>
        ) : (
          <List
            itemLayout="vertical"
            dataSource={reviews}
            renderItem={(review) => (
              <List.Item>
                <Rate disabled defaultValue={review.rating} />
                <Paragraph style={{ margin: "4px 0" }}>
                  "{review.comment}"
                </Paragraph>
                <Text type="secondary">
                  By {review.reviewerName} •{" "}
                  {new Date(review.date).toLocaleDateString()}
                </Text>
              </List.Item>
            )}
          />
        ),
    },
  ];

  return (
    <div style={{ padding: "0 1rem", width: "100%" }}>
      <Tabs
        style={{ fontSize: "1rem" }}
        defaultActiveKey="1"
        type="card"
        items={items}
        tabBarGutter={32}
        tabBarStyle={{
          fontWeight: 600,
          fontSize: "1rem",
        }}
      />
    </div>
  );
};

export default ProductTabs;
