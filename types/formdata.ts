interface IFormData {
  username: string;
  password: string;
  isLoading: boolean;
  name: string;
  surname: string;
}

export type ISignInData = Omit<IFormData, 'name' | 'surname'>
export type ISignUpData = IFormData
