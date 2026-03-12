import { useState, useEffect, useRef, useCallback } from 'react'

const SKILLS = [
  { cat: 'Languages', items: [{ name: 'Python', pct: 92 }, { name: 'JavaScript', pct: 88 }, { name: 'SQL', pct: 80 }] },
  { cat: 'Frameworks', items: [{ name: 'Next.js', pct: 88 }, { name: 'React.js', pct: 85 }, { name: 'FastAPI', pct: 90 }, { name: 'Django', pct: 82 }, { name: 'Node.js', pct: 84 }, { name: 'LangChain', pct: 78 }] },
  { cat: 'Tools', items: [{ name: 'Databricks', pct: 75 }, { name: 'Docker', pct: 80 }, { name: 'AWS', pct: 76 }, { name: 'Git', pct: 90 }, { name: 'Supabase', pct: 82 }, { name: 'Firebase', pct: 78 }] },
]

const EXPERIENCE = [
  {
    role: 'Software Engineer I', company: 'Softpers', date: 'Jun 2025 — Present', location: 'Lahore, Pakistan',
    points: [
      'Full-stack 0–1 aviation product using Next.js and Python (FastAPI) in a fast-paced startup.',
      'Engineered Databricks pipeline using Medallion Architecture for NOTAM data preprocessing.',
      'Automated AI-powered flight scheduling — aggregating multi-source data to eliminate manual planning.',
      'Designed Supabase (SQL) schema, migrating from Firebase for relational consistency.',
      'Integrated QuickBooks for invoicing — reducing manual accounting workload by 70%.',
      'Optimized CI/CD pipelines with DevOps teams for stable, high-availability releases.',
    ],
  },
  {
    role: 'Software Engineer I', company: 'SHARE Mobility', date: 'Jun 2024 — Jun 2025', location: 'Ohio, US · Remote',
    points: [
      'Full-stack development with Angular, Node.js, React.js, React Native, FastAPI, and LangChain.',
      'Developed and maintained a ride-hailing app improving booking experience and ride tracking.',
      'Upgraded Angular from v6 to v18 for the admin portal — modernizing UI and performance.',
      'Implemented rate limiting on FastAPI endpoints, reducing DDoS risk by over 70%.',
      'Built a RAG chatbot extracting data from Confluence for contextual in-platform responses.',
    ],
  },
  {
    role: 'IT Intern', company: 'KFC', date: 'Summer 2023', location: 'Lahore, Pakistan',
    points: [
      'Built Python data scraper reducing collection time from 3 hours to 10 minutes across all IPs.',
      'Created cash denomination system enhancing financial security and transaction tracking.',
      'Contributed to computer vision project using number plate recognition for drive-thru analytics.',
    ],
  },
  {
    role: 'Freelancer — Level 2 Seller', company: 'Fiverr', date: '2022 — 2024', location: 'Remote',
    points: [
      'Completed 80+ projects: Python automation, web scraping, data cleaning, and ML solutions.',
      'Built AI chatbots with LangChain and RAG-based data-driven applications.',
    ],
  },
]

const PROJECTS = [
  {
    name: 'Tapbak', num: '01',
    desc: 'Full-stack digital loyalty card platform enabling businesses to issue and manage cards integrated with Apple Wallet and Google Wallet. Stamp-based reward tracking with scalable auth.',
    tech: ['React', 'Django', 'PostgreSQL', 'Apple Wallet'],
    links: [{ label: 'Live', url: 'https://tapbak.co' }],
  },
  {
    name: 'Chatelio', num: '02',
    desc: 'Chatbot-as-a-service platform — companies sign up, upload knowledge bases, design AI chatbots, and publish with custom domains or shared links.',
    tech: ['Next.js', 'FastAPI', 'PostgreSQL'],
    links: [
      { label: 'Frontend', url: 'https://github.com/umariscoding/Chatelio' },
      { label: 'Backend', url: 'https://github.com/umariscoding/chatelio-api' },
    ],
  },
  {
    name: 'Botanic Sense', num: '03',
    desc: 'Plant identification app using ML trained on 300k+ images. Social platform features for community engagement among plant enthusiasts.',
    tech: ['Machine Learning', 'Python', 'Mobile'],
    links: [],
  },
]

const CERTS = [
  { name: 'Introduction to Cloud Computing', issuer: 'IBM — Coursera' },
  { name: 'Cloud Foundations', issuer: 'AWS' },
  { name: 'Supervised Machine Learning', issuer: 'Stanford & DeepLearning.AI' },
  { name: 'Backend Development', issuer: 'HKUST — Coursera' },
  { name: 'DevOps with AWS', issuer: 'LinkedIn' },
  { name: 'Code Bug Catcher', issuer: 'NASCON' },
  { name: 'IELTS English Test', issuer: '7.0 Band' },
]

const MARQUEE_ITEMS = ['Python', 'Next.js', 'React', 'FastAPI', 'Django', 'LangChain', 'Node.js', 'Docker', 'AWS', 'Databricks', 'Supabase']

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

function useStaggeredInView(count, threshold = 0.1) {
  const containerRef = useRef(null)
  const [visibleItems, setVisibleItems] = useState(new Set())
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const children = el.querySelectorAll('[data-animate]')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = Number(e.target.dataset.animate)
          setTimeout(() => setVisibleItems((prev) => new Set([...prev, idx])), idx * 100)
          obs.unobserve(e.target)
        }
      })
    }, { threshold })
    children.forEach((c) => obs.observe(c))
    return () => obs.disconnect()
  }, [count, threshold])
  return [containerRef, visibleItems]
}

function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const onMove = (e) => {
      if (dotRef.current) { dotRef.current.style.left = e.clientX - 4 + 'px'; dotRef.current.style.top = e.clientY - 4 + 'px' }
      if (ringRef.current) { ringRef.current.style.left = e.clientX + 'px'; ringRef.current.style.top = e.clientY + 'px' }
    }
    const onOver = (e) => { if (e.target.closest('a, button, .project-card, .cert-item, .stat-item')) setHovering(true) }
    const onOut = () => setHovering(false)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    return () => { window.removeEventListener('mousemove', onMove); document.removeEventListener('mouseover', onOver); document.removeEventListener('mouseout', onOut) }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring${hovering ? ' hovering' : ''}`} />
    </>
  )
}

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = ['experience', 'projects', 'skills', 'research', 'contact']
  const handleClick = useCallback(() => setMenuOpen(false), [])

  return (
    <nav className="nav">
      <div className="nav-logo">UA<span>.dev</span></div>
      <ul className="nav-links">
        {links.map((l) => <li key={l}><a href={`#${l}`}>{l}</a></li>)}
      </ul>
      <div className="nav-status"><div className="status-dot" /> Open to work</div>
      <button className={`hamburger${menuOpen ? ' active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span /><span /><span />
      </button>
      <div className={`mobile-menu${menuOpen ? ' active' : ''}`}>
        {links.map((l) => <a key={l} href={`#${l}`} onClick={handleClick}>{l}</a>)}
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid-bg" />
      <div className="hero-floats">
        <div className="float-el">{'// building things that matter'}</div>
        <div className="float-el">{'const impact = () => scale()'}</div>
        <div className="float-el">{'> 80+ projects delivered'}</div>
        <div className="float-el">{'status: shipping_fast'}</div>
      </div>
      <div className="hero-badge"><div className="status-dot" /> Available for opportunities</div>
      <h1 className="hero-name">
        <span className="line"><span className="line-inner first-name">Umar</span></span>
        <span className="line"><span className="line-inner last-name">Azhar</span></span>
      </h1>
      <p className="hero-subtitle">
        <span className="hl">Software Engineer</span> crafting full-stack products, data pipelines, and AI systems — from <span className="hl">0 to 1</span>.
      </p>
      <div className="hero-cta">
        <a href="#contact" className="btn-primary"><span>Get in Touch</span></a>
        <a href="#experience" className="btn-outline">View Work</a>
      </div>
      <div className="hero-scroll"><div className="scroll-line" /> Scroll to explore</div>
    </section>
  )
}

function StatsBar() {
  const stats = [
    { num: '2+', label: 'Years Experience' },
    { num: '80+', label: 'Projects Delivered' },
    { num: '1', label: 'Research Paper' },
    { num: '7', label: 'Certifications' },
  ]
  return (
    <div className="stats-bar">
      {stats.map((s) => (
        <div key={s.label} className="stat-item">
          <div className="stat-number">{s.num}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

function Marquee() {
  const content = MARQUEE_ITEMS.map((item, i) => (
    <span key={i}><span className="marquee-item">{item}</span><span className="marquee-sep">&bull;</span></span>
  ))
  return (
    <div className="marquee">
      <div className="marquee-track">
        <div className="marquee-content">{content}</div>
        <div className="marquee-content">{content}</div>
      </div>
    </div>
  )
}

function SectionHeader({ num, title }) {
  return (
    <div className="section-header">
      <span className="section-number">{num}</span>
      <h2 className="section-title">{title}</h2>
      <div className="section-line" />
    </div>
  )
}

function Experience() {
  const [containerRef, visibleItems] = useStaggeredInView(EXPERIENCE.length)
  return (
    <section id="experience" className="section" ref={containerRef}>
      <SectionHeader num="01" title="Experience" />
      {EXPERIENCE.map((exp, i) => (
        <div key={i} data-animate={i} className={`exp-item${visibleItems.has(i) ? ' visible' : ''}`}>
          <div>
            <div className="exp-date">{exp.date}</div>
            <div className="exp-location">{exp.location}</div>
          </div>
          <div>
            <h3 className="exp-role">{exp.role}</h3>
            <div className="exp-company">{exp.company}</div>
            <ul className="exp-details">
              {exp.points.map((p, j) => <li key={j}>{p}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </section>
  )
}

function Projects() {
  const [containerRef, visibleItems] = useStaggeredInView(PROJECTS.length)
  return (
    <section id="projects" className="section" ref={containerRef}>
      <SectionHeader num="02" title="Projects" />
      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <div key={i} data-animate={i} className={`project-card${visibleItems.has(i) ? ' visible' : ''}`}>
            <div className="project-header">
              <div className="project-num">{p.num}</div>
              <div className="project-links">
                {p.links.length > 0
                  ? p.links.map((l, j) => <a key={j} href={l.url} target="_blank" rel="noopener noreferrer" className="project-link">{l.label}</a>)
                  : <span className="project-link disabled">FYP</span>}
              </div>
            </div>
            <h3 className="project-name">{p.name}</h3>
            <p className="project-desc">{p.desc}</p>
            <div className="project-tech">
              {p.tech.map((t) => <span key={t} className="tech-tag">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Skills() {
  const [containerRef, visibleItems] = useStaggeredInView(SKILLS.length)
  return (
    <section id="skills" className="section" ref={containerRef}>
      <SectionHeader num="03" title="Skills" />
      <div className="skills-container">
        {SKILLS.map((cat, i) => (
          <div key={i} data-animate={i} className={`skill-category${visibleItems.has(i) ? ' visible' : ''}`}>
            <div className="skill-cat-title">{cat.cat}</div>
            {cat.items.map((s) => (
              <div key={s.name} className="skill-item">
                <span className="skill-name">{s.name}</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" style={{ width: visibleItems.has(i) ? `${s.pct}%` : '0%' }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

function Research() {
  const [ref, visible] = useInView()
  return (
    <section id="research" className="section">
      <SectionHeader num="04" title="Research" />
      <div ref={ref} className={`research-card${visible ? ' visible' : ''}`}>
        <div className="research-label">Publication · 2024–2025</div>
        <h3 className="research-title">Machine Learning-Based Fileless Malware Threats Analysis for the Detection of Cybersecurity Attacks Based on Memory Forensics</h3>
        <ul className="research-points">
          <li>Researched detection of fileless malware residing in system memory, evading traditional antivirus.</li>
          <li>Applied ML and memory forensics to identify malicious artifacts and improve detection accuracy.</li>
          <li>Proposed an enhanced framework for identifying in-memory cyberattacks.</li>
        </ul>
        <div className="research-journal">Published in The Asian Bulletin of Big Data Management</div>
        <a href="https://abbdm.com/index.php/Journal/article/view/289" target="_blank" rel="noopener noreferrer" className="research-link">Read Paper &rarr;</a>
      </div>
    </section>
  )
}

function Education() {
  const [ref, visible] = useInView()
  return (
    <section className="section">
      <SectionHeader num="05" title="Education" />
      <div ref={ref} className={`edu-card${visible ? ' visible' : ''}`}>
        <div className="edu-year">2020–24</div>
        <div className="edu-divider" />
        <div>
          <div className="edu-degree">Bachelor of Computer Science</div>
          <div className="edu-school">National University of Computer and Emerging Sciences (FAST)</div>
          <div className="edu-location">Lahore, Pakistan</div>
        </div>
      </div>
    </section>
  )
}

function Certifications() {
  const [containerRef, visibleItems] = useStaggeredInView(CERTS.length)
  return (
    <section className="section" ref={containerRef}>
      <SectionHeader num="06" title="Certifications" />
      <div className="certs-grid">
        {CERTS.map((c, i) => (
          <div key={i} data-animate={i} className={`cert-item${visibleItems.has(i) ? ' visible' : ''}`}>
            <div className="cert-name">{c.name}</div>
            <div className="cert-issuer">{c.issuer}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Extras() {
  const [containerRef, visibleItems] = useStaggeredInView(2)
  return (
    <section className="section" ref={containerRef}>
      <SectionHeader num="07" title="Beyond Code" />
      <div className="extras-row">
        <div data-animate={0} className={`extra-item${visibleItems.has(0) ? ' visible' : ''}`}>Horse riding and equestrian activities</div>
        <div data-animate={1} className={`extra-item${visibleItems.has(1) ? ' visible' : ''}`}>Inter-University Cricket Tournament — Semi-finalist</div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-tag">Get in Touch</div>
      <h2 className="footer-heading"><a href="mailto:umarazhar235@gmail.com">Let&apos;s Build Something</a></h2>
      <div className="footer-links">
        <a href="mailto:umarazhar235@gmail.com" className="footer-link">umarazhar235@gmail.com</a>
        <a href="tel:+923226575488" className="footer-link">+92 322 657 5488</a>
        <a href="https://www.linkedin.com/in/umarazhar235" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
      </div>
      <div className="footer-copy">&copy; 2026 Umar Azhar. All rights reserved.</div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Cursor />
      <div className="grain" />
      <Nav />
      <Hero />
      <StatsBar />
      <Marquee />
      <Experience />
      <Projects />
      <Skills />
      <Research />
      <Education />
      <Certifications />
      <Extras />
      <Footer />
    </>
  )
}
