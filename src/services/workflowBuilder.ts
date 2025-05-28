import { WorkflowSpec, N8NNodeInput, WorkflowConnection, WorkflowSettings } from '../types/workflow';
import { calculateNextPosition } from '../utils/positioning';

export class WorkflowBuilder {
  private nodes: N8NNodeInput[] = [];
  private connections: WorkflowConnection[] = [];
  private nextPosition = { x: 100, y: 100 };

  addNode(node: N8NNodeInput): N8NNodeInput {
    if (!node.position) {
      node.position = [this.nextPosition.x, this.nextPosition.y];
      this.nextPosition = calculateNextPosition(this.nextPosition);
    }
    this.nodes.push(node);
    return node;
  }

  connectNodes(connection: WorkflowConnection) {
    this.connections.push(connection);
  }

  exportWorkflow(): WorkflowSpec {
    let transformedConnections: WorkflowSpec['connections'] = undefined;

    if (this.connections.length > 0) {
      transformedConnections = {};
      for (const conn of this.connections) {
        if (!transformedConnections[conn.source]) {
          transformedConnections[conn.source] = [];
        }
        // Ensure targetInput is a number, defaulting to 0 if undefined
        const targetInputIndex = conn.targetInput ?? 0;
        transformedConnections[conn.source].push({
          node: conn.target, // Target Node ID
          type: 'main',      // Assuming target input name is 'main' by convention
          index: targetInputIndex, 
        });
      }
    }

    return {
      nodes: this.nodes,
      connections: transformedConnections,
      // name, settings, staticData are optional in WorkflowSpec,
      // so they can be omitted here if the builder doesn't set them.
    };
  }
}
