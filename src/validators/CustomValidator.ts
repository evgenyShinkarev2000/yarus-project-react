import { IValidator } from './IValidator';

export class CustomValidator<T> implements IValidator<T>{
  private _isFieldValid: boolean = false;
  private readonly _validationFn: (value?: T) => boolean;
  public readonly message: string = "";

  constructor(validationFn: (value?: T) => boolean, message: string) {
    this._validationFn = validationFn;
    this.message = message;
  }

  public validate(value?: T): void
  {
    this._isFieldValid = this._validationFn(value);
  }

  public get isFieldValid(): boolean {
    return this._isFieldValid;
  }
}