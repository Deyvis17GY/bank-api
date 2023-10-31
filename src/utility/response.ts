import { Response } from 'express'

const formatResponse = (
  statusCode: number,
  message: string,
  data?: unknown
) => {
  const responseBody = data ? { message, data } : { message }

  return {
    statusCode,
    body: responseBody
  }
}

export const SuccessResponse = (res: Response, data: object) => {
  const response = formatResponse(200, 'Success', data)
  res.status(200).json(response)
}

export const ErrorResponse = (
  res: Response,
  code = 404,
  error: unknown = ''
) => {
  if (Array.isArray(error)) {
    const errorObject = error?.[0]?.constraints

    const errorMessage =
      errorObject?.[Object.keys(errorObject)[0]] || 'Error Ocurred'

    const responseErrors = formatResponse(code, errorMessage)

    res.status(responseErrors.statusCode).json(responseErrors)
    return
  }

  const response = formatResponse(code, `${error}`)

  res.status(code).json(response)
}
