import TypographyRoot from '@components/typography/mui-typography/styles/root';
import type { TypographyProps } from '@components/typography/mui-typography/types';
import React from 'react';

function Typography({
  color = 'dark',
  fontWeight = 'regular',
  textTransform = 'none',
  verticalAlign = 'unset',
  textGradient = false,
  opacity = 1,
  children,
  ...restProps
}: TypographyProps) {
  return (
    <TypographyRoot
      {...restProps}
      ownerState={{
        color,
        textTransform,
        verticalAlign,
        fontWeight,
        opacity,
        textGradient,
      }}
    >
      {children}
    </TypographyRoot>
  );
}
export default Typography;
