export interface formBuilderState {
  constructorFields: ConstructorField[];
  selectedFieldId: SelectedFieldId;
  stylesFields: StyleList,
}

export interface loginState {
  user: User;
  error: Error;
}

export interface User {
  email: string;
  password: string;
}

export interface Error {
  code: number;
  message: string;
}

export interface AuthResponse {
  accessToken: string;
}

export type Styles = {
  [key:string]: any;
}

export type ConstructorField = {
  id: number;
  type: string;
  styles: Styles;
  order: number;
  label?: string;
  options?: string[];
  placeholder?: string;
  text?: string;
  isRequired?: boolean;
  isChecked?: boolean;
}

export type SelectedFieldId = number | null;

export type DraggableField = string | null;

export type FieldTypes = 'input' | 'textarea' | 'button' | 'select' | 'checkbox'; 

export type ChangeFieldPropArguments = {
  constructorFieldId: number;
  propToChange: keyof ConstructorField
  newPropState: number | string | string[] | String
}

export type StyleList = {
  placeholder: null | string,
  text: null | string,
  label: null | string,  
  width: null | string;
  height: null | number;
  border: null | string;
  fontSize: null | number;
  fontWeight: null | number;
  color: null | number;
  isRequired: null | boolean;
  isChecked: null | boolean;
}