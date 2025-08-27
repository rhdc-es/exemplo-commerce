'use client';

import { forwardRef, useState } from 'react';
import {
  TextField,
  IconButton,
  InputAdornment,
  type TextFieldProps,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Evita sobrescrever 'type' vindo de fora
type PasswordFieldProps = Omit<TextFieldProps, 'type' | 'ref'>;

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField({ InputProps, ...props }, ref) {
    const [show, setShow] = useState(false);

    return (
      <TextField
        {...props}
        type={show ? 'text' : 'password'}
        inputRef={ref} // <-- RHF precisa disso
        InputProps={{
          // mantém qualquer coisa que vier do pai (adornos, ícones, etc.)
          ...InputProps,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="button" // não dispara submit
                onClick={() => setShow((s) => !s)}
                edge="end"
                aria-label="alternar visibilidade da senha"
              >
                {show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }
);

export default PasswordField;
