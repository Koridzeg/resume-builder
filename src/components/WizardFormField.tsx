import { Box, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

type TextFieldProps = {
    label: string,
    hint: string,
    placeholder: string,
    validate: (value: string) => boolean
}

const WizardFormField = ({ label, hint, placeholder, validate }: TextFieldProps) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setValue(newValue)
        setError(!validate(newValue))
    }

    return (
        <Box
            display='flex'
            flexDirection='column'
            gap='0.3rem'
            width="100%"

        >
            <Typography fontSize='18px' fontWeight='700'>{label}</Typography>
            <TextField
                placeholder={placeholder}
                error={error}
                sx={{ bgcolor: 'white', }}
                type='text'
                value={value}
                onChange={handleChange} />
            <Typography fontSize='12px' fontWeight='100'>{hint}</Typography>
        </Box>
    )
}

export default WizardFormField