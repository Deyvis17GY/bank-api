import { plainToClass } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'
import { LoginInput } from '../models/dto/LoginInput'
import { SignupInput } from '../models/dto/SignupInput'
import { UserRepository } from '../repository/userRepository'
import { AppValidationError } from '../utility/error'
import {
  GetHashedPassword,
  GetSalt,
  GetToken,
  ValidatePassword
} from '../utility/password'
import { ErrorResponse, SuccessResponse } from '../utility/response'

const repository = new UserRepository()

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const input = plainToClass(SignupInput, req.body)
    const error = await AppValidationError(input)

    if (error) {
      return ErrorResponse(res, 404, error)
    }

    const salt = await GetSalt()
    const hashedPassword = await GetHashedPassword(input.password, salt)

    const data = await repository.registerUser({
      email: input.email,
      password: hashedPassword,
      firstName: input.firstName,
      lastName: input.lastName,
      salt
    })

    return SuccessResponse(res, data)
  } catch (error) {
    ErrorResponse(res, 500, error?.sqlMessage)
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const input = plainToClass(LoginInput, req.body)
    const error = await AppValidationError(input)
    if (error) {
      return ErrorResponse(res, 404, error)
    }

    const data = await repository.findAccount(input.email)

    const verifyPassword = await ValidatePassword({
      enteredPassword: input.password,
      savePassword: data.password,
      salt: data.salt
    })

    if (!verifyPassword) {
      return ErrorResponse(res, 404, 'Invalid Credentials')
    }

    GetToken(res, data)
    const publicData = {
      userId: data.userId,
      lastName: data.lastName,
      firstName: data.firstName,
      email: data.email
    }

    return SuccessResponse(res, publicData)
  } catch (error) {
    ErrorResponse(res, 500, error?.sqlMessage)
  }
}
