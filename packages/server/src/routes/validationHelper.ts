import { Request, Response, NextFunction } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { z } from "zod";

function validate(schema: z.ZodTypeAny, obj: any) {
    try {
        schema.parse(obj);
        return [];
      } catch (error) {
          if (error instanceof z.ZodError) {
              return error.errors.map((issue) => ({
                  message: `${issue.path.join('.')} is ${issue.message}`
              }));
          } else {
            throw error;
          }
      }
}

export function validateRouteSchema({
  paramsSchema,
  bodySchema,
  querySchema,
} : {
  paramsSchema?: z.ZodTypeAny,
  bodySchema?: z.ZodTypeAny,
  querySchema?: z.ZodTypeAny
}) {
  return (request: Request, response: Response, next: NextFunction) => {
    let errorMessages: any[] = [];

    try {
      paramsSchema && errorMessages.concat(validate(paramsSchema, request.params));
      bodySchema && errorMessages.concat(validate(bodySchema, request.body));
      querySchema && errorMessages.concat(validate(querySchema, request.query));
    } catch (error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send( { error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }

    if (errorMessages.length !== 0) {
      const res = { error: ReasonPhrases.BAD_REQUEST, details: errorMessages };
      console.error(res)
        return response.status(StatusCodes.BAD_REQUEST).send(res);
    }

    next();
  };
}