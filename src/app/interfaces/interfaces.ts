export interface FormBuilderState {
  constructorFields: ConstructorField[];
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
};

// export type SelectedFieldId = number | null;
export type selectedFieldId = number | null;

export type FieldTypes = 'input' | 'textarea' | 'button' | 'select' | 'checkbox';

export type ChangeFieldPropArguments = {
  constructorFieldId: number;
  propToChange: keyof ConstructorField
  newPropState: number | string | string[]
};

export interface Field {
  type : FieldTypes,
  styles: Styles,
}

export type StyleList = {
  placeholder: '' | string;
  text: '' | string;
  label: '' | string;
  width: '' | string;
  height: '' | number;
  border: '' | string;
  fontSize: '' | number;
  fontWeight: '' | number;
  color: '' | number;
  isRequired: '' | boolean;
}

export const styles: StyleList = {
  placeholder: '',
  text: '',
  label: '',
  width: '',
  height: '',
  border: '',
  fontSize: '',
  fontWeight: '',
  color: '',
  isRequired: '',
}
