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

const { Title } = Typography;
type TCategory = {
  slug: string;
  name: string;
  url: string;
};
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
      console.log(categories);
    };
    fetchCategories();
  }, []);

  const onFinish = async (values: any) => {
    const payload = {
      id: id,
      updatedProduct: values,
    };

    try {
      console.log("Submitting updated product:", payload);
      await updateProduct({
        id: id,
        updatedProduct: values,
      }).unwrap();
      console.log("After Submitting updated product:", message);
      message.success("Product updated successfully!");
      navigate(`/`);
    } catch (error) {
      console.error("Update failed", error);
      message.error("Failed to update product");
    }
  };

  if (isLoading) return <p>Loading product...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <Title level={2}>Edit Product</Title>
      <Divider />
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={product}
      >
        <Row gutter={24}>
          <Col span={12}>
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
            <Form.Item name="price" label="Price">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="discountPercentage" label="Discount Percentage">
              <InputNumber style={{ width: "100%" }} min={0} max={100} />
            </Form.Item>
            <Form.Item name="stock" label="Stock">
              <InputNumber style={{ width: "100%" }} />
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
          </Col>

          <Col span={12}>
            <Form.Item name="description" label="Description">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item name="availabilityStatus" label="Availability Status">
              <Input />
            </Form.Item>
            <Form.Item name="warrantyInformation" label="Warranty">
              <Input />
            </Form.Item>
            <Form.Item name="shippingInformation" label="Shipping Info">
              <Input />
            </Form.Item>
            <Form.Item name="returnPolicy" label="Return Policy">
              <Input />
            </Form.Item>
            <Form.Item name="sku" label="SKU">
              <Input />
            </Form.Item>
            <Form.Item name="weight" label="Weight">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Divider />
        <Title level={4}>Reviews</Title>

        <Form.List name="reviews">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "rating"]}
                    rules={[{ required: true, message: "Missing rating" }]}
                  >
                    <Input placeholder="Rating (0-5)" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "comment"]}
                    rules={[{ required: true, message: "Missing comment" }]}
                  >
                    <Input placeholder="Comment" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "reviewerName"]}
                    rules={[
                      { required: true, message: "Missing reviewer name" },
                    ]}
                  >
                    <Input placeholder="Reviewer Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "date"]}
                    rules={[{ required: true, message: "Missing review date" }]}
                  >
                    <Input placeholder="Date" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Review
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isUpdating}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProduct;
