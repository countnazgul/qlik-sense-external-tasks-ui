export interface Connection {
    createData: string;
    customProperties: [];
    enabled: boolean;
    id: string;
    maxRetries: number;
    modifiedByUserName: string;
    modifiedDate: string;
    name: string;
    operational: any;
    parameters: string;
    path: string;
    privileges: string[];
    qlikUser: string;
    schemaPath: string;
    tags: any[];
    taskSessionTimeout: 1440;
    taskType: 1;
};