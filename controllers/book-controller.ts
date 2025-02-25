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
        // // TODO: Use the following as basic queries to see the document structure for both BookSchema and BookInstanceSchema
        // const allBooks = await BookSchema.find({}, "title author").populate("author");
        // const allBookInstances = await BookInstanceSchema.find({}, "imprint status").populate("book");

        const allBooks = await BookSchema.findById(bookId, "title author").populate('books');

        // TODO: The following query will need to change to find the specific book ID with the BookInstanceSchema
        //       This should create a join making it possible to get the fields "imprint" and "status" from the BookInstanceSchema
        const allBookInstances = await BookInstanceSchema.find({}, "imprint status").populate("book");

        // if (!question) {
        //     throw createHttpError(404, `Question not found`);
        // }
        //
        // response.status(200).json(question);
    } catch (error) {
        next(error);
    }

}
