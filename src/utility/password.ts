import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/UserModel'
import { Response } from 'express'

const { JWT_SECRET_KEY } = process.env

export const GetSalt = async () => {
  return await bcrypt.genSalt()
}

export const GetHashedPassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt)
}

export const ValidatePassword = async ({
  enteredPassword,
  savePassword,
  salt
}: {
  enteredPassword: string
  savePassword: string
  salt: string
}) => {
  return (await GetHashedPassword(enteredPassword, salt)) === savePassword
}

export const GetToken = (
  res: Response,
  { email, userId, lastName, firstName }: UserModel
) => {
  const userToken = jwt.sign(
    { userId, email, lastName, firstName },
    JWT_SECRET_KEY,
    {
      expiresIn: '1h'
    }
  )

  return userToken
}
