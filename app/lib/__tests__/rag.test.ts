import { splitText } from "../rag";

describe("splitText", () => {
  it("empty strings results in an empty list", () => {
    const chunks = splitText(
      "",
      10,
      2,
    );

    expect(chunks).toEqual(['']);
  });
});
