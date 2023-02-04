import { Box, IconButton, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import back from "../images/back.png"
import line from "../images/line.png"
import WizardFormField from '../components/WizardFormField'


export const FirstStep: React.FC = () => {
    const navigate = useNavigate();

    const handleNameValidation = (value: string) => {
        const onlyGeorgian = /^[ა-ჰ]+$/g;
        return value.length >= 2 && new RegExp(onlyGeorgian).test(value);

    }

    return (
        <Box display='flex' height='100vh' width='100%' >
            <Box display='flex' bgcolor='#F9F9F9' height="100%" width="55%" flexDirection='column'>
                <Box display='flex' gap="3em" flexDirection='row' padding='2em'>
                    <IconButton style={{ height: '40px', width: '40px', }} onClick={() => {
                        navigate('/')
                    }}>
                        <img src={back} alt='circle' />
                    </IconButton>
                    <Box display='flex' flexDirection='column'>
                        <Typography sx={{ fontWeight: '700', fontSize: '24px' }}>პირადი ინფო</Typography>
                        <img src={line} alt="line" style={{ width: '90%', paddingTop: '1em' }} />
                    </Box>
                </Box>
                <Box display='flex' paddingLeft='7.5em' gap="4em">
                    <Box width="40%">
                        <WizardFormField placeholder='ანზორ' label="სახელი" hint="მინიმუმ 2 ასო,ქართული ასოები" validate={handleNameValidation} />
                    </Box>
                    <Box width="40%">
                        <WizardFormField placeholder='მუმლაძე' label="გვარი" hint="მინიმუმ 2 ასო,ქართული ასოები" validate={handleNameValidation} />
                    </Box>
                </Box>

            </Box>

        </Box>
    )
}

export const SecondStep: React.FC = () => {
    return (
        <h1>Second Step</h1>
    )
}

export const ThirdStep: React.FC = () => {
    return (
        <h1>Third Step</h1>
    )
}


const WizardForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();

    const renderStep = (step: number) => {
        switch (step) {
            case 1:
                return <FirstStep />
            case 2:
                return <SecondStep />
            case 3:
                return <ThirdStep />
            default:
                return null
        }
    }

    const handleNextStep = () => {
        if (currentStep === 3) {
            navigate("/")
        } else {
            setCurrentStep(currentStep + 1);
        }
    }

    return (
        <div>
            {renderStep(currentStep)}
            <Button onClick={handleNextStep}>Next Step</Button>
        </div>
    )
}

export default WizardForm
