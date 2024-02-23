export function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export function objectToArray(object: object) {
  return Object.entries(object).map(([id, value]) => ({
    ...(value as object),
    id: id,
  }));
}
