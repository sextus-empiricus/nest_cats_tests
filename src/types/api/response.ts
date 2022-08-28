export enum ResponseStatus {
   success = 'success',
   failed = 'failed',
}

export interface ApiResponse {
   status: ResponseStatus;
}