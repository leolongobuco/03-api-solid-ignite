import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterUseCase } from './register-use-case'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await registerUseCase.execute({
      name: 'Edward Boyd',
      email: 'sihak@itiri.vu',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await registerUseCase.execute({
      name: 'Edward Boyd',
      email: 'sihak@itiri.vu',
      password: '123456',
    })

    const isPasswordCorrectluHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectluHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@email.com'

    await registerUseCase.execute({
      name: 'Edward Boyd',
      email,
      password: '123456',
    })

    await expect(async () => {
      await registerUseCase.execute({
        name: 'Edward Boyd',
        email,
        password: '123456',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
