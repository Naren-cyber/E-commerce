import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const ONE_SEC_IN_MS = 1000;
const ONE_MIN_IN_MS = ONE_SEC_IN_MS * 60;
const ONE_HOUR_IN_MS = ONE_MIN_IN_MS * 60;
const ONE_DAY_IN_MS = ONE_HOUR_IN_MS * 24;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (value: number | string) =>
  Intl.NumberFormat().format(Number(value));

export const formatPrice = (value: number | string, currency = "INR") =>
  Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
  }).format(Number(value));

export const getTimeDifference = (
  expiry: Date | string,
  currentTime = new Date()
) => {
  expiry = new Date(expiry);
  let diff = +expiry - +currentTime;
  const days = Math.floor(diff / ONE_DAY_IN_MS);
  diff = diff - days * ONE_DAY_IN_MS;
  const hours = Math.floor(diff / ONE_HOUR_IN_MS);
  diff = diff - hours * ONE_HOUR_IN_MS;
  const mins = Math.floor(diff / ONE_MIN_IN_MS);
  diff = diff - mins * ONE_MIN_IN_MS;
  const secs = Math.floor(diff / ONE_SEC_IN_MS);
  return { days, hours, mins, secs };
};
