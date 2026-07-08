export default function statusColor(status) {
  const s = (status || '').toLowerCase();
  switch (s) {
    case 'resolved':
    case 'completed':
      return {
        bg: 'var(--success-light)',
        text: 'var(--success)',
        border: 'rgba(0, 255, 157, 0.3)'
      };
    case 'in progress':
    case 'active':
      return {
        bg: 'var(--primary-light)',
        text: 'var(--primary)',
        border: 'rgba(37, 99, 235, 0.3)'
      };
    case 'open':
    case 'pending':
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
