import { WorkflowSpec } from '../types/workflow';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';

export function validateWorkflowSpec(input: any): WorkflowSpec {
  // 1. Basic Input Validation
  if (!input || typeof input !== 'object' || input === null) {
    throw new McpError(ErrorCode.InvalidParams, 'Workflow spec must be a non-null object');
  }

  const validatedSpec: WorkflowSpec = {};

  // Validate name (optional)
  if (input.name !== undefined) {
    if (typeof input.name !== 'string') {
      throw new McpError(ErrorCode.InvalidParams, 'Workflow name, if provided, must be a string');
    }
    validatedSpec.name = input.name;
  }

  // 2. Nodes Validation (input.nodes)
  if (input.nodes !== undefined) {
    if (!Array.isArray(input.nodes)) {
      throw new McpError(ErrorCode.InvalidParams, 'Workflow nodes, if provided, must be an array');
    }
    for (const node of input.nodes) {
      if (
        !node ||
        typeof node !== 'object' ||
        typeof node.name !== 'string' ||
        typeof node.type !== 'string' ||
        typeof node.typeVersion !== 'number' ||
        !node.parameters ||
        typeof node.parameters !== 'object' ||
        node.parameters === null
      ) {
        throw new McpError(
          ErrorCode.InvalidParams,
          'Each node must be an object and include name (string), type (string), typeVersion (number), and parameters (object)'
        );
      }
    }
    validatedSpec.nodes = input.nodes;
  }

  // 3. Connections Validation (input.connections)
  if (input.connections !== undefined) {
    if (typeof input.connections !== 'object' || input.connections === null) {
      // This also correctly catches arrays, as typeof array === 'object', but arrays are not allowed here.
      // The schema is Record<string, Array<...>>, so it must be a non-null object.
      // An empty object {} is a valid Record.
      if (Array.isArray(input.connections)) {
         throw new McpError(ErrorCode.InvalidParams, 'Workflow connections, if provided, must be an object (Record), not an array.');
      }
      throw new McpError(ErrorCode.InvalidParams, 'Workflow connections, if provided, must be a non-null object');
    }
    // Further validation for the structure of connections can be added here if needed
    // For example, checking if each value in the record is an array of specific objects.
    // For now, just checking it's an object as per the immediate instructions.
    validatedSpec.connections = input.connections;
  }

  // 4. Settings Validation (input.settings)
  if (input.settings !== undefined) {
    if (typeof input.settings !== 'object' || input.settings === null) {
      throw new McpError(ErrorCode.InvalidParams, 'Workflow settings, if provided, must be a non-null object');
    }
    validatedSpec.settings = input.settings;
  }

  // 5. StaticData Validation (input.staticData)
  if (input.staticData !== undefined) {
    if (input.staticData !== null && typeof input.staticData !== 'object' && typeof input.staticData !== 'string') {
      throw new McpError(ErrorCode.InvalidParams, 'Workflow staticData, if provided, must be an object, a string, or null');
    }
    validatedSpec.staticData = input.staticData;
  }

  // 6. Return Statement
  // Only includes fields that are part of WorkflowSpec and were validated.
  // Fields 'active' and 'tags' are explicitly not included.
  return validatedSpec;
}
