import { ExecutionData, ExecutionMode } from './execution';
import { N8NNodeResponse, WorkflowSettings } from './workflow';

export interface N8NWorkflowResponse {
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  nodes: N8NNodeResponse[];
  connections?: Record<string, Array<{ node: string; type: string; index: number }>>;
  settings?: WorkflowSettings;
  staticData?: Record<string, any> | string | null;
  tags?: Array<{
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }>;
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
