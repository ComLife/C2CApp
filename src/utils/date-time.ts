import { format } from 'date-fns';

export const formatHHmmss = (date: Date | string | number) => {
  return format(date, 'HH:mm:ss');
};

export const formatYYYYMMDD = (date: Date | string | number) => {
  return format(date, 'YYYY-MM-DD');
};
