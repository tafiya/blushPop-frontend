/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../redux/features/products/productSlice";
import { Product, TCategory } from "../../types/product";

const { Title } = Typography;

const EditProduct = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { data: product, isLoading } = useGetProductByIdQuery(id!);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [categories, setCategories] = useState<TCategory[]>([]);

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product, form]);

  useEffect(() => {
    // Get categories from API
    const fetchCategories = async () => {
      const res = await axios.get("https://dummyjson.com/products/categories");
      setCategories(res.data);
 
    };
    fetchCategories();
  }, []);

  const onFinish = async (values: Product) => {
    const reviewsWithDate =
      values.reviews?.map((review) => ({
        ...review,
        date: new Date().toISOString(),
      })) || [];
    const finalValues = {
      ...values,
      reviews: reviewsWithDate,
    };
    const payload = {
      id: id,
      updatedProduct: finalValues,
    };

    try {
      console.log("Submitting updated product:", payload);
      await updateProduct({
        id: id,
        updatedProduct: values,
      }).unwrap();
      message.success("Product updated successfully!");
      navigate(`/`);
    } catch (error) {
      console.error("Update failed", error);
      message.error("Failed to update product");
    }
  };

  if (isLoading) return <p>Loading product...</p>;

  return (
    <div
      style={{
        padding: "1rem 2rem",
        backgroundColor: "#E3F2FD",
        borderRadius: "8px",
      }}
    >
      <Divider />
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={product}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="title"
              label="Product Title"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="brand" label="Brand">
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Select>
                {categories?.map(
                  (category: { slug: string; name: string; url: string }) => (
                    <Select.Option key={category.slug} value={category.slug}>
                      {category.name}
                    </Select.Option>
                  )
                )}
              </Select>
            </Form.Item>
            <Form.Item name="price" label="Price">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="sku" label="SKU">
              <Input />
            </Form.Item>
            <Form.Item name="discountPercentage" label="Discount Percentage">
              <InputNumber style={{ width: "100%" }} min={0} max={100} />
            </Form.Item>
            <Form.Item name="stock" label="Stock">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.List name="tags">
              {(fields, { add, remove }) => (
                <div>
                  <label>Tags</label>
                  {fields.map((field, index) => (
                    <Space
                      key={field.key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...field}
                        name={[field.name]}
                        rules={[{ required: true, message: "Missing tag" }]}
                      >
                        <Input placeholder={`Tag ${index + 1}`} />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Tag
                  </Button>
                </div>
              )}
            </Form.List>
            <Form.Item
              label="Thumbnail"
              name="thumbnail"
              rules={[
                { required: true, type: "url", message: "Enter a valid URL" },
              ]}
            >
              <Input />
            </Form.Item>

            {/* Images - dynamic string array */}
            <Form.List name="images">
              {(fields, { add, remove }) => (
                <div>
                  <label>Images</label>
                  {fields.map((field, index) => (
                    <Space
                      key={field.key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...field}
                        name={[field.name]}
                        rules={[
                          { required: true, message: "Missing image URL" },
                        ]}
                      >
                        <Input placeholder={`Image URL ${index + 1}`} />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Image
                  </Button>
                </div>
              )}
            </Form.List>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="description" label="Description">
              <Input.TextArea rows={4} />
            </Form.Item>
            {/* Dimensions */}
            <Divider>Dimensions</Divider>
            <Form.Item
              label="Width"
              name={["dimensions", "width"]}
          
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Height"
              name={["dimensions", "height"]}
           
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Depth"
              name={["dimensions", "depth"]}
            
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="weight" label="Weight">
              <Input />
            </Form.Item>
            <Form.Item name="availabilityStatus" label="Availability Status">
              <Input />
            </Form.Item>
            <Form.Item name="warrantyInformation" label="Warranty">
              <Input />
            </Form.Item>
            <Divider>Shippings & Returns</Divider>
            <Form.Item
              label="Minimum Order Quantity"
              name="minimumOrderQuantity"
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="shippingInformation" label="Shipping Info">
              <Input />
            </Form.Item>
            <Form.Item name="returnPolicy" label="Return Policy">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Divider />
        <Title level={4} style={{ textAlign: "center" }}>
          Reviews
        </Title>

        <Form.List name="reviews">
          {(fields, { add, remove }) => (
            <div>
              {fields.map(({ name, ...restField }) => (
                <div
                  key={name}
                  style={{
                    marginBottom: 24,
                    padding: "1rem",
                    backgroundColor: "#f5f5f5",
                    borderRadius: 8,
                  }}
                >
                  <Row gutter={16}>
                    <Col xs={24} md={8}>
                      <Form.Item
                        {...restField}
                        name={[name, "rating"]}
                        label="Rating (0-5)"
                        rules={[{ required: true, message: "Missing rating" }]}
                      >
                        <Input placeholder="Rating" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                      <Form.Item
                        {...restField}
                        name={[name, "comment"]}
                        label="Comment"
                        rules={[{ required: true, message: "Missing comment" }]}
                      >
                        <Input placeholder="Comment" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={7}>
                      <Form.Item
                        {...restField}
                        name={[name, "reviewerName"]}
                        label="Reviewer Name"
                        rules={[
                          { required: true, message: "Missing reviewer name" },
                        ]}
                      >
                        <Input placeholder="Reviewer Name" />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={24}
                      md={1}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: 32,
                      }}
                    >
                      <MinusCircleOutlined
                        style={{ color: "red" }}
                        onClick={() => remove(name)}
                      />
                    </Col>
                  </Row>
                </div>
              ))}
              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  style={{ width: 200 }}
                >
                  Add Review
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>

        <Divider />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={isUpdating}
              style={{ width: "200px" }} // you can adjust width as needed
            >
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default EditProduct;
