import { GraphQLSchema } from 'graphql';
import { mergeSchemas } from '@graphql-tools/schema';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { mergeResolvers } from '@graphql-tools/merge';
import { loadFiles } from '@graphql-tools/load-files';

// Carga el esquema desde los archivos SDL
const rootSchema = await loadSchema('./**/schemas/*.graphql', {
  loaders: [new GraphQLFileLoader()],
});

// Carga el resolver desde los archivos TS
const resolversArray = await loadFiles('./**/resolvers/*.js');
const resolvers = mergeResolvers(resolversArray);

// Crea el esquema ejecutable
export const executableSchema: GraphQLSchema = mergeSchemas({
  schemas: [rootSchema],
  resolvers,
});
