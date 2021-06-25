export interface FormBuilderState {
  constructorFields: Field[];
  selectedFieldId: selectedFieldId;
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
  [key: string]: any;
};


export type selectedFieldId = number | null ;

export type FieldTypes = 'input' | 'textarea' | 'button' | 'select' | 'checkbox';


export interface Field {
  type: FieldTypes;
  styles: Styles;
  id: selectedFieldId;
}

export type StyleList = {
  width: '' | string;
  height: '' | number;
  fontSize: '' | number;
  fontWeight: '' | number;
  color: '' | number;
};
