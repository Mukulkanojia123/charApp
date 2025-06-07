import React from 'react'
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

const ConfirmDeleteDialog = ({open, handleClose, deleteHandler}) => {
  return <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Confirm Delete</DialogTitle>
    <DialogContent>
        <DialogContentText>Are you sure want to delete this group?</DialogContentText>
    </DialogContent>
    <DialogContent>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={deleteHandler} color='error'>Yes</Button>
    </DialogContent>
  </Dialog>
}

export default ConfirmDeleteDialog