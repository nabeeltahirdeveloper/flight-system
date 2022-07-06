/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcCallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import styles from "./style.module.css";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [play, setPlay] = useState(false)
    const [button, setButton] = useState(false)
    const [audio, setAudio] = useState(null)



    useEffect(() => {
        const audioVar = new Audio("./call.mp3")
        setAudio(audioVar)


    }, [])
    let playAudio = () => {
        console.log("play")
        audio.play()
        audio.onended = () => {
            setPlay(false)
            setButton(false)
            handleOpen();
            console.log("ended")
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.subMain}  >
                <h1 className={styles.heading}>Call Flight Attendent</h1>

                {button ?
                    <div className={styles.loading}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    :
                    <button className={styles.button} onClick={() => {
                        playAudio()
                        setButton(true)
                    }}>
                        <AddIcCallIcon className={styles.icon} />

                        <span className={styles.buttonText}>Call</span>
                    </button>}
                {!button ?

                    "" :
                    <button className={styles.endCallBtn} onClick={() => {
                        setPlay(false)
                        setButton(false)
                        audio.pause()
                    }}>
                        <CallEndIcon className={styles.icon} />

                        <span className={styles.buttonText}>End</span>
                    </button>
                }
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Thanks for Calling
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Tell us how can we assist you?
                    </Typography>
                    <Button onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </div>
    );
}
