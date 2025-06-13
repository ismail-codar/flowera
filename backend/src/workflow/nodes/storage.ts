import { IWorkflowActionNode } from "./base";

// #region Data Storage & Database Nodes
export interface IWorkflowDatabaseNode<N extends string> extends IWorkflowActionNode<N, "database"> {
  actionType: "database";
  properties: {
    operation: "select" | "insert" | "update" | "delete" | "transaction";
    table: string;
    query?: string;
    data?: Record<string, any>;
    conditions?: Record<string, any>;
    connection: {
      type: "mysql" | "postgresql" | "mongodb" | "sqlite" | "mssql" | "oracle";
      host: string;
      port: number;
      database: string;
      username: string;
      password: string;
      ssl?: boolean;
    };
    transactionQueries?: string[];
  };
}

export interface IWorkflowRedisNode<N extends string> extends IWorkflowActionNode<N, "redis"> {
  actionType: "redis";
  properties: {
    operation: "get" | "set" | "del" | "exists" | "expire" | "lpush" | "rpush" | "lpop" | "rpop" | "hget" | "hset";
    host: string;
    port: number;
    password?: string;
    database?: number;
    key: string;
    value?: any;
    expiration?: number;
    field?: string;
  };
}

export interface IWorkflowElasticsearchNode<N extends string> extends IWorkflowActionNode<N, "elasticsearch"> {
  actionType: "elasticsearch";
  properties: {
    operation: "index" | "get" | "search" | "update" | "delete" | "bulk";
    host: string;
    port: number;
    index: string;
    type?: string;
    id?: string;
    document?: any;
    query?: any;
    authentication?: {
      username: string;
      password: string;
    };
    ssl?: boolean;
  };
}

export type IWorkflowDataStorageNodes<N extends string> =
  | IWorkflowDatabaseNode<N>
  | IWorkflowRedisNode<N>
  | IWorkflowElasticsearchNode<N>;
// #endregion
