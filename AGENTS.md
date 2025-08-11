<general_rules>
- **Package Manager**: Always use `pnpm` for dependency management. This repository is configured with pnpm@10.14.0 as specified in package.json.
- **Code Quality**: Run `npm run lint` before committing code. The repository uses ESLint with Next.js configuration for code quality enforcement.
- **TypeScript**: Maintain strict TypeScript compliance. The project uses strict mode enabled in tsconfig.json - all code must be properly typed.
- **Path Aliases**: Use configured path aliases for imports:
  - `@/*` for src directory imports
  - `@/components/*` for component imports
  - `@/types/*` for type definition imports
  - `@/lib/*`, `@/hooks/*`, `@/templates/*` for respective directories
- **Node Components**: When creating new workflow node types, place them in `src/components/nodes/` and follow the existing naming pattern (e.g., `TableNode.tsx`, `FormNode.tsx`). Always check existing node types before creating new ones.
- **Type Definitions**: Add new TypeScript interfaces and types to `src/types/` directory. Use `nodes.ts` for node-specific types and `workflow.ts` for workflow-related types.
- **Development Scripts**:
  - `npm run dev`: Start development server
  - `npm run build`: Build production application
  - `npm run lint`: Run ESLint for code quality checks
</general_rules>

<repository_structure>
- **Framework**: Next.js 15 application using App Router architecture with React 19
- **Primary Purpose**: React Flow-based workflow builder for creating interactive node-based interfaces
- **Key Directories**:
  - `src/app/`: Next.js App Router pages and layouts
    - `src/app/builder/`: Main workflow builder interface
  - `src/components/nodes/`: Custom React Flow node implementations
    - Contains 6 node types: TableNode, FormNode, FormGroupNode, DisplayNode, ActionNode, PermissionNode
  - `src/types/`: TypeScript type definitions
    - `nodes.ts`: Node-specific type definitions
    - `workflow.ts`: Workflow and general type definitions
- **Styling**: Uses Tailwind CSS with custom CSS variables for workflow platform colors and theming
- **Configuration**: 
  - Path aliases configured in `tsconfig.json` for clean imports
  - Next.js optimized for React Flow with webpack and package import optimizations
  - PostCSS configured for Tailwind CSS processing
</repository_structure>

<dependencies_and_installation>
- **Package Manager**: Use `pnpm` exclusively for all dependency management
- **Installation**: Run `pnpm install` to install all dependencies
- **Core Dependencies**:
  - Next.js 15.4.6 (React framework)
  - React 19.1.0 (UI library)
  - @xyflow/react 12.8.2 (React Flow for node-based interfaces)
  - Prisma 6.13.0 (Database ORM)
  - Tailwind CSS (Styling framework)
  - Lucide React (Icon library)
- **Development Dependencies**:
  - TypeScript 5+ (Type checking)
  - ESLint with Next.js configuration (Code linting)
  - Various type definitions for React and Node.js
- **Font**: Uses Geist font family loaded via next/font/google
</dependencies_and_installation>

<testing_instructions>
No testing framework is currently configured in this repository. There are no Jest, Vitest, or Cypress configurations present. If you need to add testing capabilities, you will need to:
1. Choose and install a testing framework (Jest, Vitest, or Cypress recommended for React/Next.js projects)
2. Configure the testing framework with appropriate setup files
3. Add test scripts to package.json
4. Create test files following the chosen framework's conventions
</testing_instructions>

<pull_request_formatting>
</pull_request_formatting>
