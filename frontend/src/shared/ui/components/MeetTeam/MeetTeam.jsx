import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

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
    desc: 'Validates SLA benchmarks, writes unit tests, and manages system manuals.',
    skills: [
      { name: 'SLA Quality Audits', val: 91 },
      { name: 'Unit Testing Coverage', val: 95 }
    ],
    badges: ['QA_CHECK', 'DOC_LEAD'],
    social: { github: '#', linkedin: '#', mail: 'maheshwari@nexora.ai' }
  }
];

export default function MeetTeam() {
  return (
    <section id="meet-team" className="py-24 px-6 md:px-12 select-none font-sans relative overflow-hidden bg-[#02040a]/40">
      
      {/* Background sweep line details */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2.5 text-center max-w-lg mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 font-mono">[ CYBER PERSONNEL DIRECTORY ]</span>
          <h2 className="text-3xl font-display font-bold text-text-base">Operations Specialists</h2>
          <p className="text-xs text-text-muted-base">The architects engineering the NEXORA AI Operating System.</p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {teamMembers.map((member, idx) => (
            <div 
              key={idx}
              className="panel-card p-6 bg-card-base/30 border border-border-base rounded-2xl flex flex-col justify-between items-center text-center relative overflow-hidden group hover:border-cyan-500/50 hover:shadow-[0_15px_30px_rgba(0,229,255,0.1)] transition-all duration-300 min-h-[440px]"
            >
              {/* Animated Vertical Scanner Sweep Light on Hover */}
              <div className="absolute left-0 top-0 w-full h-1 bg-cyan-400 opacity-0 group-hover:opacity-100 group-hover:animate-[scanSweep_2s_infinite_linear] pointer-events-none z-20 shadow-[0_0_8px_#00e5ff]" />

              {/* Corner brackets */}
              <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-cyan-500/20" />
              <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-cyan-500/20" />

              {/* Top Section: Avatar & Metadata */}
              <div className="flex flex-col items-center gap-4 w-full relative z-10">
                
                {/* Micro-HUD Avatar Ring */}
                <div className="relative w-18 h-18 rounded-full flex items-center justify-center border border-cyan-500/25 group-hover:border-cyan-400 shadow-[inset_0_0_10px_rgba(0,229,255,0.1)] transition-all duration-300">
                  {/* Inner spinning SVG details */}
                  <svg className="absolute inset-[-4px] text-cyan-500/40 group-hover:text-cyan-400 group-hover:animate-[spin_6s_linear_infinite]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" strokeDasharray="10 20" fill="none" />
                  </svg>
                  
                  {/* Initials */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600/80 to-cyan-500/80 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {member.tag}
                  </div>
                </div>

                <div className="flex flex-col gap-0.5">
                  <h4 className="text-sm font-bold text-text-base group-hover:text-cyan-400 transition-colors leading-tight truncate">
                    {member.name}
                  </h4>
                  <span className="text-[9px] font-mono text-cyan-500 font-bold uppercase tracking-wider mt-1 block">
                    {member.role}
                  </span>
                  <span className="text-[8px] font-mono text-text-muted-base uppercase tracking-widest mt-0.5">
                    DEP // {member.dept}
                  </span>
                </div>
              </div>

              {/* Middle Section: Skill Visualizers & Description */}
              <div className="w-full my-4 flex flex-col gap-4 relative z-10">
                <p className="text-[10px] text-text-secondary-base leading-relaxed border-b border-border-color/30 pb-3 h-[48px] overflow-hidden text-left">
                  {member.desc}
                </p>

                {/* Cyber Skill Progress Bars */}
                <div className="flex flex-col gap-2.5 text-left font-mono">
                  {member.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex flex-col gap-1">
                      <div className="flex justify-between text-[8px] text-text-muted-base font-bold">
                        <span>{skill.name.toUpperCase()}</span>
                        <span className="text-cyan-400">{skill.val}%</span>
                      </div>
                      <div className="h-1 w-full bg-cyan-950/20 rounded overflow-hidden relative">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300"
                          style={{ width: `${skill.val}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Section: Badges & Social Links */}
              <div className="w-full flex flex-col gap-3 relative z-10">
                
                {/* Cyber Badges */}
                <div className="flex justify-center gap-1.5 font-mono text-[7px] text-cyan-400 font-bold uppercase">
                  {member.badges.map((badge, bIdx) => (
                    <span 
                      key={bIdx}
                      className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-400/20 rounded shadow-[0_0_10px_rgba(0,229,255,0.05)] group-hover:border-cyan-400/40 transition-colors"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Social icons */}
                <div className="flex justify-center items-center gap-4 pt-2 border-t border-border-color/30 text-text-secondary-base">
                  <a href={member.social.github} className="hover:text-cyan-400 hover:scale-115 transition-all duration-200">
                    <FiGithub size={14} />
                  </a>
                  <a href={member.social.linkedin} className="hover:text-cyan-400 hover:scale-115 transition-all duration-200">
                    <FiLinkedin size={14} />
                  </a>
                  <a href={`mailto:${member.social.mail}`} className="hover:text-cyan-400 hover:scale-115 transition-all duration-200" title={member.social.mail}>
                    <FiMail size={14} />
                  </a>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
