import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material';
import { useEffect } from 'react';

function CommentPopup({ openPopup, handleSubmit, handleClose }) {
    const [comment, setComment] = useState('');

    return (
        <div>
            <Dialog open={openPopup} onClose={handleClose}>
                <DialogTitle>Enter your comment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please add your comment below and click Submit to save.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Comment"
                        type="text"
                        fullWidth
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={(e) => { handleClose(); handleSubmit(comment) }} color="primary" variant="contained">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CommentPopup;
