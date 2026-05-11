import React from 'react';

export function Tape({ left, right, top = -8, color = 'rgba(245,197,24,0.6)', w = 64, h = 18, tilt = -3 }) {
  return (
    <div
      className="tape"
      style={{
        left,
        right,
        top,
        width: w,
        height: h,
        background: color,
        transform: `rotate(${tilt}deg)`,
      }}
    />
  );
}
