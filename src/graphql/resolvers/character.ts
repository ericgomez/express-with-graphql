import { Db, ObjectId } from 'mongodb';
import { IResolvers } from '@graphql-tools/utils';
import { CHARACTERS_COLLECTION, GAMES_COLLECTION } from '../../mongo/collections.js';
import { ICharacter, ICreateCharacter, IEditCharacter, IGetCharacter } from '../../interfaces/ICharacter.js';

const character: IResolvers = {
  Query: {
    async getCharacter(_: void, { id }: IGetCharacter, ctx: Db) {
      const character = await ctx.collection(CHARACTERS_COLLECTION).findOne({ _id: new ObjectId(id) });
      if (character) {
        const { _id, ...rest } = character;
        return { id: _id, ...rest };
      } else {
        return null;
      }
    },
    async getCharacters(_: void, args: void, ctx: Db) {
      try {
        const characters = await ctx.collection(CHARACTERS_COLLECTION).find().toArray();
        return characters.map(({ _id, ...rest }) => ({ id: _id, ...rest }));
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    async createCharacter(_: void, { character }: ICreateCharacter, ctx: Db) {
      try {
        const regex = new RegExp(character.name, 'i');
        const exist = await ctx.collection(CHARACTERS_COLLECTION).findOne({ name: regex });
        if (exist) {
          throw new Error(`Character already exists`);
        }
        await ctx.collection(CHARACTERS_COLLECTION).insertOne(character);
        return 'Character added successfully';
      } catch (error: any) {
        return error.message;
      }
    },
    async editCharacter(_: void, { id, character }: IEditCharacter, ctx: Db) {
      try {
        const exist = await ctx.collection(CHARACTERS_COLLECTION).findOne({ _id: new ObjectId(id) });
        if (exist) {
          await ctx.collection(CHARACTERS_COLLECTION).updateOne({ _id: new ObjectId(id) }, { $set: character });
          return 'Character updated successfully';
        }

        throw new Error(`Character does not exist`);
      } catch (error: any) {
        return error.message;
      }
    },
  },
  Character: {
    async games(parent: ICharacter, args: void, ctx: Db) {
      const gameList = parent.games.map(async (gameId: string) => {
        const games = await ctx.collection(GAMES_COLLECTION).findOne({ _id: new ObjectId(gameId) });
        if (games) {
          const { _id, ...rest } = games;
          return { id: _id, ...rest };
        }
        return games;
      });

      return gameList;
    },
  },
};

export default character;
