export default function generatePassword(length: number): string {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomChar = Math.floor(Math.random() * charset.length);
    password += charset[randomChar];
  }
  return password;
}
