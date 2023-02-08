import { Box, IconButton, TextField, Typography } from '@mui/material'
import Button from "@mui/material/Button"
import WizardFormField from "../components/WizardFormField"
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import back from "../images/back.png"
import line from "../images/line.png"
import Resume from '../components/Resume'
 const FirstStep: React.FC<{ handleNextStep: () => void }> = ({ handleNextStep }) => {
    const [nameError, setNameError] = useState<boolean>(false)
    const [emailError, setEmailError] = useState<boolean>(false)
    const [numberError, setNumberError] = useState<boolean>(false)
    const [surnameError, setSurnameError] = useState<boolean>(false)
    const [aboutUs, setAboutUs] = useState(localStorage.getItem('aboutUs') || '')

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
                    localStorage.setItem("file", JSON.stringify(target.files[0]));
                }
            }
        };


    };

    const handleNameValidation = (value: string): boolean => {
        const onlyGeorgian = /^[ა-ჰ]+$/g;
        return value.length >= 2 && new RegExp(onlyGeorgian).test(value);

    }

    const handleEmailValidation = (value: string): boolean => {
        const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return value.endsWith('@redberry.ge') && new RegExp(mailformat).test(value)
    }

    const handlePhoneValidation = (value: string): boolean => {
        const formatPhoneNumber = (number: any) =>
            Number(number?.replaceAll("+", "").replaceAll(" ", ""));
        const formatedNumber = formatPhoneNumber(value)


        return value.startsWith('+995') && String(formatedNumber).length === 12
    }

    const handleAboutUsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAboutUs(e.target.value)
    }

    useEffect(() => {
        localStorage.setItem('aboutUs', aboutUs)
    }, [aboutUs])

    return (
        <Box display='flex' height='100vh' width='100%' flexDirection='row' >
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
                        <WizardFormField onError={(error) => setNameError(error)} placeholder='ანზორ' label="სახელი" hint="მინიმუმ 2 ასო,ქართული ასოები" validate={handleNameValidation} />
                    </Box>
                    <Box width="40%">
                        <WizardFormField onError={(error) => setSurnameError(error)} placeholder='მუმლაძე' label="გვარი" hint="მინიმუმ 2 ასო,ქართული ასოები" validate={handleNameValidation} />
                    </Box>
                </Box>
                <Box display='flex' gap="1.5em" paddingTop='1em' paddingLeft='7.5em'>
                    <Typography fontWeight='700' fontSize='20px'>პირადი ფოტოს ატვირთვა</Typography>
                    <Button variant="contained" onClick={handleFileUpload} color='secondary' sx={{ width: '107px', fontSize: '16px', fontWeight: '400' }}>ატვირთვა</Button>
                </Box>
                <Box display='flex' flexDirection='column' gap='0.4em' paddingTop='1.2em' paddingLeft='7.5em'>
                    <Typography fontWeight='700' fontSize='20px'>ჩემ შესახებ (არასავალდებულო)</Typography>
                    <Box>
                        <TextField value={aboutUs} onChange={handleAboutUsChange} multiline placeholder="ზოგადი ინფო შენ შესახებ" rows={4} sx={{ bgcolor: 'white', width: "87%" }} />
                    </Box>
                </Box>
                <Box display='flex' width='89%' paddingTop='1em' paddingLeft='7.5em'>
                    <WizardFormField onError={(error) => setEmailError(error)} placeholder='anzorr666@redberry.ge' label='ელ.ფოსტა' hint='უნდა მთავრდებოდეს @redberry.ge-ით' validate={handleEmailValidation} />
                </Box>
                <Box display='flex' width='89%' paddingTop='1em' paddingLeft='7.5em'>
                    <WizardFormField onError={(error) => setNumberError(error)} placeholder='+995 551 12 34 56' label='მობილურის ნომერი' hint='უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს' validate={handlePhoneValidation} />
                </Box>
                <Box display='flex' justifyContent='flex-end' width='89%' paddingTop='4em'>
                    <Button sx={{ bgcolor: '#6B40E3', width: '151px', height: '48px', borderRadius: '4px', color: 'white', fontSize: '18px' }} onClick={() => {
                        if (!nameError && !surnameError && !emailError && !numberError) {
                            handleNextStep()
                        } else {
                            return null
                        }
                    }} >შემდეგი</Button>
                </Box>
            </Box>

            <Resume></Resume>


        </Box>
    )
}


export default FirstStep