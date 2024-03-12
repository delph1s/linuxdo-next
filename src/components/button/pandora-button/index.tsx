import { PandoraButtonPosition } from '@components/button/pandora-button/types';
import Button, { ButtonProps } from '@mui/material/Button';
import React from 'react';

import { StyledPandoraButton } from './styles';

type PandoraButtonProps = ButtonProps & {
  openPandora?: boolean;
  pandoraButtonPosition?: PandoraButtonPosition;
};

function PandoraButton({ openPandora = false, pandoraButtonPosition = 'right', ...restProps }: PandoraButtonProps) {
  return (
    <StyledPandoraButton variant="contained" openPandora={openPandora} buttonPosition={pandoraButtonPosition} {...restProps}>
      {openPandora ? '关闭助手' : '打开助手'}
    </StyledPandoraButton>
  );
}

export default PandoraButton;
