import styles from "./style.module.css";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import AddCardIcon from '@mui/icons-material/AddCard';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react'


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
const index = () => {
    const [open, setOpen] = React.useState(false);
    const [callOpen, setCallOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCallClose = () => setCallOpen(false);
    const [ballance, setBallance] = useState(0);
    const [loyaltyCoin, setLoyaltyCoin] = useState(0);
    const [play, setPlay] = useState(false)
    const [button, setButton] = useState(false)
    const [audio, setAudio] = useState(null)



    useEffect(() => {
        const audioVar = new Audio("./phoneCall.mp3")
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
    useEffect(() => {
        let loyaltyData = localStorage.getItem('loyaltyData')
        if (loyaltyData) {
            console.log("loyaltyData", loyaltyData)
            loyaltyData = parseInt(JSON.parse(loyaltyData))
            setLoyaltyCoin(loyaltyData)
        }
    }, [loyaltyCoin])

    return (
        <div className={styles.mainDiv}>

            <Button
                onClick={handleOpen}
                className={styles.cardButton}
            >
                add card
                <AddCardIcon />
            </Button>

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
                            audio.play()
                            audio.onended = () => {
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
                                audio.play()
                                audio.onended = () => {
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
                open={open}
                onClose={handleClose}
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
                        handleClose()
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
    )
}

export default index