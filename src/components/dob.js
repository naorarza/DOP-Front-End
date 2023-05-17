import React from 'react'
import { DatePicker, Space } from 'antd';


export default function Dob({setDate}) {

    const onChange = (date, dateString) => {
        setDate(dateString)
    };

    return (
        <Space direction="vertical">
            <DatePicker size='small' onChange={onChange} />
        </Space>
    )
}
