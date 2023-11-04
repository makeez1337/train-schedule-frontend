import { axiosService } from './axiosService';
import { ICredentials } from '../interfaces/credentials';
import { IJwtTokens } from '../interfaces/jwtTokens';
import { IUser } from '../interfaces/user';

export const authService = {
  signIn: (credentials: ICredentials): Promise<IJwtTokens & IUser> =>
    axiosService.post('/auth/sign-in', credentials).then((res) => res.data),
  signUp: (credentials: ICredentials): Promise<void> =>
    axiosService.post('auth/sign-up', credentials).then((res) => res.data),
  signOut: (refresh_token: string): Promise<void> =>
    axiosService
      .delete('auth/sign-out', { data: { refresh_token } })
      .then((res) => res.data),
};
