import { Length } from 'class-validator'
import { LoginInput } from './LoginInput'

export class SignupInput extends LoginInput {
  @Length(5, 40)
  firstName: string

  @Length(5, 40)
  lastName: string
}
