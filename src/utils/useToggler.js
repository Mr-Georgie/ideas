import { useState } from "react";

export default function useToggler() {
  const [on, setOn] = useState(false);

  const toggler = () => {
    setOn((on) => !on);
  };

  return { on, toggler };
}
