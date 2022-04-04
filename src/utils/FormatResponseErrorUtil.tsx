import ErrorData from '../lib/enums/ErrorData'
import {SerializedError} from '@reduxjs/toolkit/dist/createAsyncThunk'
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import {
  FETCH_BASE_QUERY_ERROR_FETCH_ERROR,
  FETCH_BASE_QUERY_ERROR_UNKNOWN_ERROR,
  SERVER_ERROR,
} from '../lib/constants/ErrorMessagesConstant'

export default function formatError<
  T extends FetchBaseQueryError | SerializedError | ErrorData | undefined
>(errorData: T): ErrorData | null {
  if (errorData === null) {
    return null
  }

  let formattedError: ErrorData = {
    errors: {
      message: '',
      success: false,
    },
    code: 500,
    message: SERVER_ERROR,
    success: false,
  }

  // For failed connections to API. format error message
  // generated for well defined messages.
  if (instanceOfFetchBaseQuerryError(errorData)) {
    const {status} = Object(errorData)
    formattedError.errors.message = FETCH_BASE_QUERY_ERROR_UNKNOWN_ERROR
    if (status === 'FETCH_ERROR') {
      formattedError.errors.message = FETCH_BASE_QUERY_ERROR_FETCH_ERROR
    }
  }

  // For handling failed messages from the API
  if (instanceOfResponseError(errorData)) {
    const {data} = Object(errorData)
    formattedError = data
  }

  return formattedError
}

export function instanceOfResponseError(error: any): error is ErrorData {
  return 'data' in error
}

export function instanceOfFetchBaseQuerryError(error: any): error is FetchBaseQueryError {
  return 'status' in error
}

export function instanceOfSerializedError(error: any): error is SerializedError {
  return 'stack' in error
}
