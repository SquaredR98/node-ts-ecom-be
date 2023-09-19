import { IAuthDocument } from "../../database/auth/Interfaces";
import { AuthRepository } from "../../database/auth/Repository";


export class AuthService {
  constructor(private readonly authRepo: AuthRepository) {}

  public async checkIfUserExists (username: string, email: string): Promise<IAuthDocument> {
    return await this.authRepo.findUserByEmailOrUsername(username, email);
  }

  public async createUser(data: IAuthDocument): Promise<IAuthDocument> {
    return await this.authRepo.createUser(data);
  }
}

export const authService: AuthService = new AuthService(new AuthRepository());