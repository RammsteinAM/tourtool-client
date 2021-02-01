export enum ErrorNames {
    // General errors
    BadRequest = 'BadRequestError',
    Forbidden = 'ForbiddenError',
    Internal = 'InternalServerError',
    NotFound = 'NotFoundError',
    Unauthorized = 'UnauthorizedError',
    UnprocessableEntity = 'UnprocessableEntityError',

    // Specific errors
    EmailInUse = 'EmailInUseError',
    EmailRequestSmallInterval = 'EmailRequestSmallIntervalError',
    //InvalidToken = 'InvalidTokenError',
    AlreadyVerified = 'AlreadyVerifiedError',
    UserNotFound = 'UserNotFoundError',
    WrongPassword = 'WrongPasswordError',
    UserNotVerified = 'UserNotVerifiedError',
    Validation = 'ValidationError',
    MailSend = 'MailSendError',
}