import { ApiResponse } from '../api/response';

export interface CreateResponse extends ApiResponse {
   createdCatId: string;
}