/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import AddCardIcon from '@mui/icons-material/AddCard';



import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcCallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import styles from "./style.module.css";
import phoneCall from '../phone-call'
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

    const [openApp, setOpenApp] = React.useState(false);
    const [callOpen, setCallOpen] = React.useState(false);
    const handleOpenApp = () => setOpenApp(true);
    const handleCloseApp = () => setOpenApp(false);
    const handleCallClose = () => setCallOpen(false);
    const [ballance, setBallance] = useState(0);
    const [loyaltyCoin, setLoyaltyCoin] = useState(0);
    const [playApp, setPlayApp] = useState(false)
    const [buttonApp, setButtonApp] = useState(false)
    const [audioApp, setAudioApp] = useState(null)



    useEffect(() => {
        const audioVar = new Audio("./phoneCall.mp3")
        setAudioApp(audioVar)


    }, [])
    let playAudio = () => {
        console.log("play")
        audio.play()
        audio.onended = () => {
            setPlayApp(false)
            setButtonApp(false)
            handleOpen();
            console.log("ended")
        }
    }
    useEffect(() => {
        let loyaltyData = localStorage.getItem('loyaltyData')
        if (loyaltyData) {
            console.log("loyaltyData", loyaltyData)
            loyaltyData = parseInt(JSON.parse(loyaltyData))
            setLoyaltyCoin(loyaltyData)
        }
    }, [loyaltyCoin])


    useEffect(() => {
        const audioVar = new Audio("./call.mp3")
        setAudio(audioVar)


    }, [])
    let playAudioApp = () => {
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

                {buttonApp ?
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
                {!buttonApp ?

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
            <div className={styles.mainDiv}>

                <Button
                    onClick={handleOpen}
                    className={styles.cardButton}
                >
                    add card
                    <AddCardIcon />
                </Button>
                <p className={styles.inputGroupText}>
                    Cost per call, $10 or 10 Loyalty Points
                </p>
                <p className={styles.balance}>
                    your current balance is:{ballance}
                </p>
                <p className={styles.balance}>
                    your current Loyalty Points :{loyaltyCoin}
                </p>
                <div className={styles.inputGroup}>
                    <input type="number" className={styles.numberInput} placeholder="+920000000000" />
                    <button className={styles.buttonCall} onClick={
                        () => {
                            if (ballance >= 10) {
                                setBallance(ballance - 10)
                                audioApp.play()
                                audioApp.onended = () => {
                                    setCallOpen(true)
                                }
                            }
                            else {
                                alert("you don't have enough money")
                            }
                        }
                    } >
                        Call by Card
                    </button>
                    <div>
                        <button className={styles.buttonCallLoyalty} onClick={
                            () => {
                                if (loyaltyCoin >= 10) {
                                    let loyaltyCoinData = loyaltyCoin - 10
                                    setLoyaltyCoin(loyaltyCoinData)
                                    localStorage.setItem("loyaltyData", loyaltyCoinData)
                                    audioApp.play()
                                    audioApp.onended = () => {
                                        setCallOpen(true)
                                    }

                                }
                                else {
                                    alert("you don't have enough money")
                                }
                            }
                        } >
                            Call by Loyalty Program
                        </button>
                    </div>
                </div>
                <Modal
                    open={openApp}
                    onClose={handleCloseApp}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Please Add your Credit Card
                        </Typography>

                        <input type="text" name="text" className={styles.cardNumberInput} placeholder="Type your card number!"></input>
                        <input type="date" name="text" className={styles.dateInput} ></input>
                        <input type="text" name="text" className={styles.cvInput} placeholder="Type your CSV!"></input>
                        <Button className={styles.submitButton} onClick={() => {
                            setBallance(100)
                            handleCloseApp()
                        }}>Submit</Button>
                    </Box>
                </Modal>
                <Modal
                    open={callOpen}
                    onClose={handleCallClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Thanks for calling
                        </Typography>
                    </Box>
                </Modal>
            </div >
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
