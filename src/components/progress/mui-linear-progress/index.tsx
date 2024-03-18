import LinearProgressRoot from '@components/progress/mui-linear-progress/styles/root';
import { LinearProgressProps } from '@components/progress/mui-linear-progress/types';
import Typography from '@components/typography/mui-typography';
import React from 'react';

function LinearProgress({
  variant = 'contained',
  color = 'info',
  value = 0,
  label = false,
  labelColor = undefined,
  labelText = undefined,
  ...restProps
}: LinearProgressProps) {
  return (
    <>
      {label && (
        <Typography variant="button" fontWeight="medium" color={labelColor || 'text'}>
          {labelText || `${value}%`}
        </Typography>
      )}
      <LinearProgressRoot {...restProps} variant="determinate" value={value} ownerState={{ color, value, variant }} />
    </>
  );
}

export default LinearProgress;
