import { diff } from 'deep-object-diff';

const isDiff = (left: Record<string, any>, right: Record<string, any>) => {
  const diffObject = diff(left, right);
  const objectLength = Object.values(diffObject).length;
  return objectLength > 0;
};

export { isDiff };
