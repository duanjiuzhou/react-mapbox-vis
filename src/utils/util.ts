
export const diff = (prevProps: object, props: object) => {
  const toMutate = {};
  Array.from(new Set([...Object.keys(prevProps), ...Object.keys(props)])).map(key => {
    if (prevProps[key] !== props[key]) {
      toMutate[key] = props[key];
    }
  });
  return toMutate;
};

export const assign = (obj: any, prop: any, value: any) => {
  if (typeof prop === "string")
    prop = prop.split(".");

  if (prop.length > 1) {
    var e = prop.shift();
    assign(obj[e] =
      Object.prototype.toString.call(obj[e]) === "[object Object]"
        ? obj[e]
        : {},
      prop,
      value);
  } else
    obj[prop[0]] = value;
}