import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getServiceHref(slug: string) {
  return `/services/${slug}`;
}
