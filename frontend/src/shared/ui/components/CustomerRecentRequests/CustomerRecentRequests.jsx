import React, { useContext } from 'react';
import { AppContext } from '../../../../app/providers/AppContext';
import { Link } from 'react-router-dom';
import Card from '../../Card/Card';
import Badge from '../../Badge/Badge';
import formatDate from '../../../lib/formatDate';

export default function CustomerRecentRequests() {
  const { requests } = useContext(AppContext);

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-display font-semibold text-text-base">My Service Tickets</h3>
        <Link to="/requests" className="text-xs text-primary-base hover:underline font-semibold font-sans">
          View All
        </Link>
      </div>

      <div className="divide-y divide-border-color">
        {requests.length === 0 ? (
          <p className="text-xs text-text-muted-base py-4">No active tickets filed yet.</p>
        ) : (
          requests.slice(0, 3).map((req) => (
            <div key={req.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-sans">
              <div className="flex flex-col gap-1 min-w-0">
                <Link to={`/request/${req.id}`} className="text-sm font-semibold text-text-base hover:text-primary-base truncate">
                  {req.title}
                </Link>
                <span className="text-xs text-text-muted-base">ID: {req.id} • Registered: {formatDate(req.createdAt)}</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge value={req.priority} type="priority" />
                <Badge value={req.status} type="status" />
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
