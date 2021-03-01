class ErrorResponse extends Error {
  private statusCode: number;
  constructor(message: string, code: number){
    super(message);
    this.statusCode = code;
  }
}
module.exports = ErrorResponse;