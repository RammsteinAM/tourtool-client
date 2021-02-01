export class HttpError extends Error {
    name: string;
    constructor(status: number, name: string, message: string) {
        super(message);
        this.status = status;
        this.name = name;
    }
    public status: number
}