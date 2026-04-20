# HR Workflow Designer

A visual workflow designer built for Tredence Analytics' Full Stack Engineering Internship case study. Allows HR admins to visually construct, configure, and simulate internal workflows such as employee onboarding, leave approval, and document verification.

## Demo / Screenshots

![Main Dashboard](public/screenshots/main-dashboard.png)
*A clean, light-themed interface for designing complex HR workflows.*

![Node Configuration](public/screenshots/node-configuration.png)
*Deep configuration for each node type, including assignee mapping and approval thresholds.*

![Validation Error](public/screenshots/validation-error.png)
*Real-time graph validation catching unconnected nodes and invalid pathways.*

![Successful Simulation](public/screenshots/successful-simulation.png)
*Step-by-step asynchronous simulation of the HR workflow with detailed logs.*

![Node Palette](public/screenshots/node-palette.png)
*A dedicated selection of purpose-built HR workflow components.*

## Tech Stack

- **React 18**: Chosen for its robust ecosystem and concurrent rendering features.
- **TypeScript**: Strictest configuration (`"strict": true`, Zero `any` policy) to ensure early error catching, type-safe API interactions, and absolute predictability during refactors.
- **Vite 6**: Extensively fast bundler with near-instant hot module replacement (HMR).
- **React Flow (@xyflow/react)**: Fully customizable diagramming and canvas framework enabling deep node configurations.
- **Zustand**: A lightweight, unopinionated state management tool without Context API boilerplate, pairing beautifully with React Flow's graph structures.
- **Tailwind CSS v3**: Configured strictly without arbitrary shortcuts. Facilitates predictable styling directly in React components.
- **Dagre**: Provides intelligent graph auto-layout algorithms directed precisely for the workflow trees.
- **Lucide-react**: Provides consistent, accessible SVG icons at any scale without bundle bloat.

## 🚀 Bonus Features Implemented

- **JSON Export/Import**: Seamlessly save and load workflow configurations.
- **Auto-layout engine**: Integrated Dagre-d3 for one-click clean graph organization.
- **Minimap navigation**: Enhanced UX for large-scale workflow management.
- **Node validation logic**: Deep graph traversal to ensure strict DAG compliance and connectivity.

## Directory Structure
```text
src/
├── api/            # Data fetching/Services (Mock API integration)
├── components/     # UI components and Logic (Canvas, Nodes, Forms, Panels)
├── hooks/          # Custom React hooks for canvas and store interactions
├── store/          # State management (Zustand workflow store)
├── types/          # Strict TypeScript definitions for nodes and actions
└── utils/          # Helper functions (Dagre layout, validation logic)
```

## Running locally

### Prerequisites
- Node.js version >= 18

### Setup
```bash
git clone <repo>
cd hr-workflow-designer
npm install
npm run dev
```
Once the dev server is running, visit **http://localhost:5173**.

## Architecture

**Data Flow**:
- State resides in a single `workflowStore.ts` utilizing Zustand. This serves as the single source of truth allowing easy serialization of the whole workflow into JSON format.
- Node updates in the `ConfigPanel` forms push changes directly to the single store instance which forces React Flow canvas and simulation mechanisms to react simultaneously to state changes.

**Choice of State Control**:
- Zustand was chosen over Context API to prevent "Provider hell", avoid performance bottlenecks from full-tree re-renders, and seamlessly integrate state outside React components for graph validation algorithms.

**Choice of Mocks**:
- `simulate.ts` and `automations.ts` leverage local asynchronous functions over `JSON Server` for absolute zero setup, robust type-safe payload definitions, zero offline issues, and simple latency simulations (via `setTimeout`).

## Node Types & Configuration

| Node Type | Icon | Details / Config Fields |
| :--- | :--- | :--- |
| **Start** | Play | Workflow entry point. Contains a `title` and a list of `metadata` key-value pairs. |
| **Task** | Clipboard | System task. Defines `title`, `description`, `assignee`, a `dueDate`, and `customFields`. |
| **Approval** | Check | Approval gate requiring decisions. Can assign `approverRole` (Manager/HRBP/Director) and set an `autoApproveThreshold`. |
| **Automated** | Zap | Automated trigger mapping directly to the mock API choices (`actionId`). Renders dynamic inputs for `actionParams`. |
| **End** | Stop | Exit path. Configures `endMessage` and toggles an `includeSummary` boolean flag. |

## Mock API

The designer simulates an API to handle automations and node verifications without requiring a dedicated persistent backend context.

**GET /automations**
```json
// Returns a list of dynamically configurable actions:
[
  { "id": "send_email", "label": "Send Email", "params": ["to", "subject"] },
  { "id": "create_ticket", "label": "Create JIRA Ticket", "params": ["project", "summary"] }
]
```

**POST /simulate**
```json
// Request Payload Form
{
  "nodes": [{ ... WorkflowNode ... }],
  "edges": [{ ... WorkflowEdge ... }]
}
```

## Validation Rules

1. Must contain **exactly one** `Start` node.
2. Must contain **at least one** `End` node.
3. Every non-End node must possess **at least one outgoing connection**.
4. Every non-Start node must possess **at least one incoming connection**.
5. Workflows must be strict Directed Acyclic Graphs (**DAGs**) - absolutely no cycles allowed.

---

## Author
**Akshath Senthilkumar**  
*Full Stack Engineer Candidate at Tredence*  
I am open to any questions regarding the technical decisions made in this project.
