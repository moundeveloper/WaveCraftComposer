abstract class CustomError extends Error {
    constructor(message: string) {
      super(message);
      this.name = this.constructor.name; 
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }


/**
 * Represents an error thrown when attempting to insert an item that is already included in the list.
 * @extends CustomError
 */
export class ItemIsAlreadyIncluded extends CustomError {
    constructor(message: string = 'The item is already contained inside the list') {
        super(message);
    }
}

/**
 * Represents an error thrown when an invalid insertion is attempted.
 * This error typically occurs when attempting to insert an item into a list in an invalid manner.
 * @extends CustomError
 */
export class InvalidInsertionError extends CustomError {
    constructor(message: string = 'Cannot insert the item in the list') {
        super(message);
    }
}

/**
 * Represents an error thrown when an invalid insertion is attempted.
 * This error typically occurs when attempting to insert an item into a list in an invalid manner.
 * @extends CustomError
 */
export class NotFoundError extends CustomError {
    constructor(message: string = 'Cannot insert the item in the list') {
        super(message);
    }
}


