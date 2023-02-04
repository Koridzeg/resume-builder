import { Box, IconButton, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import back from "../images/back.png"
import line from "../images/line.png"
import WizardFormField from '../components/WizardFormField'


export const FirstStep: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const navigate = useNavigate();


    const handleFileUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.click();

        input.onchange = (event: Event) => {
            if (event.target) {
                const target = event.target as HTMLInputElement;
                if (target.files) {
                    setFile(target.files[0]);
                }
            }
        };

        console.log(file)
    };


    const handleNameValidation = (value: string) => {
        const onlyGeorgian = /^[ა-ჰ]+$/g;
        return value.length >= 2 && new RegExp(onlyGeorgian).test(value);

    }

    const handleEmailValidation = (value: string) => {
        const mailformat = /^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return value.endsWith('@redberry.ge') && new RegExp(mailformat).test(value)
    }

    const handlePhoneValidation = (value: string) => {
        const formatPhoneNumber = (number: any) =>
            Number(number?.replaceAll("+", "").replaceAll(" ", ""));
        const formatedNumber = formatPhoneNumber(value)


        return value.startsWith('+995') && String(formatedNumber).length === 12
    }

    return (
        <Box display='flex' height='100vh' width='100%' >
            <Box display='flex' paddingLeft='1.5em' gap="1.5em" bgcolor='#F9F9F9' height="100%" width="55%" flexDirection='column'>
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
                <Box display='flex' gap="1.5em" paddingTop='1em' paddingLeft='7.5em'>
                    <Typography fontWeight='700' fontSize='20px'>პირადი ფოტოს ატვირთვა</Typography>
                    <Button variant="contained" onClick={handleFileUpload} color='secondary' sx={{ width: '107px', fontSize: '16px', fontWeight: '400' }}>ატვირთვა</Button>
                </Box>
                <Box display='flex' flexDirection='column' gap='0.4em' paddingTop='1.2em' paddingLeft='7.5em'>
                    <Typography fontWeight='700' fontSize='20px'>ჩემ შესახებ (არასავალდებულო)</Typography>
                    <Box>
                        <TextField multiline placeholder="ზოგადი ინფო შენ შესახებ" rows={4} sx={{ bgcolor: 'white', width: "87%" }} />
                    </Box>
                </Box>
                <Box display='flex' width='89%' paddingTop='1em' paddingLeft='7.5em'>
                    <WizardFormField placeholder='anzorr666@redberry.ge' label='ელ.ფოსტა' hint='უნდა მთავრდებოდეს @redberry.ge-ით' validate={handleEmailValidation} />
                </Box>
                <Box display='flex' width='89%' paddingTop='1em' paddingLeft='7.5em'>
                    <WizardFormField placeholder='+995 551 12 34 56' label='მობილურის ნომერი' hint='უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს' validate={handlePhoneValidation} />
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
