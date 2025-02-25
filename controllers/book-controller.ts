import {RequestHandler} from "express";
import {isValidObjectId} from "mongoose";
import createHttpError from "http-errors";
import BookInstanceSchema from "../models/bookinstance";

export const getBookDetails: RequestHandler = async (request, response, next) => {


    const bookId = request.params.id;


    try {
        if (!isValidObjectId(bookId)) {
            throw createHttpError(400, `Invalid question id provided`);
        }

        const bookDetailsObj = await BookInstanceSchema.find({book: bookId}, "imprint status")
            .populate({
                path: "book",
                select: "title author",
                populate: {
                    path: "author",
                    select: "first_name family_name"
                }
            });


        if (!bookDetailsObj) {
            throw createHttpError(404, `Question not found`);
        }


        response.status(200).json(bookDetailsObj);

    } catch (error) {
        next(error);
    }

}
