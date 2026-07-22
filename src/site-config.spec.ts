import { monkeytypeSiteConfig } from "./site-config";

function render(html: string) {
  document.body.innerHTML = html;
}

const readNextText = () => monkeytypeSiteConfig.readNextText();

describe("monkeytype readNextText", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("returns null when no word is active", () => {
    render('<div class="word"><letter>a</letter></div>');
    expect(readNextText()).toBeNull();
  });

  it("reads the letters still left in the active word", () => {
    render(
      '<div class="word active"><letter class="correct">t</letter><letter>h</letter><letter>e</letter></div>',
    );
    expect(readNextText()).toBe("he");
  });

  it("reads the whole word before anything is typed", () => {
    render(
      '<div class="word active"><letter>t</letter><letter>h</letter><letter>e</letter></div>',
    );
    expect(readNextText()).toBe("the");
  });

  it("falls back to a space once the active word is fully typed", () => {
    render(
      '<div class="word active"><letter class="correct">t</letter><letter class="correct">o</letter></div>',
    );
    expect(readNextText()).toBe(" ");
  });

  it("treats an incorrect letter as already typed", () => {
    render(
      '<div class="word active"><letter class="incorrect">x</letter><letter>b</letter></div>',
    );
    expect(readNextText()).toBe("b");
  });

  it("ignores letters belonging to other words", () => {
    render(
      '<div class="word"><letter>o</letter></div>' +
        '<div class="word active"><letter>n</letter></div>' +
        '<div class="word"><letter>p</letter></div>',
    );
    expect(readNextText()).toBe("n");
  });
});
