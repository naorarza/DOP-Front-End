import { Dropdown, Space } from 'antd';
import DeleteDialog from './deleteDialog';
import EditDialog from './editDialog';
import OrderDataDialog from './orderDataDialog';

export default function EditDropDown({fixedDate,doApiOrders,item}) {
    
    const items = [
        {
          key: '1',
          label: (
            <EditDialog doApi={doApiOrders} item={item}/>

          ),
        },
        {
          key: '2',
          label: (
            <OrderDataDialog fixedDate={fixedDate} item={item}/>
          ),
        },
        {
          key: '3',
          label: (
            <DeleteDialog doApi={doApiOrders} item={item}/>
          ),
        }
        
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