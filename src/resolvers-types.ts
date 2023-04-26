import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Character = {
  __typename?: 'Character';
  games?: Maybe<Array<Maybe<Game>>>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  race?: Maybe<Race>;
};

export type Country = {
  __typename?: 'Country';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  people?: Maybe<Array<Maybe<Person>>>;
};

export type Developer = {
  __typename?: 'Developer';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type EditCharacterInput = {
  games?: InputMaybe<Array<Scalars['String']>>;
  gender?: InputMaybe<Gender>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
};

export type Female = GeneralData & {
  __typename?: 'Female';
  address?: Maybe<Scalars['String']>;
  countries?: Maybe<Array<Maybe<Country>>>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type Game = {
  __typename?: 'Game';
  cover?: Maybe<Scalars['String']>;
  developers?: Maybe<Array<Maybe<Developer>>>;
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE'
}

export type GeneralData = {
  address?: Maybe<Scalars['String']>;
  countries?: Maybe<Array<Maybe<Country>>>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type Male = GeneralData & {
  __typename?: 'Male';
  address?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
  countries?: Maybe<Array<Maybe<Country>>>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCharacter: Scalars['String'];
  createDeveloper: Scalars['String'];
  createGame: Scalars['String'];
  editCharacter: Scalars['String'];
};


export type MutationCreateCharacterArgs = {
  character: NewCharacterInput;
};


export type MutationCreateDeveloperArgs = {
  developer: NewDeveloperInput;
};


export type MutationCreateGameArgs = {
  game: NewGameInput;
};


export type MutationEditCharacterArgs = {
  character: EditCharacterInput;
  id: Scalars['ID'];
};

export type NewCharacterInput = {
  games: Array<Scalars['String']>;
  gender: Gender;
  image: Scalars['String'];
  name: Scalars['String'];
  race: Race;
};

export type NewDeveloperInput = {
  name: Scalars['String'];
};

export type NewGameInput = {
  cover: Scalars['String'];
  developers?: InputMaybe<Array<Scalars['String']>>;
  title: Scalars['String'];
};

export type Person = Female | Male;

export type Query = {
  __typename?: 'Query';
  getCharacter?: Maybe<Character>;
  getCharacters?: Maybe<Array<Maybe<Character>>>;
  getDevelopers?: Maybe<Array<Maybe<Developer>>>;
  getGames?: Maybe<Array<Maybe<Game>>>;
  getPerson?: Maybe<Person>;
};


export type QueryGetCharacterArgs = {
  id: Scalars['ID'];
};


export type QueryGetPersonArgs = {
  id: Scalars['ID'];
};

export enum Race {
  Fairy = 'FAIRY',
  Gerudo = 'GERUDO',
  Hylian = 'HYLIAN'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes = {
  Person: ( Female ) | ( Male );
};

/** Mapping of union parent types */
export type ResolversUnionParentTypes = {
  Person: ( Female ) | ( Male );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Character: ResolverTypeWrapper<Character>;
  Country: ResolverTypeWrapper<Omit<Country, 'people'> & { people?: Maybe<Array<Maybe<ResolversTypes['Person']>>> }>;
  Developer: ResolverTypeWrapper<Developer>;
  EditCharacterInput: EditCharacterInput;
  Female: ResolverTypeWrapper<Female>;
  Game: ResolverTypeWrapper<Game>;
  Gender: Gender;
  GeneralData: ResolversTypes['Female'] | ResolversTypes['Male'];
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Male: ResolverTypeWrapper<Male>;
  Mutation: ResolverTypeWrapper<{}>;
  NewCharacterInput: NewCharacterInput;
  NewDeveloperInput: NewDeveloperInput;
  NewGameInput: NewGameInput;
  Person: ResolverTypeWrapper<ResolversUnionTypes['Person']>;
  Query: ResolverTypeWrapper<{}>;
  Race: Race;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Character: Character;
  Country: Omit<Country, 'people'> & { people?: Maybe<Array<Maybe<ResolversParentTypes['Person']>>> };
  Developer: Developer;
  EditCharacterInput: EditCharacterInput;
  Female: Female;
  Game: Game;
  GeneralData: ResolversParentTypes['Female'] | ResolversParentTypes['Male'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Male: Male;
  Mutation: {};
  NewCharacterInput: NewCharacterInput;
  NewDeveloperInput: NewDeveloperInput;
  NewGameInput: NewGameInput;
  Person: ResolversUnionParentTypes['Person'];
  Query: {};
  String: Scalars['String'];
};

export type CharacterResolvers<ContextType = any, ParentType extends ResolversParentTypes['Character'] = ResolversParentTypes['Character']> = {
  games?: Resolver<Maybe<Array<Maybe<ResolversTypes['Game']>>>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  race?: Resolver<Maybe<ResolversTypes['Race']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  people?: Resolver<Maybe<Array<Maybe<ResolversTypes['Person']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeveloperResolvers<ContextType = any, ParentType extends ResolversParentTypes['Developer'] = ResolversParentTypes['Developer']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FemaleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Female'] = ResolversParentTypes['Female']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countries?: Resolver<Maybe<Array<Maybe<ResolversTypes['Country']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GameResolvers<ContextType = any, ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']> = {
  cover?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  developers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Developer']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeneralDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeneralData'] = ResolversParentTypes['GeneralData']> = {
  __resolveType: TypeResolveFn<'Female' | 'Male', ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countries?: Resolver<Maybe<Array<Maybe<ResolversTypes['Country']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type MaleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Male'] = ResolversParentTypes['Male']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  age?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  countries?: Resolver<Maybe<Array<Maybe<ResolversTypes['Country']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCharacter?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationCreateCharacterArgs, 'character'>>;
  createDeveloper?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationCreateDeveloperArgs, 'developer'>>;
  createGame?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationCreateGameArgs, 'game'>>;
  editCharacter?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationEditCharacterArgs, 'character' | 'id'>>;
};

export type PersonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Person'] = ResolversParentTypes['Person']> = {
  __resolveType: TypeResolveFn<'Female' | 'Male', ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getCharacter?: Resolver<Maybe<ResolversTypes['Character']>, ParentType, ContextType, RequireFields<QueryGetCharacterArgs, 'id'>>;
  getCharacters?: Resolver<Maybe<Array<Maybe<ResolversTypes['Character']>>>, ParentType, ContextType>;
  getDevelopers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Developer']>>>, ParentType, ContextType>;
  getGames?: Resolver<Maybe<Array<Maybe<ResolversTypes['Game']>>>, ParentType, ContextType>;
  getPerson?: Resolver<Maybe<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<QueryGetPersonArgs, 'id'>>;
};

export type Resolvers<ContextType = any> = {
  Character?: CharacterResolvers<ContextType>;
  Country?: CountryResolvers<ContextType>;
  Developer?: DeveloperResolvers<ContextType>;
  Female?: FemaleResolvers<ContextType>;
  Game?: GameResolvers<ContextType>;
  GeneralData?: GeneralDataResolvers<ContextType>;
  Male?: MaleResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Person?: PersonResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

