import { Box, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import errorImage from '../images/error.png'

type TextFieldProps = {
    label: string,
    hint: string,
    placeholder: string,
    validate: (value: string) => boolean,
    onError: (error: boolean) => void,
}

const WizardFormField = ({ label, hint, placeholder, validate, onError }: TextFieldProps) => {
    const [value, setValue] = useState(localStorage.getItem(label) || '')
    const [error, setError] = useState<undefined | boolean>(undefined)

    

    useEffect(() => {
        localStorage.setItem(label, value)
    }, [label, value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setValue(newValue)
        if(newValue.length < 0){
            setError(undefined)
        } else {
            setError(!validate(newValue))
            onError(!validate(newValue))
        }
    }

    return (
        <Box
            display='flex'
            flexDirection='column'
            gap='0.3rem'
            width="100%"

        >
            <Typography fontSize='18px' sx={{ color: error ? '#E52F2F' : '#000000' }} fontWeight='700'>{label}</Typography>
            <Box display='flex' flexDirection='row' width='100%'>
                <TextField
                    placeholder={placeholder}
                    sx={{
                        bgcolor: 'white',
                        border: error === undefined ? '1px solid #000000' : error ? '1px solid #EF5050' : '1px solid #98E37E',
                        borderRadius: '5px',
                        width: '100%'
                    }}
                    type='text'
                    value={value}
                    onChange={handleChange} />
                {error && <img src={errorImage} alt='error' style={{ width: '20px', height: '20px', margin: 'auto' }} />}
            </Box>
            <Typography fontSize='14px' color='#2E2E2E' fontWeight='100'>{hint}</Typography>
        </Box>
    )
}
export default WizardFormField