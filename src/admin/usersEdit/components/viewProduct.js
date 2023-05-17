import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function ViewProduct({product}) {
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Button onClick={handleClickOpen} color='info' variant='outlined'>
              צפה במוצר
        </Button>
      <Dialog  open={open} onClose={handleClose}>
        <DialogTitle className='text-center text-warning'><div className="display-6 className='text-center text-warning'">צפייה ב- {product.product_name}</div><hr /></DialogTitle>
        <DialogContent className='d-flex flex-column text-center justify-content-center'>
            <p>שם המוצר: {product.product_name}</p>
            <div className='d-flex justify-content-center mb-2'>
            <img className='rounded-2' src={product.img_url} alt={product.product_name} width={'150px'} height={'150px'} />
            </div>
            <p>מחיר מוצר: {product.product_price}₪</p>
            <p>כמות שהוזמנה מהמוצר: {product.amount_product}</p>
            <p>מידע אודות המוצר: {product.info}</p>
        </DialogContent>
        <DialogActions className='d-flex justify-content-around'>
          <Button color='error' variant='outlined' onClick={handleClose}>יציאה</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}