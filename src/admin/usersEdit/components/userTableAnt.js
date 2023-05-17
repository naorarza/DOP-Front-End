import { FilterAlt, SearchOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Input, Select, Space, Table, Tag } from "antd";
import { useRef } from "react";
import { useState } from "react";
import "./userLists.css";
import EditDropDown from "./editDropDown";

export default function UserTableAnt({ doApi, ar, setAr, fixedDate, numRole }) {
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
        {dataIndex !== "role" ? (
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
              placeholder={`מיון לפי תפקיד`}
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
                  value: "user",
                  label: "User",
                },
                {
                  value: "admin",
                  label: "Admin",
                },
                {
                  value: "owner",
                  label: "Owner",
                },
              ]}
            />
          </div>
        )}
        <Space>
          {dataIndex !== "role" && (
            <Button
              variant="contained"
              color="success"
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
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
        {dataIndex === "role" ? (
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

  const columns = [
    {
      title: "שם",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      className: "pe-2 col-2 ps-3",
      render: (name, _id) => (
        <>
          <Space key={_id} className="d-flex flex-wrap" size="middle">
            <p className="">{name}</p>
            {numRole > 2 && _id.role !== "owner" && (
              <EditDropDown doApi={doApi} item={_id} setAr={setAr} />
            )}{" "}
            {numRole === 2 && _id.role === "user" && (
              <EditDropDown doApi={doApi} item={_id} setAr={setAr} />
            )}
          </Space>
        </>
      ),
    },
    {
      title: "תאריך לידה",
      dataIndex: "dob",
      render: (dob) => <p>{fixedDate(dob)}</p>,
      key: "dob",
      className: "pe-2 dissapear col-2 ps-3",
    },
    {
      title: "כתובת",
      className: " pe-2 col-2 ps-3",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "טלפון",
      className: "pe-2 col-2 ps-3",
      render: (phone) => <p>{numberWithCommas(phone)}</p>,
      dataIndex: "phone",
      key: "phone",
    },
    {
      ...getColumnSearchProps("role"),
      title: "תפקיד",
      key: "roles",
      dataIndex: "role",
      className: "pe-2 col-2 ps-3",

      // ...getColumnSearchProps('role'),
      render: (role) => {
        let color;
        if (role === "user") {
          color = "blue";
        } else if (role === "owner") {
          color = "red";
        } else if (role === "admin") {
          color = "black";
        }
        return (
          <Tag color={color} key={role}>
            {role.toUpperCase()}
          </Tag>
        );
      },
    },
  ];
  const data = ar;
  const numberWithCommas = (number) => {
    const str = number.toString();
    return `${str.slice(0, 3)}-${str.slice(3)}`;
  };
  return (
    <div>
      <Table
        columns={columns}
        pagination={{
          position: ["bottomCenter"],
        }}
        dataSource={data}
      />
    </div>
  );
}
