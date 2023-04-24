import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'

import { GetUserProfileUseCase } from './get-user-profile-use-case'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let getUserProfileUseCase: GetUserProfileUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      email: 'test@example.com',
      name: 'test',
      password_hash: await hash('123456', 6),
    })

    const { user } = await getUserProfileUseCase.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('test')
  })

  it('should not be able to get user with wrong id', async () => {
    await expect(async () => {
      await getUserProfileUseCase.execute({
        userId: 'invalid-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
