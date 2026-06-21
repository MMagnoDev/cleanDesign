export const COOKIE_NAME = 'clean_admin';
const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 horas

async function getKey(): Promise<CryptoKey> {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET não configurado');
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

function hexToBytes(hex: string): Uint8Array {
  const pairs = hex.match(/.{2}/g) ?? [];
  return new Uint8Array(pairs.map(h => parseInt(h, 16)));
}

function bytesToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Cria token de sessão assinado com expiração de 8h */
export async function createSessionToken(): Promise<string> {
  const expiry = (Date.now() + SESSION_DURATION).toString();
  const key = await getKey();
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(expiry));
  return `${expiry}.${bytesToHex(sig)}`;
}

/** Verifica token de sessão — retorna true se válido e não expirado */
export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!process.env.SESSION_SECRET || !token) return false;
  try {
    const lastDot = token.lastIndexOf('.');
    if (lastDot === -1) return false;
    const payload = token.slice(0, lastDot);
    const sig = token.slice(lastDot + 1);
    if (Date.now() > parseInt(payload)) return false;
    const key = await getKey();
    const sigBytes = hexToBytes(sig);
    return crypto.subtle.verify(
      'HMAC', key, sigBytes.buffer as ArrayBuffer, new TextEncoder().encode(payload)
    );
  } catch {
    return false;
  }
}
