import { Button, Pagination, Table, TableColumnsType, Tag } from "antd";
import { useGetAllProductQuery } from "../../redux/features/products/productSlice";
import { Product } from "../../types/product";
import Spinner from "../others/Spinner";
import { useState } from "react";
import { Link} from "react-router-dom";
import { EditOutlined} from "@ant-design/icons";
const ProductList = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const columns: TableColumnsType<Product> = [
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: 100,
      render: (thumbnail: string) => (
        <img
          src={thumbnail}
          alt="thumbnail"
          style={{
            width: 60,
            height: 60,
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      ),
      fixed: "left",
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      width: 150,
      fixed: "left",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 100,
      sorter: (a, b) => (a.price ?? 0) - (b.price ?? 0),},
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: 100,
      sorter: (a, b) => (a.rating?? 0) - (b.rating ?? 0),
    },
  
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 150,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 150,
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      width: 130,
      render: (tags: string[]) => (
        <>
          {tags.map((tag, index) => (
            <Tag color="blue" key={index}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "availabilityStatus",
      key: "availabilityStatus",
      width: 100,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      width: 100,
    },
  
    {
      title: "Discount(%)",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      width: 100,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      width: 80,
    },
  
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 100,
      fixed: "right",
      render: (_:  unknown, record: Product) => (
        <Link to={`/product/edit/${record.id}`}>
            <Button
        //  <EditOutlined />
          icon={<EditOutlined />}
         type="primary"
          
     
        >
          Edit
        </Button>
        </Link>
      
      ),
    },
  ];
  
  const isFetchAll = limit === 0;
  const { data, isLoading } = useGetAllProductQuery(
    isFetchAll
    ? { limit: 0, skip: 0 }
    : { limit, skip: (currentPage - 1) * limit },
    { pollingInterval: 30000, refetchOnFocus: true, refetchOnMountOrArgChange: true }
  );

  const products: Product[] = data?.products || [];
  const totalItems: number = data?.total || 0;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handlePageSizeChange = (current: number, pageSize: number) => {
    setLimit(pageSize);
    setCurrentPage(current); 
  };


  return (
    <>
      {isLoading ? (
        <div>
          <Spinner></Spinner>
        </div>
      ) : (<div style={{ padding: "0 16px" }}>
        <Table<Product>
            columns={columns}
            dataSource={products}
            bordered
            size="middle"
            pagination={false} // Disable Ant Design's default pagination
            scroll={{ x: "calc(500px + 50%)", y: 80 * 5 }}
          />
          <Pagination
          style={{marginTop:"18px"}}
            current={currentPage}
            total={isFetchAll ? products.length: totalItems} // Important fix
            pageSize={isFetchAll ? products.length : limit} // If fetch all, set pageSize = products.length
            onChange={handlePageChange}
            onShowSizeChange={handlePageSizeChange}
            showSizeChanger
            pageSizeOptions={["0", "10", "20", "50", "100"]}
            showTotal={(total) => `Total ${total} items`}
            // hideOnSinglePage={isFetchAll} // hide page numbers if fetching all
          />
        </div>
      )}
    </>
  );
};

export default ProductList;
