// export interface WorkflowNode {
//   id?: string;
//   type: string;
//   name: string;
//   parameters?: Record<string, any>;
//   position?: { x: number; y: number };
// }

export interface N8NNode {
  id?: string;
  name: string;
  type: string;
  typeVersion: number;
  parameters: Record<string, any>;
  position?: number[];
  webhookId?: string;
  disabled?: boolean;
  notesInFlow?: boolean;
  notes?: string;
  executeOnce?: boolean;
  alwaysOutputData?: boolean;
  retryOnFail?: boolean;
  maxTries?: number;
  waitBetweenTries?: number;
  continueOnFail?: boolean;
  onError?: string;
  credentials?: Record<string, { id: string; name: string; }>;
}

export interface WorkflowSettings {
  saveExecutionProgress?: boolean;
  saveManualExecutions?: boolean;
  saveDataErrorExecution?: 'all' | 'none';
  saveDataSuccessExecution?: 'all' | 'none';
  executionTimeout?: number;
  errorWorkflow?: string;
  timezone?: string;
  executionOrder?: string;
}

export interface WorkflowConnection {
  source: string;
  target: string;
  sourceOutput?: number;
  targetInput?: number;
}

export interface WorkflowSpec {
  name: string;
  nodes: N8NNode[];
  connections: Record<string, Array<{ node: string; type: string; index: number }>>;
  settings: WorkflowSettings;
  staticData?: Record<string, any> | string | null;
}
