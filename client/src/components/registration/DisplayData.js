import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import "./card.css"

const DisplayData = ({ data }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Name",
      dataIndex: "otherNames",
      key: "name",
      // width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      // width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      // width: "20%",
      ...getColumnSearchProps("gender"),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      // width: "20%",
      ...getColumnSearchProps("country"),
    },
    {
      title: "Address",
      dataIndex: "residentialAddress",
      key: "residentialAddress",
      // width: "20%",
      ...getColumnSearchProps("residentialAddress"),
      sorter: (a, b) => a.residentialAddress.length - b.residentialAddress.length,
      sortDirections: ["descend", "ascend"],
    },
  ];
  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <div class="card">
            <div class="card-header">
              <div class="card-title">
                User Other Details
              </div>
            </div>
            <div class="card-body">
              <img src={record.photo} />
              <div class="card-content">
                <div class="card-label">
                  LGA:
                </div>
                <div class="card-value">
                  {record.localGovernmentArea}
                </div>
                <div class="card-label">
                  Marital Status:
                </div>
                <div class="card-value">
                  {record.maritalStatus}
                </div>
                <div class="card-label">
                  Occupation:
                </div>
                <div class="card-value">
                  {record.occupation}
                </div>
                <div class="card-label">
                  Year of Travel:
                </div>
                <div class="card-value">
                 {record.yearOfTravel}
                </div>
              </div>
            </div>
            <button>Send Message</button>
          </div>
        ),
        rowExpandable: (record) => record.name !== 'Not Expandable',
      }}
      dataSource={data}
    />
  ); 
};

export default DisplayData;
