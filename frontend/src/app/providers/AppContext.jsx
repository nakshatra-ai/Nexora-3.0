import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import useTheme from '../../shared/lib/hooks/useTheme';

export const AppContext = createContext();

const initialRequests = [
  {
    id: 'NXR-2026-125',
    title: 'Fiber Cable Cut',
    category: 'Internet',
    priority: 'Critical',
    status: 'Open',
    createdAt: '08 Jul 2026, 09:00 AM',
    assignedEngineer: 'Rahul Sharma'
  }
];

const initialEngineers = [
  { id: 'E-001', name: 'Rahul Sharma', status: 'Online', activeTasks: 1, location: 'Sector 15' }
];

export const AppProvider = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('nexora_requests_v2');
    return saved ? JSON.parse(saved) : initialRequests;
  });

  const [engineers, setEngineers] = useState(() => {
    const saved = localStorage.getItem('nexora_engineers_v2');
    return saved ? JSON.parse(saved) : initialEngineers;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('nexora_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [adminPinValidated, setAdminPinValidated] = useState(() => {
    return localStorage.getItem('nexora_admin_validated') === 'true';
  });

  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    localStorage.setItem('nexora_requests_v2', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('nexora_engineers_v2', JSON.stringify(engineers));
  }, [engineers]);

  useEffect(() => {
    localStorage.setItem('nexora_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('nexora_admin_validated', adminPinValidated.toString());
  }, [adminPinValidated]);

  const addRequest = (newReq) => {
    const idNum = requests.length > 0 ? Math.max(...requests.map(r => parseInt(r.id.split('-')[2]))) + 1 : 125;
    const formattedId = `NXR-2026-${idNum}`;
    
    const requestObject = {
      ...newReq,
      id: formattedId,
      createdAt: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }) + `, ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
      timeline: [
        {
          id: 1,
          type: 'created',
          time: new Date().toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short', year: 'numeric' }),
          label: 'Request Created',
          details: `Ticket opened by ${newReq.customer}`
        }
      ],
      assignedEngineer: '-',
      resolutionNotes: '',
      resolvedAt: '',
      resolutionTime: ''
    };

    setRequests(prev => [requestObject, ...prev]);
    
    // Add to activities
    setRecentActivities(prev => [
      {
        id: Date.now(),
        text: `New request ${formattedId} created`,
        time: 'Just now',
        type: 'created'
      },
      ...prev.slice(0, 7)
    ]);
  };

  const updateRequestStatus = (id, newStatus, resolutionNotes = '', assignedEng = '') => {
    setRequests(prev => prev.map(req => {
      if (req.id === id) {
        const timestamp = new Date().toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short', year: 'numeric' });
        const timelineItem = {
          id: req.timeline.length + 1,
          time: timestamp
        };

        let updatedFields = { status: newStatus };

        if (newStatus === 'In Progress') {
          timelineItem.type = 'status';
          timelineItem.label = 'Status Updated to In Progress';
          timelineItem.details = `Engineer ${req.assignedEngineer !== '-' ? req.assignedEngineer : 'assigned'} updated work progress`;
        } else if (newStatus === 'Resolved') {
          timelineItem.type = 'resolved';
          timelineItem.label = 'Resolved';
          timelineItem.details = resolutionNotes || 'Work marked as completed.';
          
          updatedFields.resolutionNotes = resolutionNotes;
          updatedFields.resolvedAt = timestamp;
          
          // Calculate mock resolution time
          const createdTime = new Date(req.createdAt).getTime();
          const resolvedTime = Date.now();
          const diffMs = resolvedTime - (isNaN(createdTime) ? resolvedTime - 12000000 : createdTime);
          const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
          const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
          
          updatedFields.resolutionTime = diffHrs > 0 ? `${diffHrs} Hours ${diffMins} Minutes` : `${diffMins} Minutes`;
        } else if (newStatus === 'Open') {
          timelineItem.type = 'created';
          timelineItem.label = 'Status Reopened';
          timelineItem.details = 'Ticket reopened by Admin/Customer';
        }

        if (assignedEng && assignedEng !== req.assignedEngineer) {
          updatedFields.assignedEngineer = assignedEng;
          
          // Add engineer assignment timeline log
          const assignLog = {
            id: req.timeline.length + 2,
            type: 'assigned',
            time: timestamp,
            label: `Assigned to ${assignedEng}`,
            details: `Engineer assigned to resolve request.`
          };
          
          // Increment workload of new engineer
          setEngineers(prevEngs => prevEngs.map(e => {
            if (e.name === assignedEng) return { ...e, workload: e.workload + 1 };
            if (e.name === req.assignedEngineer) return { ...e, workload: Math.max(0, e.workload - 1) };
            return e;
          }));

          return {
            ...req,
            ...updatedFields,
            timeline: [...req.timeline, assignLog, timelineItem]
          };
        }

        return {
          ...req,
          ...updatedFields,
          timeline: [...req.timeline, timelineItem]
        };
      }
      return req;
    }));

    // Add activity log
    setRecentActivities(prev => [
      {
        id: Date.now(),
        text: `Request ${id} status updated to ${newStatus}`,
        time: 'Just now',
        type: newStatus === 'Resolved' ? 'resolved' : 'status'
      },
      ...prev.slice(0, 7)
    ]);
  };

  const loginUser = async (email, password, roleHint) => {
    try {
      const response = await axios.post('http://localhost:8000/api/admin/auth/login/', {
        email,
        password
      });
      const userObj = response.data.user;
      setCurrentUser(userObj);
      return userObj;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setAdminPinValidated(false);
    localStorage.removeItem('nexora_user');
    localStorage.removeItem('nexora_admin_validated');
  };

  return (
    <AppContext.Provider value={{
      requests,
      engineers,
      currentUser,
      adminPinValidated,
      recentActivities,
      theme,
      toggleTheme,
      isSidebarCollapsed,
      setIsSidebarCollapsed,
      setAdminPinValidated,
      addRequest,
      updateRequestStatus,
      loginUser,
      logoutUser,
      setCurrentUser
    }}>
      {children}
    </AppContext.Provider>
  );
};
