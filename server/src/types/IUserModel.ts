interface DefaultModel {
  readonly id: number;
  readonly name: string;
  readonly lastname: string;
  readonly patronymic: string;
}

export interface IChildren extends DefaultModel {
  readonly age: string;
  readonly disability: boolean;
  readonly program_number: string;
}

export interface IUserModel extends DefaultModel {
  readonly email: string;
  readonly phone: string;
  readonly parents_children: IChildren[];
}
