import { SiteConfig } from "cc-extension-core";

/**
 * Monkeytype marks the word being typed with `.word.active`, and strips the
 * class off each `<letter>` as it is consumed — so the letters that still
 * carry no class are exactly what the user has left to type.
 *
 * An active word with nothing left means the next keystroke is the space
 * between words.
 */
function readNextText(): string | null {
  const activeWordElement = document.querySelector("div.word.active");
  if (!activeWordElement) {
    return null;
  }
  const nextCharacterElements =
    activeWordElement.querySelectorAll("letter:not([class])");
  return nextCharacterElements.length > 0
    ? [...nextCharacterElements.values()].map((e) => e.textContent).join("")
    : " ";
}

export const monkeytypeSiteConfig: SiteConfig = {
  id: "monkeytype",
  siteName: "Monkeytype",
  readNextText,
};
