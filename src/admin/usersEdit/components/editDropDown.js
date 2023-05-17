import { Button } from '@mui/material';
import { Dropdown, Space } from 'antd';
import DeleteDialog from './deleteDialog';
import EditDialog from './editDialog';
import UserOrdersDialog from './userOrdersDialog';

export default function EditDropDown({doApi,item}) {
    
    const items = [
        {
          key: '1',
          label: (
            <UserOrdersDialog doApi={doApi} item={item}/>
          ),
        },
        {
          key: '2',
          label: (
            <EditDialog doApi={doApi} item={item}/>

          ),
        },
        {
          key: '3',
          label: (
            <DeleteDialog doApi={doApi} item={item}/>
          ),
        },
      ];


    return(
  <Space direction="vertical">
    <Space wrap>
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomRight"
      >
        <p style={{cursor:'pointer'}} className='text-info fs-6'> פעולות &darr;</p>
      </Dropdown>
    </Space>
  </Space>
);
}