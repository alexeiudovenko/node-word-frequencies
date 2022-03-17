import { countWordsAlgo } from "../utils/wordsAlgorithm";

describe("countWords", () => {
  it("counting words", async () => {
    const mapWords = countWordsAlgo("one two three one one two two three");

    expect(mapWords).toEqual({
      one: 3,
      two: 3,
      three: 2,
    });
  });

  it("words, which are ending or starting with non-symbol character", async () => {
    const mapWords = countWordsAlgo(
      "Test1 test2- test3-test4 hello! ,hey, shou'd ,heey. hello!"
    );

    expect(mapWords).toEqual({
      test1: 1,
      test2: 1,
      "test3-test4": 1,
      hello: 2,
      hey: 1,
      "shou'd": 1,
      heey: 1,
    });
  });

  it("words, which are ending or starting with line break characters", async () => {
    const mapWords = countWordsAlgo("\nword1\n\n some word1 and word2\n\n");

    expect(mapWords).toEqual({
      and: 1,
      some: 1,
      word1: 2,
      word2: 1,
    });
  });
});
