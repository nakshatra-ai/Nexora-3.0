export default function formatDate(dateString) {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // fallback
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }) + `, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  } catch (err) {
    return dateString;
  }
}
