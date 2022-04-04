/**
 * Response Data
 *
 * This matches the API base on the
 * settly-api return JSON format. 
 */
export default interface Response {
    data?: [] | {}
    message: string
    code: number
    success: boolean
    apiVersion: object
  }
  