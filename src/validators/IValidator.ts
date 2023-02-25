export interface IValidator<T>{
  isFieldValid: boolean,
  message: string,
  validate(value: T): void,
}