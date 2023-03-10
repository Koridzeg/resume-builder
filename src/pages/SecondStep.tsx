import { Box, IconButton, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import React, { useEffect, useState } from 'react'
import back from "../images/back.png"
import line from "../images/line.png"
import WizardFormField from '../components/WizardFormField'
import Resume from '../components/Resume'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import smallLine from '../images/smallline.png'


type SecondStepProps = {
    handleBackStep: () => void;
    handleNextStep: () => void
}

const SecondStep: React.FC<SecondStepProps> = ({ handleBackStep, handleNextStep }) => {
    const [formCount, setFormCount] = useState(1)
    const [positionError, setPositonError] = useState<boolean>(false)
    const [employerError, setEmployerError] = useState<boolean>(false)
    const [startingDateValue, setstartingDateValue] = useState(JSON.parse(localStorage.getItem('startingDateValue') || ''))
    const [endingDateValue, setEndingDateValue] = useState(JSON.parse(localStorage.getItem('endingDateValue') || ''))
    const [description, setDescription] = useState(localStorage.getItem('description') || '')

    const handlePositionValidation = (value: string): boolean => {
        return value.length >= 2

    }

    const handleAddForm = () => {
        setFormCount(formCount + 1)
    }

    const handleEmployerValidation = (value: string): boolean => {
        return value.length >= 2
    }

    const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }

    useEffect(() => {
        localStorage.setItem("startingDateValue", JSON.stringify(startingDateValue));
        localStorage.setItem("endingDateValue", JSON.stringify(endingDateValue));
        localStorage.setItem("description", description);
    }, [startingDateValue, endingDateValue, description]);


    return (
        <Box display='flex' width='100%' flexDirection='row'>
            <Box display='flex' paddingLeft='1.5em' gap="1em" bgcolor='#F9F9F9' width="55%" flexDirection='column'>
                <Box display='flex' gap="3em" flexDirection='row' padding='2em'>
                    <IconButton style={{ height: '40px', width: '40px', }} onClick={() => {
                        handleBackStep()
                    }}>
                        <img src={back} alt='circle' />
                    </IconButton>
                    <Box display='flex' flexDirection='column'>
                        <Typography sx={{ fontWeight: '700', fontSize: '24px' }}>?????????????????????????????????</Typography>
                        <img src={line} alt="line" style={{ width: '90%', paddingTop: '1em' }} />
                    </Box>
                </Box>
                {Array.from({ length: formCount }, (_, index) => (
                    <React.Fragment key={index} >
                        <Box  display='flex' width='89%' paddingTop='1em' paddingLeft='7.5em'>
                            <WizardFormField onError={(error) => setPositonError(error)} placeholder='??????????????????????????????, ???????????????????????????, ???.???.' label='?????????????????????????????????' hint='????????????????????? 2 ?????????????????????' validate={handlePositionValidation} />
                        </Box>
                        <Box display='flex' width='89%' paddingTop='1em' paddingLeft='7.5em'>
                            <WizardFormField onError={(error) => setEmployerError(error)} placeholder='????????????????????????????????????' label='????????????????????????????????????' hint='????????????????????? 2 ?????????????????????' validate={handleEmployerValidation} />
                        </Box>
                        <Box display='flex' flexDirection='row' gap='4em' paddingTop='1.5em' paddingLeft='7.5em'>
                            <Box display='flex' flexDirection='column' width='40%' gap='1em'>
                                <Typography sx={{ fontSize: '18px', fontWeight: '700' }}>???????????????????????? ??????????????????</Typography>
                                <DesktopDatePicker value={startingDateValue} onChange={(newValue) => {
                                    setstartingDateValue(newValue)
                                }}
                                    renderInput={(params) => <TextField sx={{ bgcolor: 'white' }} {...params} />}
                                ></DesktopDatePicker>
                            </Box>
                            <Box display='flex' flexDirection='column' width='40%' gap='1em'>
                                <Typography sx={{ fontSize: '18px', fontWeight: '700' }}>????????????????????????????????? ??????????????????</Typography>
                                <DesktopDatePicker value={endingDateValue} onChange={(newValue) => {
                                    setEndingDateValue(newValue)
                                }}
                                    renderInput={(params) => <TextField sx={{ bgcolor: 'white' }} {...params} />}
                                ></DesktopDatePicker>
                            </Box>

                        </Box>
                        <Box display='flex' flexDirection='column' gap='0.4em' paddingTop='1.2em' paddingLeft='7.5em'>
                            <Typography fontWeight='700' fontSize='20px'>??????????????????</Typography>
                            <Box>
                                <TextField value={description} onChange={handleDescription} multiline placeholder="???????????? ??????????????????????????????????????? ?????? ?????????????????? ??????????????????" rows={4} sx={{ bgcolor: 'white', width: "87%" }} />
                            </Box>
                        </Box>
                    </React.Fragment>
                ))}
                <Box display='flex' flexDirection='column' gap='3em' paddingTop='1.2em' paddingLeft='7.5em'>
                    <img src={smallLine} alt="" style={{ width: '87%' }} />
                    <Button onClick={handleAddForm} sx={{ width: '289px', bgcolor: '#62A1EB', color: 'white', height: '50px', borderRadius: '5px', fontSize: '16px' }}>???????????? ???????????????????????????????????? ????????????????????????</Button>
                </Box>
                <Box display='flex' paddingLeft='7.5em' width='88%' flexDirection='row' justifyContent='space-between' paddingTop='4em'>
                    <Button sx={{ bgcolor: '#6B40E3', width: '113px', height: '48px', borderRadius: '4px', color: 'white', fontSize: '18px', fontWeight: '500' }}>????????????</Button>
                    <Button onClick={() => {
                        handleNextStep();
                    }} sx={{ bgcolor: '#6B40E3', width: '151px', height: '48px', borderRadius: '4px', color: 'white', fontSize: '18px', fontWeight: '500' }}>?????????????????????</Button>
                </Box>
            </Box>
            <Resume></Resume>
        </Box>
    )
}

export default SecondStep