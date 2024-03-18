import { ButtonProps } from '@components/button/mui-button/types';
import { PandoraButtonPosition } from '@components/button/pandora-button/types';
import React, { useRef, useState } from 'react';

import { StyledPandoraButton } from './styles';

type PandoraButtonProps = ButtonProps & {
  openPandora?: boolean;
  pandoraButtonPosition?: PandoraButtonPosition;
};

function PandoraButton({ openPandora = false, pandoraButtonPosition = 'right', ...restProps }: PandoraButtonProps) {
  const visibleTimeout = useRef<NodeJS.Timeout>();
  const [visible, setVisible] = useState(false);

  // 鼠标悬停和离开事件处理
  const handleMouseEnter = () => {
    clearTimeout(visibleTimeout.current);
    setVisible(true);
  };
  const handleMouseLeave = () => {
    visibleTimeout.current = setTimeout(() => setVisible(false), 1500); // 1.5 秒后消失
  };

  return (
    <StyledPandoraButton
      variant="contained"
      color="primary"
      openPandora={openPandora}
      buttonPosition={pandoraButtonPosition}
      buttonVisible={visible}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...restProps}
    >
      {openPandora ? '关闭助手' : '打开助手'}
    </StyledPandoraButton>
  );
}

export type * from './types';
export default PandoraButton;
