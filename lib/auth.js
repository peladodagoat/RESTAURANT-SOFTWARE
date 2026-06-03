import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-change-in-production');

export async function signToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(secret);
}

export async function verifyToken(token) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}

export function getTokenFromRequest(request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) return authHeader.slice(7);
  const cookie = request.cookies?.get?.('admin_token')?.value;
  return cookie || null;
}

export async function requireAdmin(request) {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  try {
    const payload = await verifyToken(token);
    if (payload.role !== 'admin') return null;
    return payload;
  } catch {
    return null;
  }
}
