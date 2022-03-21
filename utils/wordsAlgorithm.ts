export const countWordsAlgo = (str: string) => {
  if (str.length === 0) return {};
  let output: Record<string, number> = {};

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
  wordsMaps: Record<string, number>[],
  count: number
) => {
  const resultMap: Record<string, number> = {};

  wordsMaps.forEach((map) => {
    Object.keys(map).forEach((key) => {
      if (resultMap[key]) {
        resultMap[key] += map[key];
        return;
      }
      resultMap[key] = map[key];
    });
  });

  return Object.entries(resultMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map((item) => ({
      word: item[0],
      count: item[1],
    }));
};
