import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseJwt(token: string) {
  try {
    // Split the token into parts and base64 decode the payload
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    // Parse the payload as JSON
    return JSON.parse(payload);
  } catch (error) {
    console.error("Error parsing JWT", error);
    return null;
  }
}

interface creds {
  username: string;
  password: string;
}

export function setCookieWithExpiry(
  cookieName: string,
  cookieValue: creds,
  expiryMinutes: number
) {
  const date = new Date();
  date.setTime(date.getTime() + expiryMinutes * 60 * 1000);
  const expires = ";expires=" + date.toUTCString();
  const cookieValueStr = JSON.stringify(cookieValue);
  document.cookie =
    cookieName +
    "=" +
    encodeURIComponent(cookieValueStr) +
    expires +
    ";path=/;Secure;SameSite=Strict";
}

export function getCookie(cookieName: string) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function clearCookie(cookieName: string) {
  document.cookie =
    cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;";
}
