export function enumValues(object: {
  [key: string]: string;
  [key: number]: string;
}) {
  const keys = Object.keys(object).filter(k => typeof object[k] === 'number');

  return keys.map(k => object[k]);
}
