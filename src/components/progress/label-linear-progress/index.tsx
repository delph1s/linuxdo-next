import LinearProgressRoot from '@components/progress/label-linear-progress/styles/root';
import { LinearProgressProps } from '@components/progress/label-linear-progress/types';
import Typography from '@components/typography/mui-typography';
import React from 'react';

function LinearProgress({
  variant = 'contained',
  color = 'info',
  value = 0,
  label = false,
  labelPosition = 'top',
  labelColor = undefined,
  labelText = undefined,
  ...restProps
}: LinearProgressProps) {
  return (
    <>
      {label && labelPosition === 'top' && (
        <Typography variant="button" fontWeight="medium" color={labelColor || 'text'}>
          {labelText || `${value}%`}
        </Typography>
      )}
      <LinearProgressRoot {...restProps} variant="determinate" value={value} ownerState={{ color, value, variant }} />
    </>
  );
}

export default LinearProgress;
