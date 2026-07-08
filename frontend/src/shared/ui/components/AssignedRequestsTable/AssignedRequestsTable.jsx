import React from 'react';
import Badge from '../../Badge/Badge';

export default function AssignedRequestsTable({ requests = [], selectedReqId, onSelect }) {
  return (
    <div className="overflow-x-auto select-none font-sans">
      <table className="w-full text-left border-collapse min-w-[500px]">
        <thead>
          <tr className="border-b border-border-base text-text-muted-base text-xs uppercase font-semibold tracking-wider bg-surface-base">
            <th className="py-3 px-3">Request ID</th>
            <th className="py-3 px-3">Title</th>
            <th className="py-3 px-3 text-center">Priority</th>
            <th className="py-3 px-3 text-center">Status</th>
            <th className="py-3 px-3">Customer</th>
            <th className="py-3 px-3 text-right">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-color text-xs">
          {requests.length > 0 ? (
            requests.map((req) => (
              <tr 
                key={req.id} 
                onClick={() => onSelect(req.id)}
                className={`hover:bg-primary-light-base/30 cursor-pointer transition-colors duration-150 ${
                  selectedReqId === req.id ? 'bg-primary-light-base text-primary-base font-semibold' : 'text-text-secondary-base'
                }`}
              >
                <td className="py-3.5 px-3 font-bold text-accent-base flex items-center gap-1.5">
                  {req.id}
                  {selectedReqId === req.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-base animate-ping" />
                  )}
                </td>
                <td className="py-3.5 px-3 truncate max-w-[150px]">
                  {req.title}
                </td>
                <td className="py-3.5 px-3 text-center">
                  <Badge type="priority" value={req.priority} />
                </td>
                <td className="py-3.5 px-3 text-center">
                  <Badge type="status" value={req.status} />
                </td>
                <td className="py-3.5 px-3 font-medium">{req.customer}</td>
                <td className="py-3.5 px-3 text-right text-text-muted-base">{req.createdAt.split(',')[0]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-8 text-center text-text-muted-base">
                No active requests assigned to you.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
