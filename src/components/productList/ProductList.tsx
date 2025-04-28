import { Table, TableColumnsType } from "antd";
import { useStyle } from "../../styles/tableStyle";
import { useGetAllProductQuery } from "../../redux/features/products/productSlice";
import { Product } from "../../types/product";
import Spinner from "../others/Spinner";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  street: string;
  building: string;
  number: number;
  companyAddress: string;
  companyName: string;
  gender: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 100,
    fixed: "left",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "John",
        value: "John",
      },
    ],
    onFilter: (value, record) => record.name.indexOf(value as string) === 0,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: 150,
    sorter: (a, b) => a.age - b.age,
  },

  {
    title: "Street",
    dataIndex: "street",
    key: "street",
    width: 150,
  },

  {
    title: "Building",
    dataIndex: "building",
    key: "building",
    width: 100,
  },
  {
    title: "Door No.",
    dataIndex: "number",
    key: "number",
    width: 100,
  },

  {
    title: "Company Address",
    dataIndex: "companyAddress",
    key: "companyAddress",
    width: 200,
  },
  {
    title: "Company Name",
    dataIndex: "companyName",
    key: "companyName",
  },

  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    width: 80,
    fixed: "right",
  },
];

const dataSource = Array.from({ length: 100 }).map<DataType>((_, i) => ({
  key: i,
  name: "John BrownJohn Brown",
  age: i + 1,
  street: "Lake Park",
  building: "C",
  number: 2035,
  companyAddress: "Lake Street 42",
  companyName: "SoftLake Co",
  gender: "M",
}));

const ProductList = () => {
  const { data, isFetching } = useGetAllProductQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  console.log(data);
  const products: Product[] = data?.products || [];
  console.log(products);
  const { styles } = useStyle();
  return (
    <>
   {isFetching && (
        <div>
          <Spinner></Spinner>
        </div>
      )}
        <Table<DataType>
      className={styles.customTable}
      columns={columns}
      dataSource={dataSource}
      bordered
      size="middle"
      scroll={{ x: "calc(500px + 50%)", y: 80 * 5 }}
    /></>

  );
};

export default ProductList;
