'use server'

import Question from '@/database/question.model'
import Tag from '@/database/tag.model'
import User from '@/database/user.model'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '../mongoose'
import { CreateQuestionParams, GetQuestionsParams } from './shared.types'

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase()

    const questions = await Question.find({})
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .sort({ createdAt: -1 })

    return { questions }
  } catch (error) {
    console.log('Error: ', error)
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  // title: string
  // content: string
  // tags: string[]
  // author: Schema.Types.ObjectId | IUser
  // path: string

  try {
    //! connect to Database
    connectToDatabase()

    const { title, content, tags, author, path } = params
    console.log('path: ', path)
    // create a new Question
    const question = await Question.create({ title, content, author })

    //! create a new tag Array
    const tagDocuments = []
    // Create the tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsert: true, new: true }
      )

      tagDocuments.push(existingTag)
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } }
    })

    // Create an interaction record for the user's ask_question action

    // Increment author's reputation by +5 for creating a new question

    //! reload page
    revalidatePath(path)
  } catch (error) {
    console.log('Error: ', error)
  }
}
