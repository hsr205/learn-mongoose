import {RequestHandler} from "express";
import {isValidObjectId} from "mongoose";
import createHttpError from "http-errors";
import BookSchema from "../models/book";
import BookInstanceSchema from "../models/bookinstance";

export const getBookDetails: RequestHandler = async (request, response, next) => {


    const bookId = request.query.id;

    console.log(`bookId = ${bookId}`);

    try {
        if (!isValidObjectId(bookId)) {
            throw createHttpError(400, `Invalid question id provided`);
        }

        const allBooks = await BookSchema.find({}).populate("author");
        const allBookInstances = await BookInstanceSchema.find({}).populate("book");

        // const allQuestions = await QuestionModel.find().populate("answers").exec();
        // const question = allQuestions.find((question) => question.id === questionId);
        //
        // if (!question) {
        //     throw createHttpError(404, `Question not found`);
        // }
        //
        // response.status(200).json(question);
    } catch (error) {
        next(error);
    }

}
