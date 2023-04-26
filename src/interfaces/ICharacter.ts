export interface ICharacter {
  name: string;
  gender: Gender;
  race: Race;
  games: [string];
  image: string;
}

export interface ICreateCharacter {
  character: ICharacter;
}

export interface IEditCharacter {
  id: string | number;
  character: ICharacter;
}

export interface IGetCharacter {
  id: string | number;
}

enum Race {
  HYLIAN,
  GERUDO,
  FAIRY,
}

enum Gender {
  MALE,
  FEMALE,
}
