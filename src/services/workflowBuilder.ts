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
      transformedConnections = {}; // Initialize as an empty object
      for (const conn of this.connections) {
        let sourceOutputName = 'main'; // Default for undefined or 0
        if (conn.sourceOutput === 0) {
          sourceOutputName = 'main';
        } else if (typeof conn.sourceOutput === 'number' && conn.sourceOutput > 0) {
          // Mapping convention: index 1 -> "output_1", index 2 -> "output_2", etc.
          // Adjust if n8n uses different named outputs for indices > 0.
          sourceOutputName = `output_${conn.sourceOutput}`;
        }
        // If conn.sourceOutput is undefined, it defaults to 'main' as per initialization.

        if (!transformedConnections[sourceOutputName]) {
          transformedConnections[sourceOutputName] = [];
        }

        const targetInputIndex = conn.targetInput ?? 0;
        transformedConnections[sourceOutputName].push({
          node: conn.target,        // Target Node ID
          type: 'main',             // Assuming target input slot name is 'main'
          index: targetInputIndex,  // Target input slot index
        });
      }
    }

    return {
      // name, settings, staticData are optional in WorkflowSpec.
      // Explicitly setting them as undefined if not managed by this basic builder.
      name: undefined, 
      nodes: this.nodes,
      connections: transformedConnections,
      settings: undefined, 
      staticData: undefined,
    };
  }
}
