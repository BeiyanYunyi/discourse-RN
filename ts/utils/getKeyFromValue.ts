// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getKeyFromValue = (obj: Record<string, any>, value: any) => {
  return Object.keys(obj).find((key) => obj[key] === value);
};

export default getKeyFromValue;
