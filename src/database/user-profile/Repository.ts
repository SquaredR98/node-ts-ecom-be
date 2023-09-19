import { UserProfileModel } from "@user-profile-db/Model";
import { IUserDocument } from "./Interfaces";
import mongoose from "mongoose";


export class UserProfileRepository {
  private model = UserProfileModel

  public async getUserByAuthId(userId: string): Promise<IUserDocument> {
    const users: IUserDocument[] = await this.model.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) }
      },
      {
        $lookup: {
          from: 'Auth',
          localField: 'authId',
          foreignField: '_id',
          as: 'auth'
        }
      }, {
        $unwind: '$auth'
      }, {
        $project: this.aggregateProject()
      }
    ])

    return users[0];
  }

  private aggregateProject() {
    return {
      _id: 1,
      username: '$auth.username',
      uId: '$auth.uId',
      email: '$auth.email',
      avatarColor: '$auth.avatarColor',
      createdAt: '$auth.createdAt',
      work: 1,
      school: 1,
      location: 1,
      notifications: 1,
      social: 1,
      bgImageVersion: 1,
      bgImageId: 1,
      profilePicture: 1
    };
  }
}