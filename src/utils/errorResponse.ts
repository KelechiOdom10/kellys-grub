export interface IErrorResponse {
  name: string;
  message: string | string[];
  stack?: string | undefined;
  statusCode?: number;
  code?: number;
  errors?: object;
}

export class ErrorResponse extends Error implements IErrorResponse {
  statusCode: number;

  constructor(message: string | string[], statusCode: number) {
    if (typeof message === "object") {
      super(message.join(", "));
    } else if (typeof message === "string") {
      super(message);
    } else {
      super(message);
    }
    this.statusCode = statusCode;
  }
}
