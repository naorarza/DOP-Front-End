import { FilterAlt, SearchOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Input, Select, Space, Table, Tag } from "antd";
import { useRef } from "react";
import { useState } from "react";
import "./userLists.css";
import EditDropDown from "./editDropDown";

export default function OrdersTableAnt({
  setOrdersAr,
  ordersAr,
  doApiOrders,
  fixedDate,
  numRole,
}) {
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
        {dataIndex !== "status" ? (
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
        ) : (
          <div style={{ padding: "8px" }}>
            <Select
              showSearch
              placeholder={`מיון לפי מצב משלוח`}
              optionFilterProp="children"
              onChange={(value) => setSelectedKeys(value ? [value] : [])}
              onSelect={(value) => {
                setSelectedKeys(value ? [value] : []);
                handleSearch(selectedKeys, confirm, dataIndex);
              }}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "ממתין לאישור",
                  label: "ממתין לאישור",
                },
                {
                  value: "נשלח",
                  label: "נשלח",
                },
                {
                  value: "התקבל",
                  label: "התקבל",
                },
              ]}
            />
          </div>
        )}
        <Space>
          {dataIndex !== "status" && (
            <Button
              variant="contained"
              color="success"
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              size="small"
              style={{
                width: 90,
              }}
            >
              חיפוש
            </Button>
          )}
          <Button
            variant="outlined"
            color="warning"
            onClick={() => {
              clearFilters && handleReset(clearFilters);
              handleSearch(selectedKeys, confirm, dataIndex);
            }}
            size="small"
            style={{
              width: 90,
            }}
          >
            איפוס חיפוש
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <>
        {dataIndex === "status" ? (
          <FilterAlt
            style={{
              color: filtered ? "#1890ff" : undefined,
            }}
          />
        ) : (
          <>
            <SearchOutlined
              style={{
                color: filtered ? "#1890ff" : undefined,
              }}
            />
          </>
        )}
      </>
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const ordersColumns = [
    {
      title: "שם",
      dataIndex: "name",
      className:'ps-3 pe-2',
      key: "name",
      ...getColumnSearchProps("name"),
      render: (name, _id) => (
        <>
          <Space key={_id} className="d-flex flex-wrap" size="middle">
            <p className="fs-6">{name}</p>
              <EditDropDown fixedDate={fixedDate} doApiOrders={doApiOrders} item={_id} setAr={setOrdersAr} />
          </Space>
        </>
      ),
    },
    {
      title: "תאריך הזמנה",
      dataIndex: "order_date",
      render: (order_date) => <p className="fs-6 p-0 m-0">{fixedDate(order_date)}</p>,
      className: "orderDate ps-3 pe-2",
      key: "order_date",
    },
    {
      title: "כתובת",
      className: "fs-7 ps-3 pe-2",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "מספר טלפון",
      className: "fs-6 orderDate ps-3 pe-2",
      dataIndex: "phone",
      key: "phone",
    },
    {
      ...getColumnSearchProps("status"),
      title: "סטטוס הזמנה",
      dataIndex: "status",
      className:'ps-3 pe-2',
      key: "status",
      // ...getColumnSearchProps('role'),
      render: (status) => {
        let color;
        if (status === "ממתין לאישור") {
          color = "red";
        } else if (status === "נשלח") {
          color = "skyblue";
        }
        if (status === "התקבל") {
          color = "yellowgreen";
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
  ];
  const data2 = ordersAr;

  return (
    <div className="col-md-10">
      <Table
        columns={ordersColumns}
        pagination={{
          position: ["bottomCenter"],
        }}
        dataSource={data2}
      />
    </div>
  );
}
