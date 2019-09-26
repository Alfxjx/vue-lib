export function isMobile(): boolean {
  const mobileRegex = /iPhone|Android/g;
  if (mobileRegex.test(navigator.userAgent)) {
    return true;
  } else {
    return false;
  }
}
