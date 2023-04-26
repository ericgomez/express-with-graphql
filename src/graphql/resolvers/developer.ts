import { Db } from 'mongodb';
import { IResolvers } from '@graphql-tools/utils';
import { DEVELOPERS_COLLECTION } from '../../mongo/collections.js';
import { ICreateDeveloper } from '../../interfaces/IDeveloper.js';

const developer: IResolvers = {
  Query: {
    async getDevelopers(_: void, args: void, ctx: Db) {
      try {
        const developers = await ctx.collection(DEVELOPERS_COLLECTION).find().toArray();
        return developers.map(({ _id, ...rest }) => ({ id: _id, ...rest }));
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    async createDeveloper(_: void, { developer }: ICreateDeveloper, ctx: Db) {
      await ctx.collection(DEVELOPERS_COLLECTION).insertOne(developer);
      return 'Developer added successfully';
    },
  },
};

export default developer;
