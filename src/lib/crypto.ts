import bcrypt from 'bcryptjs';

/** @deprecated salt é embutido no hash bcrypt — mantido apenas para compatibilidade de assinatura */
export function generateSalt(): string {
  return '';
}

/** Gera hash bcrypt com cost factor 12 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

/** Verifica senha contra hash bcrypt. O parâmetro `salt` é ignorado (embutido no hash). */
export async function verifyPassword(
  password: string,
  _salt: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
