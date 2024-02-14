import {clsx, type ClassValue} from 'clsx';
import moment from 'moment';
import {twMerge} from 'tailwind-merge';
import {IsoDateString} from '../types/pocketbase-types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (timestamp: IsoDateString, seconds?: boolean, twentyFour?: boolean) => {
  let format = 'Do MMM YYYY, h:mm';
  format += seconds ? ':ss' : '';
  format += twentyFour ? '' : ' a';

  return moment(timestamp).format(format);
};
