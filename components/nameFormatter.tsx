export const checkBatchimEnding = (word: any) => {
  if (typeof word !== "string") return null;
  const lastLetter = word[word.length - 1];
  const uni = lastLetter.charCodeAt(0);
  if (uni < 44032 || uni > 55203) return null;
  return (uni - 44032) % 28 !== 0;
};
export const addSuffix = (petName: any) => {
  if (checkBatchimEnding(petName)) {
    return petName + "이";
  }
  return petName;
};
export const setNameFormat = (label: string, josa: string) => {
  const strGA = 44032; //가
  const strHI = 55203; //힣
  const josaArray: Array<string> = josa.split("/");
  const lastStrCode = label.charCodeAt(label.length - 1);
  let prop = true;
  let msg: string;
  if (lastStrCode < strGA || lastStrCode > strHI) {
    return false; //한글이 아님
  }
  if ((lastStrCode - strGA) % 28 == 0) prop = false;
  if (prop) {
    msg = label + josaArray[0];
  } else {
    msg = label + josaArray[1];
  }
  return msg;
};
