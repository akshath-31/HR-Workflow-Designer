import type { AutomationAction } from '../types/workflow'

const MOCK_AUTOMATIONS: AutomationAction[] = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
  { id: 'send_slack', label: 'Send Slack Message', params: ['channel', 'message'] },
  { id: 'create_ticket', label: 'Create JIRA Ticket', params: ['project', 'summary'] },
  { id: 'update_hris', label: 'Update HRIS Record', params: ['employeeId', 'field', 'value'] },
]

export async function getAutomations(): Promise<AutomationAction[]> {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 300))
  return MOCK_AUTOMATIONS
}
