'use client';

const SESSION_ID_KEY = 'psych101_session_id';

export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') {
    // Server-side: generate a temporary ID
    return `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  let sessionId = localStorage.getItem(SESSION_ID_KEY);

  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }

  return sessionId;
}
