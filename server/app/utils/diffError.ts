export default class DiffError extends Error {
  
  public type: DiffErrorTypes;

  constructor (message: string, isSystemError?: DiffErrorTypes) {
    super(message);

    this.type = isSystemError || DiffErrorTypes.system;
  }
}

export enum DiffErrorTypes {
  system,
  business
}
