# PrototypeGeneratorToolbar Component

## Overview

The `PrototypeGeneratorToolbar` component displays a toolbar after each AI evaluation message in the project evaluation chat interface. It manages the lifecycle of prototype version generation with 4 distinct states.

## Component States

### 1. Pending State (Initial)
- **Display**: "Generate Prototype" button
- **Action**: User can click to initiate prototype generation
- **Trigger**: POST request to `/project/:projectId/prototype-version` with messageId

### 2. Generating State
- **Display**: Loading spinner + "Generating prototype, please wait" message
- **Behavior**: 
  - Automatically starts polling the API every 3 seconds
  - Polls `/project/:projectId/prototype-version/message/:messageId`
  - Continues until status changes to 'completed' or 'failed'
  - Timeout after 5 minutes

### 3. Completed State
- **Display**: Two clickable links
  - "View Preview" - Opens previewUrl in new tab
  - "View AI Log" - Opens logUrl in new tab
- **Data Required**: previewUrl and/or logUrl from API

### 4. Failed State
- **Display**: Error message + "View AI Log" link
- **Data Shown**: errorMessage from API response
- **Action**: User can click to view AI log for debugging

## Props

```typescript
interface PrototypeGeneratorToolbarProps {
  projectId: number;    // ID of the project
  messageId: number;    // ID of the AI evaluation message
}
```

## API Integration

### Expected Backend Endpoints

1. **Create Prototype Version**
   - Method: POST
   - URL: `/project/:projectId/prototype-version`
   - Body: `{ messageId: number }`
   - Response: `PrototypeVersion` object

2. **Get Prototype Version by Message**
   - Method: GET
   - URL: `/project/:projectId/prototype-version/message/:messageId`
   - Response: `PrototypeVersion` object or 404

### Data Types

```typescript
enum PrototypeVersionStatus {
  PENDING = 'pending',
  GENERATING = 'generating',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

interface PrototypeVersion {
  id: number;
  projectId: number;
  messageId: number;
  status: PrototypeVersionStatus;
  previewUrl?: string;
  logUrl?: string;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}
```

## Integration

The component is integrated in `pages/dashboard/project/[id].tsx` and only displays after AI evaluation messages:

```tsx
{isBot && evaluation && (
  <PrototypeGeneratorToolbar projectId={this.projectId} messageId={id as number} />
)}
```

## Translations

The component uses the following translation keys:

- `generate_prototype` - "Generate Prototype"
- `generating` - "Generating..."
- `prototype_generating` - "Generating prototype, please wait"
- `view_preview` - "View Preview"
- `view_ai_log` - "View AI Log"
- `prototype_generation_failed` - "Prototype generation failed"

Available in:
- Chinese Simplified (zh-CN)
- Chinese Traditional (zh-TW)
- English (en-US)

## State Flow Diagram

```
[Initial Load]
     ↓
[Check for existing version]
     ↓
  ┌─ [No version] → [State 1: Pending - Show Generate Button]
  │                          ↓ (User clicks)
  │                   [Create Version Request]
  │                          ↓
  └─ [Version exists] → [Check status]
                             ↓
                        ┌────┴────┬──────────┬────────┐
                        ↓         ↓          ↓        ↓
                   [pending]  [generating] [completed] [failed]
                        ↓         ↓          ↓        ↓
                   [State 1] [State 2]  [State 3]  [State 4]
                              ↓ (Poll every 3s)
                           [Update status]
                              ↓
                        [If completed/failed]
                              ↓
                        [Stop polling]
```

## Error Handling

- **404 Errors**: Treated as "no version exists" (returns null silently)
- **Other Errors**: Logged to console, returns null
- **Network Failures**: Component continues to poll with exponential backoff built into the interval
- **Timeout**: Polling automatically stops after 5 minutes

## Testing Considerations

1. Test initial state with no existing version
2. Test creation of new version
3. Test polling during generation
4. Test successful completion with preview and log URLs
5. Test failure state with error message
6. Test network failure scenarios
7. Test multiple messages in same chat (each has independent state)

## Future Enhancements

When PR #24 in the data-server repository is merged, the `PrototypeVersion` interface can be replaced with the imported `Base` class:

```typescript
import { Base } from '@idea2app/data-server';

export class PrototypeVersion extends Base {
  // ... rest of the properties
}
```
