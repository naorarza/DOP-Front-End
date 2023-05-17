import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { MAIN_ROUTE, TOKEN_HEADER } from '../../../constant/urls';
import { doApiDelete } from '../../../services/apiServices';
import { toast } from 'react-toastify';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

export default function DeleteDialog({doApi,item}) {
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const doUserDelete = async (_idDel) => {
    const url = MAIN_ROUTE + "users/delete/" + _idDel;

      try {
        const data = await doApiDelete(url, TOKEN_HEADER);
        if (data.msg) return toast.error(data.msg);
        doApi();
        handleClose();
        toast.success("המשתמש נמחק!");
      } catch (err) {
        console.log(err);
        alert("קרתה תקלה, בבקשה חזור מאוחר יותר");
      }
    
  };

  return (
    <div>
      <Button onClick={handleClickOpen} color='inherit' variant='text'>
      <div className="d-flex justify-content-around w-100">
      <PersonRemoveIcon className='ms-2'/> 
      <p className='text-center'>
      מחיקה 
      </p>
      </div>
        </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><h3 className='text-info'>האם אתה בטוח שברצונך למחוק משתמש זה?<hr className='p-0 m-0 mt-1' /></h3></DialogTitle>
        <DialogContent>
          פעולה זו תמחק לצמיתות את המשתמש: {item.name}
        </DialogContent>
        <DialogActions className='d-flex justify-content-around'>
          <Button color='error' variant='outlined' onClick={handleClose}>ביטול</Button>
          <Button color='secondary' variant='contained' onClick={()=>{doUserDelete(item._id)}}>אישור</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}