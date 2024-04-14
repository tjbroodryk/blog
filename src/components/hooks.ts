import { useMemo, useState } from "react";
import { useKeyPressEvent } from "react-use";

export const useRoveFocus = (size: number) => {
  const [currentFocus, setCurrentFocus] = useState(0);

  useKeyPressEvent("ArrowDown", (e) => {
    setCurrentFocus(currentFocus === size ? 0 : currentFocus + 1)
    e.preventDefault()
  }
  );
  useKeyPressEvent("ArrowUp", (e) => {
    setCurrentFocus(currentFocus === 0 ? size : currentFocus - 1)
    e.preventDefault()
  }
  );

  const setFocus = (index: number) => {
    if (index >= 0 && index <= size) {
      setCurrentFocus(index);
    }
  }

  return useMemo(
    () => [currentFocus, setFocus] as const,
    [currentFocus]
  );
};
