import { IResolvers } from '@graphql-tools/utils';
import { Db, ObjectId } from 'mongodb';
import { DEVELOPERS_COLLECTION, GAMES_COLLECTION } from '../../mongo/collections.js';
import { ICreateGame, IGame } from '../../interfaces/IGame.js';

const game: IResolvers = {
  Query: {
    async getGames(_: void, args: void, ctx: Db) {
      try {
        const games = await ctx.collection(GAMES_COLLECTION).find().toArray();
        return games.map(({ _id, ...rest }) => ({ id: _id, ...rest }));
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    async createGame(_: void, { game }: ICreateGame, ctx: Db) {
      try {
        await ctx.collection(GAMES_COLLECTION).insertOne(game);
        return 'Game added successfully';
      } catch (error) {
        console.log(error);
      }
    },
  },
  Game: {
    async developers(parent: IGame, args: void, ctx: Db) {
      const devList = parent.developers.map(async (id: string) => {
        const developer = await ctx.collection(DEVELOPERS_COLLECTION).findOne({ _id: new ObjectId(id) });
        if (developer) {
          const { _id, ...rest } = developer;
          return { id: _id, ...rest };
        }
        return developer;
      });
      return devList;
    },
  },
};

export default game;
