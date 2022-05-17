import * as bcrypt from 'bcrypt';

export async function encrypt(pass: string) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(pass, salt);
}

export async function compare(pass: string, hash: string) {
  return await bcrypt.compare(pass, hash);
}
