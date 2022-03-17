export const countWordsAlgo = (
  str: string,
  wordsMap: Record<string, number> | null = null
) => {
  if (str.length === 0) return {};
  let output: Record<string, number> = wordsMap || {};

  let wordsArr = str.replaceAll("\n", " ").split(" ");
  for (let i = 0; i < wordsArr.length; i++) {
    let word = wordsArr[i].toLowerCase().replaceAll(/^[\W_]+|[\W_]+$/g, "");
    if (output[word] === undefined) {
      output[word] = 1;
    } else {
      output[word] += 1;
    }
  }

  delete output[""];
  return output;
};

export const maxCountOfWords = (
  wordsMap: Record<string, number>,
  count: number
) =>
  Object.entries(wordsMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map((item) => ({
      word: item[0],
      count: item[1],
    }));
