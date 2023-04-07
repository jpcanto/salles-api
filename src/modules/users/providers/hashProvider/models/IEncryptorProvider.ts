export interface IEncryptorProvider {
  encrypt(data: string): string;
  decrypt(data: string): string;
}
