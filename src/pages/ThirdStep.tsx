import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import line from '../images/line.png'
import back from '../images/back.png'
import React, { useState, useEffect } from "react";
import WizardFormField from "../components/WizardFormField";
import Resume from "../components/Resume";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { json } from "stream/consumers";

type ThirdStepProps = {
    handleBackStep: () => void;
    handleNextStep: () => void
}

interface Degree {
    id: number;
    title: string;
}

const ThirdStep: React.FC<ThirdStepProps> = ({ handleBackStep, handleNextStep }) => {
    const [degrees, setDegrees] = useState<Degree[]>([])
    const [selectedDegree, setSelectedDegree] = useState<number | null>(null)
    const [formCount, setFormCount] = useState(1)
    const [educationError, setEducationError] = useState<boolean>(false)
    const [educationDate, setEducationDate] = useState<number | null>(null)

    const handleEducationValidation = (value: string): boolean => {
        return value.length >= 2
    }

    useEffect(() => {
        localStorage.setItem("educationDate", JSON.stringify(educationDate));
    },[educationDate])

    useEffect(() => {
        fetch('https://resume.redberryinternship.ge/api/degrees')
            .then((response) => response.json())
            .then((data) => setDegrees(data))
    }, [])



    const handleChange = (event: SelectChangeEvent<number>) => {
        const value = event.target.value as number;
        setSelectedDegree(value)
    };


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
                        <Typography sx={{ fontWeight: '700', fontSize: '24px' }}>გამოცდილება</Typography>
                        <img src={line} alt="line" style={{ width: '90%', paddingTop: '1em' }} />
                    </Box>
                </Box>
                {Array.from({ length: formCount }, (_, index) => (
                    <React.Fragment key={index} >
                        <Box display='flex' width='89%' paddingTop='1em' paddingLeft='7.5em'>
                            <WizardFormField onError={(error) => setEducationError(error)} placeholder='სასწავლებელი' label='სასწავლებელი' hint='მინიმუმ 2 სიმბოლო' validate={handleEducationValidation} />
                        </Box>
                        <Box display='flex' flexDirection='row' gap='4em' paddingTop='1.5em' paddingLeft='7.5em'>
                            <Box display='flex' flexDirection='column' width='40%' gap='1em'>
                                <Typography sx={{ fontSize: '18px', fontWeight: '700' }}>ხარისხი</Typography>
                                <FormControl fullWidth>
                                    <InputLabel id='select-label'></InputLabel>
                                    <Select
                                        labelId="degree-select-label"
                                        sx={{ bgcolor: 'white' }}
                                        id="degree-select"

                                        value={selectedDegree || ""}
                                        onChange={handleChange}>
                                        {degrees.map((degree) => (
                                            <MenuItem key={degree.id} value={degree.id}>
                                                {degree.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box display='flex' flexDirection='column' width='40%' gap='1em'>
                                <Typography sx={{ fontSize: '18px', fontWeight: '700' }}>დამთავრების რიცხვი</Typography>
                                <DesktopDatePicker value={educationDate} onChange={(newValue) => {
                                    setEducationDate(newValue)
                                }}
                                renderInput={(params) => <TextField sx={{ bgcolor: 'white' }} {...params} />}
                                >
                                    
                                </DesktopDatePicker>
                            </Box>

                        </Box>
                    </React.Fragment>
                ))}
            </Box>
            <Resume></Resume>
        </Box>
    )
}


export default ThirdStep