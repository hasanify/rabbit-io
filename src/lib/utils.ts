import {clsx, type ClassValue} from "clsx";
import moment from "moment";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (timestamp: string, seconds?: boolean, twentyFour?: boolean) => {
  let format = "Do MMM YYYY, hh:mm";

  if (seconds) format += ":ss";

  if (twentyFour) format = format.replace("hh", "HH");
  else format += " A";

  return moment(timestamp).format(format);
};

export const relativeTime = (timestamp: string) => {
  return moment(timestamp).fromNow();
};

export const capitalizeProjects = (name: string) => {
  const strs = name.split("-");
  const result: string[] = [];
  strs.forEach(str => {
    const s = str.split("");
    let r = s[0].toUpperCase();
    s.splice(0, 1);
    r += s.join("");
    result.push(r);
  });

  return result.join("-");
};
