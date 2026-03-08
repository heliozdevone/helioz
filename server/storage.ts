export type SessionData = {
  userId: string;
  email: string;
};

const sessions = new Map<string, SessionData>();

export function setSession(key: string, data: SessionData) {
  sessions.set(key, data);
}

export function getSession(key: string) {
  return sessions.get(key);
}

export function deleteSession(key: string) {
  sessions.delete(key);
}
