export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type CreateNoteInput = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Form = {
  __typename?: 'Form';
  description?: Maybe<Scalars['String']['output']>;
  elements: Array<FormElement>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type FormElement = {
  __typename?: 'FormElement';
  children: Array<FormElement>;
  defaultValue?: Maybe<Scalars['JSON']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  formId: Scalars['ID']['output'];
  heading?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  max?: Maybe<Scalars['Float']['output']>;
  min?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  options: Array<FormOption>;
  parentId?: Maybe<Scalars['ID']['output']>;
  placeholder?: Maybe<Scalars['String']['output']>;
  position: Scalars['Int']['output'];
  rules?: Maybe<Scalars['JSON']['output']>;
  step?: Maybe<Scalars['Float']['output']>;
  type: FormElementType;
};

export enum FormElementType {
  Autocomplete = 'AUTOCOMPLETE',
  Checkbox = 'CHECKBOX',
  Email = 'EMAIL',
  Number = 'NUMBER',
  Password = 'PASSWORD',
  Radio = 'RADIO',
  Rating = 'RATING',
  Section = 'SECTION',
  Select = 'SELECT',
  Slider = 'SLIDER',
  Switch = 'SWITCH',
  Text = 'TEXT'
}

export type FormOption = {
  __typename?: 'FormOption';
  elementId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  position: Scalars['Int']['output'];
  value: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNote: Note;
  signup: SignupResult;
};


export type MutationCreateNoteArgs = {
  input: CreateNoteInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};

export type Note = {
  __typename?: 'Note';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  notes: Array<Note>;
  skills: Array<Skill>;
};

export type Signup = {
  __typename?: 'Signup';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
};

export type SignupInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type SignupResult = {
  __typename?: 'SignupResult';
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type Skill = {
  __typename?: 'Skill';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageAlt: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  route: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type SignupMutationVariables = Exact<{
  input: SignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'SignupResult', ok: boolean, message?: string | null } };

export type NotesQueryVariables = Exact<{ [key: string]: never; }>;


export type NotesQuery = { __typename?: 'Query', notes: Array<{ __typename?: 'Note', id: string, title: string, content: string, createdAt: any }> };

export type SkillsQueryVariables = Exact<{ [key: string]: never; }>;


export type SkillsQuery = { __typename?: 'Query', skills: Array<{ __typename?: 'Skill', id: string, title: string, description: string, route: string, createdAt: any, imageUrl: string }> };
