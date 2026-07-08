import React, { useState, useContext, useMemo } from 'react';
import { AppContext } from '../../app/providers/AppContext';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import SearchBar from '../../shared/ui/tables/SearchBar';
import Pagination from '../../shared/ui/tables/Pagination';
import DataTable from '../../shared/ui/tables/DataTable';
import Badge from '../../shared/ui/Badge/Badge';
import Card from '../../shared/ui/Card/Card';
import Button from '../../shared/ui/Button/Button';
import EmptyState from '../../shared/ui/tables/EmptyState';
import CreateRequestModal from '../../features/CreateRequestModal/CreateRequestModal';
import './ServiceRequestList.css';

export default function ServiceRequestList() {
  const { requests } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const itemsPerPage = 8;

  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortField(field);
  };

  const filteredRequests = useMemo(() => {
    return requests
      .filter((req) => {
        const matchesSearch = 
          req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          req.customer.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
        const matchesPriority = priorityFilter === 'All' || req.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];

        if (sortField === 'id') {
          valA = parseInt(a.id.split('-')[2]);
          valB = parseInt(b.id.split('-')[2]);
        }

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
  }, [requests, searchQuery, statusFilter, priorityFilter, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage) || 1;
  const paginatedRequests = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRequests.slice(start, start + itemsPerPage);
  }, [filteredRequests, currentPage]);

  const headers = ['Request ID', 'Title', 'Customer', 'Priority', 'Status', 'Assigned Engineer', 'Created Date'];

  return (
    <>
      <Card className="p-6">
      {/* Header controls bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 select-none font-sans">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <SearchBar
            placeholder="Search by ID, title, or customer..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-input-bg border border-input-border rounded-xl px-3 py-2 text-xs">
            <span className="text-text-secondary-base">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent focus:outline-none cursor-pointer font-bold text-accent-base"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Unresolved">Unresolved</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-input-bg border border-input-border rounded-xl px-3 py-2 text-xs">
            <span className="text-text-secondary-base">Priority:</span>
            <select
              value={priorityFilter}
              onChange={(e) => {
                setPriorityFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent focus:outline-none cursor-pointer font-bold text-accent-base"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <Button variant="primary" className="flex items-center gap-2 py-2" onClick={() => setShowCreateModal(true)}>
            <FiPlus size={14} />
            New Request
          </Button>
        </div>
      </div>

      {/* Main Table view */}
      {paginatedRequests.length === 0 ? (
        <EmptyState message="No service requests found" description="Try resetting your filters or add a new outage ticket." />
      ) : (
        <DataTable headers={headers}>
          {paginatedRequests.map((req) => (
            <tr 
              key={req.id} 
              className="hover:bg-primary-light-base/30 transition-colors duration-150 font-sans text-xs text-text-secondary-base"
            >
              <td className="p-4 font-bold text-primary-base">
                <Link to={`/request/${req.id}`} className="hover:underline">
                  {req.id}
                </Link>
              </td>
              <td className="p-4 font-semibold text-text-base truncate max-w-xs hover:text-primary-base transition-colors">
                <Link to={`/request/${req.id}`} className="hover:underline">
                  {req.title}
                </Link>
              </td>
              <td className="p-4 font-semibold">
                {req.customer}
              </td>
              <td className="p-4">
                <Badge type="priority" value={req.priority} />
              </td>
              <td className="p-4">
                <Badge type="status" value={req.status} />
              </td>
              <td className="p-4 font-medium">
                {req.assignedEngineer || 'Unassigned'}
              </td>
              <td className="p-4 text-right text-text-muted-base">
                {req.createdAt.split(',')[0]}
              </td>
            </tr>
          ))}
        </DataTable>
      )}

      {/* Pagination Footer */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </Card>
      <CreateRequestModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </>
  );
}
