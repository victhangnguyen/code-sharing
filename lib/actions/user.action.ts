'use server'

import Question from '@/database/question.model'
import User from '@/database/user.model'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '../mongoose'
import { CreateUserParams, DeleteUserParams, UpdateUserParams } from './shared.types'

export async function getUserById(params: any) {
  try {
    connectToDatabase()

    const { userId } = params

    const user = await User.findOne({ clerkId: userId })

    return user
  } catch (error) {
    console.log('Error: ', error)
    throw error
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase()

    const newUser = await User.create(userData)

    return newUser
  } catch (error) {
    console.log('Error: ', error)
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase()

    const { clerkId, updateData, path } = params

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true })
    //! new: true, So we want to create a new instance of a user in a database.

    revalidatePath(path)
  } catch (error) {
    console.log('Error: ', error)
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase()

    const { clerkId } = params

    const user = await User.findOneAndDelete({ clerkId })

    if (!user) {
      throw new Error('User not found')
    }

    //! Delete the user from the database
    //! and questions, answers, comments, etc.

    //! get user question Ids
    const userQuestionIds = await Question.find({ author: user._id }).distinct('_id')
    console.log('userQuestionIds: ', userQuestionIds)

    // TODO: delete user answers, comments, etc...

    const deletedUser = await User.findByIdAndDelete(user._id)
    
    return deletedUser
  } catch (error) {
    console.log('Error: ', error)
  }
}
