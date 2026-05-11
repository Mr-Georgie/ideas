import React from "react";

export function Stamp({
  children,
  color = "var(--ink)",
  tilt = 0,
  count,
  active = false,
  onClick,
  size = "md",
}) {
  const padding =
    size === "sm" ? "3px 6px" : size === "lg" ? "6px 11px" : "4px 8px";
  const fontSize = size === "sm" ? 9 : size === "lg" ? 12 : 11;
  return (
    <button
      onClick={onClick}
      className="tap hover:animate-heartbeat"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 700,
        fontSize,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        padding,
        border: `1.5px solid ${color}`,
        borderRadius: 2,
        color: active ? "var(--paper)" : color,
        background: active ? color : "transparent",
        transform: `rotate(${tilt}deg)`,
        whiteSpace: "nowrap",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <span>{children}</span>
      {count !== undefined && (
        <span style={{ opacity: 0.7, fontWeight: 500 }}>{count}</span>
      )}
    </button>
  );
}
