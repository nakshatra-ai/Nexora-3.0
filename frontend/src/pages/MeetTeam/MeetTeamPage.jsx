import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiCpu, FiAward, FiShield, FiCheckCircle } from 'react-icons/fi';

const teamMembers = [
  {
    name: 'Sawmiyaa Alaguvel',
    role: 'Database & System Design Lead',
    dept: 'DATA_ARCHITECTURE',
    tag: 'SA',
    desc: 'Maintains main relational schemas, ER diagram parameters, and indexed procedures.',
    skills: [
      { name: 'Schema Optimization', val: 95 },
      { name: 'Query Efficiency', val: 92 }
    ],
    badges: ['DBMS_SECURE', 'SYS_KERN'],
    social: { github: '#', linkedin: '#', mail: 'sawmiyaa@nexora.ai' }
  },
  {
    name: 'Mohanaselvam',
    role: 'Project Manager & Frontend Lead',
    dept: 'CORE_INTERFACE',
    tag: 'M',
    desc: 'Architects UX interfaces, layout frameworks, and responsive HUD navigation states.',
    skills: [
      { name: 'React HUD Systems', val: 96 },
      { name: 'Framer Animation', val: 94 }
    ],
    badges: ['UI_ARCH', 'UX_LEAD'],
    social: { github: '#', linkedin: '#', mail: 'mohana@nexora.ai' }
  },
  {
    name: 'Vigneshwaran',
    role: 'Backend & Authentication Lead',
    dept: 'SEC_AUTH_ENGINE',
    tag: 'V',
    desc: 'Implements server routers, JWT credentials validation, and role gateway checkpoints.',
    skills: [
      { name: 'JWT Auth Gateways', val: 94 },
      { name: 'API Attenuation', val: 89 }
    ],
    badges: ['JWT_CERT', 'NET_SEC'],
    social: { github: '#', linkedin: '#', mail: 'vignesh@nexora.ai' }
  },
  {
    name: 'Miyank',
    role: 'Operations & Workflow Lead',
    dept: 'SCHEDULING_CORE',
    tag: 'MY',
    desc: 'Coordinates automated routing engines, dispatch queue prioritization, and workloads.',
    skills: [
      { name: 'GPS Telemetry Routing', val: 93 },
      { name: 'Backlog Load Balance', val: 91 }
    ],
    badges: ['SLA_COMP', 'LOAD_BAL'],
    social: { github: '#', linkedin: '#', mail: 'miyank@nexora.ai' }
  },
  {
    name: 'Maheshwari',
    role: 'Testing & Research Lead',
    dept: 'QUALITY_ASSURANCE',
    tag: 'MW',
    desc: 'Automates regression suites, conducts load benchmarking, and validates API checks.',
    skills: [
      { name: 'Integration Tests', val: 92 },
      { name: 'Stress Benchmarks', val: 90 }
    ],
    badges: ['QA_CERT', 'BENCH_LEAD'],
    social: { github: '#', linkedin: '#', mail: 'mahesh@nexora.ai' }
  }
];

function TeamMemberCard({ member }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-6 bg-card-base/30 border border-border-base rounded-2xl flex flex-col justify-between gap-6 relative overflow-hidden transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_25px_rgba(0,229,255,0.06)] min-h-[360px] text-left"
    >
      {/* Top animated laser sweep when hovered */}
      {hovered && (
        <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400 animate-[pulse_1s_infinite] shadow-[0_0_8px_#00ffff]" />
      )}

      {/* Decorative corners */}
      <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-cyan-500/20" />
      <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-cyan-500/20" />

      {/* Profile Header */}
      <div className="flex justify-between items-start gap-4 z-10">
        <div className="flex flex-col gap-0.5">
          <span className="text-[7px] text-cyan-400 font-mono font-bold tracking-widest">[ {member.dept} ]</span>
          <h3 className="text-sm font-display font-black text-text-base tracking-wide uppercase mt-1">{member.name}</h3>
          <span className="text-[10px] text-text-secondary-base font-mono">{member.role}</span>
        </div>
        <div className="w-9 h-9 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-mono font-bold text-xs text-cyan-400">
          {member.tag}
        </div>
      </div>

      {/* Description */}
      <p className="text-[11px] text-text-secondary-base leading-relaxed z-10">{member.desc}</p>

      {/* Skill Gauges */}
      <div className="flex flex-col gap-3 z-10">
        <span className="text-[7.5px] text-text-muted-base font-bold uppercase tracking-wider">SKILL_MATRIX_VALUES:</span>
        <div className="flex flex-col gap-2">
          {member.skills.map((skill, sIdx) => (
            <div key={sIdx} className="flex flex-col gap-1 text-[9px]">
              <div className="flex justify-between text-text-secondary-base">
                <span>{skill.name}</span>
                <span className="text-cyan-400 font-bold">{skill.val}%</span>
              </div>
              <div className="w-full bg-cyan-950/20 h-1 rounded overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full transition-all duration-500" 
                  style={{ width: hovered ? `${skill.val}%` : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Badges & Social Links */}
      <div className="flex justify-between items-center border-t border-border-base/40 pt-4 mt-2 z-10">
        <div className="flex gap-1">
          {member.badges.map((badge, bIdx) => (
            <span key={bIdx} className="px-2 py-0.5 bg-cyan-500/5 border border-cyan-500/20 rounded font-mono text-[7px] text-cyan-400 font-bold uppercase tracking-wider">
              {badge}
            </span>
          ))}
        </div>
        
        <div className="flex gap-2">
          <a href={member.social.github} className="text-text-muted-base hover:text-cyan-400 transition-colors">
            <FiGithub size={12} />
          </a>
          <a href={member.social.linkedin} className="text-text-muted-base hover:text-cyan-400 transition-colors">
            <FiLinkedin size={12} />
          </a>
          <a href={`mailto:${member.social.mail}`} className="text-text-muted-base hover:text-cyan-400 transition-colors">
            <FiMail size={12} />
          </a>
        </div>
      </div>

    </div>
  );
}

export default function PersonnelPage() {
  return (
    <div className="min-h-screen bg-bg-base/30 py-12 px-6 md:px-12 relative overflow-hidden select-none font-mono">
      {/* Glow Orbs */}
      <div className="absolute top-[10%] left-[-5%] w-[450px] h-[450px] bg-blue-600/5 filter blur-[115px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] bg-cyan-500/5 filter blur-[110px] pointer-events-none" />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-16 border-b border-border-base pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-[0.25em]">[ STAFF LOGS // DIRECTORY ]</span>
          <h1 className="text-4xl font-display font-black text-text-base">System Personnel</h1>
          <p className="text-xs text-text-muted-base">Meet the developers and operations coordinators managing the Nexora platform.</p>
        </div>
        <div className="text-right text-[9px] text-text-muted-base hidden md:block">
          <span>STAFF_ONLINE: 5 // VERIFIED_KEYS: OK</span>
        </div>
      </div>

      {/* Grid of team cards */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, idx) => (
            <TeamMemberCard key={idx} member={member} />
          ))}
        </div>
      </div>

    </div>
  );
}
