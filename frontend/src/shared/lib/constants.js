export const TICKET_CATEGORIES = {
  Fiber: ['Total Blackout', 'Line Cuts / Physical Damage', 'Slow Latency', 'Intermittent Drops'],
  Cellular: ['No Signal', 'Poor Coverage', 'Call Drops', '5G Outage'],
  Billing: ['Wrong Charges', 'Plan Upgrade Request', 'Refund / Credit', 'Subscription Payment'],
  Hardware: ['Modem/ONT Replaced', 'Router Damaged', 'Terminal Block Error', 'Cabling Setup']
};

export const ROLE_CHOICES = [
  { value: 'customer', label: 'Customer' },
  { value: 'engineer', label: 'Field Engineer' },
  { value: 'admin', label: 'Administrator' }
];

export const APP_METRICS = {
  ping: '12ms',
  uptime: '99.98%',
  satisfaction: '98.6%',
  engineersCount: 12
};
