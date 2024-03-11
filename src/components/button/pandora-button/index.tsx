import Button, { ButtonProps } from '@mui/material/Button';
import React from 'react';

type PandoraButtonProps = ButtonProps & {
  changeMe?: 'changeMe';
};

function PandoraButton({ changeMe = 'changeMe', ...restProps }: PandoraButtonProps) {
  return <Button variant="contained" {...restProps}>打开插件</Button>;
}

export default PandoraButton;
