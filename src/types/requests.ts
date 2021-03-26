export enum RequestStatus {
    IDLE = 'idle',
    PENDING = 'pending', 
    SUCCESS = 'success',
    ERROR = 'error'
}

export interface AxiosOptions {
    accessToken?: string;
    baseURL?: string
}
