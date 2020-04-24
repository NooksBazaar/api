export function enumValues(object: {
  [key: string]: string;
  [key: number]: string;
}) {
  const keys = Object.keys(object).filter(k => typeof object[k] === 'string');

  return keys.map(k => object[k]);
}
