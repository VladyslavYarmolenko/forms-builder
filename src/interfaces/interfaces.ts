export interface formBuilderState {
  constructorFields: ConstructorField[];
  selectedFieldId: SelectedFieldId;
}


export interface User{
  email: string;
  password: string;
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
}

export type SelectedFieldId = number | null;

export type DraggableField = string | null;

export type FieldTypes = 'input' | 'textarea' | 'button' | 'select' | 'checkbox'; 

export type ChangeFieldPropArguments = {
  constructorFieldId: number;
  propToChange: keyof ConstructorField
  newPropState: number | string | string[] | String
}

const initialState: formBuilderState = {
  constructorFields: [],
  selectedFieldId: null 
}