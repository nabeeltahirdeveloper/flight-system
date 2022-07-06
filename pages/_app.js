import '../styles/globals.css'
import Box from '@mui/material/Box';
import Head from 'next/head'
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react'
import styles from './style.module.css'



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
function MyApp({ Component, pageProps }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [audio, setAudio] = useState(null)
  useEffect(() => {
    const audioVar = new Audio('/emergencyCall.mp3')
    setAudio(audioVar)
    let loyaltyData = localStorage.getItem('loyaltyData')
    if (loyaltyData) {
      console.log("loyaltyData", loyaltyData)
      loyaltyData = JSON.parse(loyaltyData)
    }
    else {
      loyaltyData = 100
      localStorage.setItem('loyaltyData', JSON.stringify(loyaltyData))
    }
  }, [])

  return (
    <>
      <center>

        <button className={styles.emergencyButton} onClick={() => {
          audio.play();
          audio.onended = () => {
            setOpen(true)
          }
        }}>
          Emergency Call
        </button>
      </center>
      <Component {...pageProps} />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Tell us What's your Emergency
          </Typography>

          <input type="text" name="text" className={styles.input} placeholder="Type here!"></input>
          <Button className={styles.submitButton} onClick={handleClose}>Submit</Button>
        </Box>
      </Modal>
    </>
  )
}

export default MyApp
