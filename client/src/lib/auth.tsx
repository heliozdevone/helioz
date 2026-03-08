export function getSessionKey() {
  return window.localStorage.getItem('helioz_session');
}

export function setSessionKey(key: string) {
  window.localStorage.setItem('helioz_session', key);
}
