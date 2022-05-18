import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto'

export async function encrypt(pass: string) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(pass, salt);
}

export async function compare(pass: string, hash: string) {
  return await bcrypt.compare(pass, hash);
}

export async function generateToken() {
  return crypto.randomBytes(64).toString('hex')
}
