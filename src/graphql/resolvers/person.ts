import { Db, ObjectId } from 'mongodb';
import { COUNTRIES_COLLECTION, PEOPLE_COLLECTION } from '../../mongo/collections.js';
import { Resolvers } from '../../resolvers-types.js';

const person: Resolvers = {
  Query: {
    async getPerson(_, { id }: any, ctx) {
      const person = await ctx.collection(PEOPLE_COLLECTION).findOne({ _id: new ObjectId(id) });
      if (person) {
        const { _id, ...rest } = person;
        return { id: _id, ...rest };
      } else {
        return null;
      }
    },
  },
  Person: {
    __resolveType(obj: any) {
      return obj.age ? 'Male' : 'Female';
    },
  },
  Male: {
    async countries(parent: any, _, ctx: Db) {
      const countries = parent.countries.map(async (countryId: any) => {
        const country = await ctx.collection(COUNTRIES_COLLECTION).findOne({ _id: new ObjectId(countryId) });
        if (country) {
          const { _id, ...rest } = country;
          return { id: _id, ...rest };
        }
        return country;
      });
      return countries;
    },
  },
  Country: {
    async people(parent: any, _, ctx: Db) {
      const people = parent.countries.map(async (characterId: any) => {
        const person = await ctx.collection(PEOPLE_COLLECTION).findOne({ _id: new ObjectId(characterId) });
        if (person) {
          const { _id, ...rest } = person;
          return { id: _id, ...rest };
        }
        return person;
      });
      return people;
    },
  },
};

export default person;
