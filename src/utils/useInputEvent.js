import { useState, useRef } from "react";

export default function useInputEvent() {
  const [inputOnFocus, setInputOnFocus] = useState(false);

  const onFocusHandler = () => {
    setInputOnFocus((inputOnFocus) => !inputOnFocus);
  };

  const ref = useRef(null);

  const handleClick = () => {
    ref.current.focus();
  };

  return { inputOnFocus, onFocusHandler, ref, handleClick };
}
