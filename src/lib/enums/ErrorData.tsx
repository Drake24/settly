/**
 * Error Data
 *
 * This matches the API Error bag base on
 * settly-api return JSON format. 
 */
 export default interface ErrorData {
    errors: {
      code?: number,
      data?: [] | any,
      domain?: string,
      message?: string,
      success?: boolean,
    },
    message: string,
    code: number,
    success?: boolean,
    apiVersion?: object
}