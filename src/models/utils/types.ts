export interface ClassType<T> extends Function {
  new (...args: any[]): T;
}

export type BorshSchema = Map<any, any>;
