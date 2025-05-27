import { ExecutionData, ExecutionMode } from './execution';
import { N8NNode } from './workflow';

export interface N8NWorkflowResponse {
  id: string;
  name: string;
  active: boolean;
  nodes: N8NNode[];
  connections: any;
  createdAt: string;
  updatedAt: string;
  settings?: Record<string, any>;
  staticData?: Record<string, any> | string | null;
  tags?: { id: string; name: string; createdAt: string; updatedAt: string; }[];
}

/**
 * Represents a full workflow execution response from n8n API
 */
export interface N8NExecutionResponse {
  id: number;
  data?: ExecutionData;
  finished: boolean;
  mode: ExecutionMode;
  retryOf?: number | null;
  retrySuccessId?: number | null;
  startedAt: string;
  stoppedAt: string;
  workflowId: number;
  waitTill?: string | null;
  customData?: {
    [key: string]: any;
  };
}

/**
 * Response structure when listing executions
 */
export interface N8NExecutionListResponse {
  data: N8NExecutionResponse[];
  nextCursor?: string;
}

/**
 * Standard error response structure
 */
export interface N8NErrorResponse {
  error: string;
}
