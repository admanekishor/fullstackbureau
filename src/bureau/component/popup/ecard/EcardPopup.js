import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import EcardForm from './EcardForm';

export default function EcardPopup({ showPopup, setShowPopup }) {
    // const handleClickOpen = () => {
    //     setShowPopup(true);
    // };

    const handleClose = () => {
        setShowPopup(false);
    };
    return (
        <React.Fragment>
           
            <Dialog
                maxWidth="xs"
                open={showPopup}
                onClose={handleClose}>
                <DialogContent>
                    <DialogContentText textAlign="center" sx={{ mb: 2, fontWeight: 700, color: '#810050' }}>
                        Download E-Card By Following Details:
                    </DialogContentText>
                    <EcardForm setShowPopup={setShowPopup} />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
