import { useEffect, useState } from "react";

export function useNextText() {
  const [nextText, setNextText] = useState<string | null>(null);

  useEffect(() => {
    function getCurrentText() {
      const activeWordElement = document.querySelector("div.word.active");
      let nextText = null;
      if (activeWordElement) {
        const nextCharacterElements = activeWordElement.querySelectorAll(
          "letter:not([class])"
        );
        nextText =
          nextCharacterElements.length > 0
            ? [...nextCharacterElements.values()]
                .map((e) => e.textContent)
                .join("")
            : " ";
      }
      setNextText(nextText);
    }
    const interval = setInterval(getCurrentText, 100);
    return () => {
      clearInterval(interval);
    };
  });

  return nextText;
}
