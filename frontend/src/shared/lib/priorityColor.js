export default function priorityColor(priority) {
  const p = (priority || '').toLowerCase();
  switch (p) {
    case 'critical':
      return {
        bg: 'var(--danger-light)',
        text: 'var(--danger)',
        border: 'rgba(255, 77, 109, 0.3)'
      };
    case 'high':
      return {
        bg: 'rgba(239, 68, 68, 0.1)',
        text: '#ef4444',
        border: 'rgba(239, 68, 68, 0.2)'
      };
    case 'medium':
      return {
        bg: 'var(--warning-light)',
        text: 'var(--warning)',
        border: 'rgba(255, 184, 0, 0.3)'
      };
    default:
      return {
        bg: 'rgba(148, 163, 184, 0.1)',
        text: 'var(--text-muted)',
        border: 'var(--border-color)'
      };
  }
}
