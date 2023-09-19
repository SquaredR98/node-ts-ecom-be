import { IAuthDocument } from './Interfaces';
import { AuthModel } from './Model';

export class AuthRepository {
  private authModel = AuthModel;

  public async findUserByEmailOrUsername(username: string, email: string): Promise<IAuthDocument> {
    return (await this.authModel.findOne({ $or: [{ username }, { email }] })) as IAuthDocument;
  }

  public async createUser(data: IAuthDocument): Promise<IAuthDocument> {
    return await this.authModel.create(data);
  }
}
