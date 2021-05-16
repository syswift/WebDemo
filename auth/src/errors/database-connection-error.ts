import { CustomError } from "./custom-error";

export class DatabaseConnnectionError extends CustomError {
    statusCode = 500;
    reason = 'Error connecting to database';

    constructor(){
        super();

        //Only beacuse we are extending a built in class
        Object.setPrototypeOf(this, DatabaseConnnectionError.prototype);
    }

    serializeErrors(){
        return [
             { message: this.reason }
        ]
    }
}