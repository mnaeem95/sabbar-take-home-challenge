// General
export const DATABASE_CONNECTED_MSG = 'Successfully Connected to Database';
export const DATABASE_ERROR_MSG = 'There was an error while connecting to the database';
export const SERVER_STARTED_MSG = (port, processId) => `Listening on port: ${port}, PID: ${processId}`;
export const INTERNAL_SERVER_ERROR_MSG = 'Internal Server Error';
export const BAD_REQUEST_MSG = 'Bad Request';
export const SERVER_FAILED = 'Http server failed.';

export const NOT_FOUND_MSG = (id: string) => `No document found with id: ${id}`;
export const UNABLE_TO_DELETE_USERS_MSG = (userIds: string[]) => `Unable to delete ${userIds.length} users`;
