export class HttpError extends Error {
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
    public status: number
}