import React from "react";

export function PostIt({
  children,
  color = "var(--mustard)",
  tilt = -2,
  style = {},
  w = "auto",
}) {
  return (
    <div
      className="hover:animate-wiggle transition-transform duration-300"
      style={{
        background: color,
        padding: "10px 12px",
        boxShadow: "2px 3px 0 rgba(0,0,0,0.18), 1px 2px 5px rgba(0,0,0,0.08)",
        transform: `rotate(${tilt}deg)`,
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 13,
        lineHeight: 1.3,
        width: w,
        color: "var(--ink)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
