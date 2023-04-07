import { container } from 'tsyringe';
import Argon2HashProvider from '@modules/users/providers/hashProvider/implements/Argon2HashProvider';
import { IArgon2HashProvider } from '@modules/users/providers/hashProvider/models/IArgon2HashProvider';
import { IEncryptorProvider } from './hashProvider/models/IEncryptorProvider';
import EncryptorProvider from './hashProvider/implements/EncryptorProvider';

container.registerSingleton<IArgon2HashProvider>(
  'Argon2HashProvider',
  Argon2HashProvider
);

container.registerSingleton<IEncryptorProvider>(
  'EncryptorProvider',
  EncryptorProvider
);
