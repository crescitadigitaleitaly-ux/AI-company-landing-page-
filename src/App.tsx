import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { LazyMotion, domAnimation, m, MotionConfig, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  Menu,
  X,
  Activity,
  Layers3,
  Workflow,
  Cpu,
  Network,
  Radio,
  Box,
  Check,
  ChevronDown,
  ShieldCheck,
  CircleHelp,
  Sun,
  Moon,
} from 'lucide-react';
import { navigation, challenges, capabilities, applications, assets } from './content';

function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <a href="#top" className={`logo ${footer ? 'footer-logo' : ''}`} aria-label="Aervek home">
      <svg viewBox="0 0 36 36" aria-hidden="true">
        <path d="M3 29 17 5h7L10 29zm16-13h7l8 13h-7z" fill="currentColor" />
      </svg>
      <span>
        AERVEK<span className="logo-dot">.</span>
      </span>
    </a>
  );
}
function ArrowLink({
  children,
  href = '#contact',
  primary = false,
  className = '',
  onClick,
}: {
  children: ReactNode;
  href?: string;
  primary?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      onClick={onClick}
      className={`button ${primary ? 'primary' : 'secondary'} ${className}`}
      href={href}
    >
      {children}
      <ArrowUpRight size={17} />
    </a>
  );
}
function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={{ opacity: 1, y: reduce ? 0 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </m.div>
  );
}
function SectionLabel({ children, number }: { children: ReactNode; number: string }) {
  return (
    <div className="eyebrow">
      <span className="section-cross">+</span>
      {children}
      <span className="section-number">{number}</span>
    </div>
  );
}
function Header({ theme, onToggle }: { theme: 'dark' | 'light'; onToggle: () => void }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [open]);
  return (
    <header className="header">
      <div className="nav-shell">
        <Logo />
        <nav aria-label="Main navigation" className={open ? 'navigation open' : 'navigation'}>
          {navigation.map(([name, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {name}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}>
            Contact
          </a>
          <a href="#contact" className="mobile-cta" onClick={() => setOpen(false)}>
            Request a Demo <ArrowUpRight size={16} />
          </a>
        </nav>
        <ArrowLink className="nav-cta">Request a Demo</ArrowLink>
        <button
          className="theme-toggle"
          onClick={onToggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          title={`View ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <picture className="hero-picture">
        <source media="(max-width: 650px)" srcSet="/hero-mobile.webp" />
        <img
          src="/hero.webp"
          width="1536"
          height="1024"
          alt="Illustrative precision robotic arm in a cinematic industrial facility"
          fetchPriority="high"
        />
      </picture>
      <div className="hero-shade" />
      <div className="hero-grid" />
      <div className="container hero-content">
        <m.div
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.65 }}
          className="hero-copy"
        >
          <div className="hero-kicker">
            <span className="status-dot" />
            INTELLIGENCE, GROUNDED IN INDUSTRY
          </div>
          <h1 id="hero-title">
            Intelligence for
            <br />
            the <span>physical</span>
            <br />
            <span>world.</span>
          </h1>
          <p>
            Built for the work that keeps the world moving.
            <br className="desktop-break" /> Connect the signals. Give your people a clearer next
            step.
          </p>
          <div className="hero-actions">
            <ArrowLink primary href="#platform">
              Explore the Platform
            </ArrowLink>
            <a className="text-link" href="#contact">
              Request a Demo <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="hero-note">
            <span />
            LESS GUESSWORK. MORE UNDERSTANDING.
          </div>
        </m.div>
        <div className="machine-tag">
          <div>
            <span className="status-dot" /> PHYSICAL SYSTEM / 001
          </div>
          <strong>Intelligence in motion.</strong>
          <span>Illustrative robotic system</span>
          <svg viewBox="0 0 170 30" aria-hidden="true">
            <path
              d="M0 23h20l5-5 6 9 6-19 7 15h22l5-10 5 14 7-22 7 18h18l5-8 5 11 7-17 8 14h37"
              fill="none"
              stroke="currentColor"
            />
          </svg>
        </div>
        <div className="hero-footer">
          <a href="#challenge">
            <span className="scroll-icon">
              <ArrowDown size={15} />
            </span>
            SCROLL TO EXPLORE
          </a>
          <span>THE PHYSICAL WORLD DESERVES BETTER SOFTWARE.</span>
          <span className="hero-coordinates">01 — 06</span>
        </div>
      </div>
    </section>
  );
}
function Challenge() {
  return (
    <section id="challenge" className="section challenge">
      <div className="container">
        <SectionLabel number="01">THE OPPORTUNITY</SectionLabel>
        <Reveal className="section-intro">
          <h2>
            Industry generates data.
            <br />
            <span>Intelligence makes it matter.</span>
          </h2>
          <p>
            The next chapter of industry starts with a clearer understanding of what’s happening on
            the ground. And what to do next.
          </p>
        </Reveal>
        <div className="challenge-layout">
          <figure className="field-photo">
            <img
              src="/manufacturing.webp"
              width="700"
              height="620"
              loading="lazy"
              alt="Robotic production equipment surrounding a car body on the factory floor"
            />
            <figcaption>
              <span>THE FACTORY FLOOR</span>
              <span>Where every signal has a story.</span>
            </figcaption>
            <div className="field-stamp" aria-hidden="true">
              <span>
                PHYSICAL
                <br />
                WORLD.
              </span>
              <ArrowUpRight size={25} />
            </div>
          </figure>
          <div className="challenge-grid">
            {challenges.map((c, i) => (
              <Reveal key={c.title} className="challenge-item">
                <div className={`signal-art signal-${i}`} aria-hidden="true">
                  {i === 0 ? (
                    <>
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </>
                  ) : i === 1 ? (
                    <svg viewBox="0 0 200 55">
                      <path
                        d="M0 35h35l5-8 7 17 7-32 8 23h28l9-17 9 25 9-33 9 25h74"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.3"
                      />
                      <path d="M142 0v55" stroke="#79889c" strokeDasharray="3 4" />
                    </svg>
                  ) : (
                    <>
                      <span />
                      <span />
                      <span />
                    </>
                  )}
                </div>
                <small>{c.label}</small>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function Platform() {
  return (
    <section id="platform" className="section platform">
      <div className="container">
        <SectionLabel number="02">THE AERVEK PLATFORM</SectionLabel>
        <Reveal className="section-intro">
          <h2>
            One intelligence layer.
            <br />
            <span>Your entire operation.</span>
          </h2>
          <p>
            A concept for connecting fragmented signals, understanding machine behavior and putting
            useful intelligence in the hands of your team.
          </p>
        </Reveal>
        <div className="platform-thesis">
          <span className="thesis-mark" aria-hidden="true">
            ↳
          </span>
          <p>
            Machines speak in signals.
            <br />
            <span>Progress starts when people can understand them.</span>
          </p>
          <span className="thesis-caption">THE THINKING BEHIND AERVEK</span>
        </div>
        <div className="architecture">
          {[
            {
              icon: Radio,
              title: 'Connect',
              label: 'MACHINES & SENSORS',
              body: 'Signals from the physical world',
            },
            {
              icon: Network,
              title: 'Unify',
              label: 'DATA INTEGRATION',
              body: 'A shared operational context',
            },
            {
              icon: Cpu,
              title: 'Understand',
              label: 'AI INTELLIGENCE',
              body: 'Patterns, insights and possibilities',
            },
            {
              icon: Workflow,
              title: 'Act',
              label: 'OPERATIONAL DECISIONS',
              body: 'Informed people. Clear next steps.',
            },
          ].map((step, i) => (
            <div
              className={`architecture-step ${i === 2 ? 'intelligence-step' : ''}`}
              key={step.title}
            >
              <div className="architecture-line">
                <span className="step-index">0{i + 1}</span>
                <div className="step-icon">
                  <step.icon size={27} strokeWidth={1.3} />
                </div>
                {i < 3 ? <ArrowRight className="flow-arrow" size={17} /> : null}
              </div>
              <span className="micro">{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
        <div className="platform-note">
          <ShieldCheck size={15} />
          <span>Designed around existing systems. Guided by human expertise.</span>
          <span>CONCEPT ARCHITECTURE</span>
        </div>
      </div>
    </section>
  );
}
function Dashboard() {
  const [selected, setSelected] = useState(0);
  const [range, setRange] = useState('24H');
  const [details, setDetails] = useState(false);
  const asset = assets[selected];
  const values =
    range === '1H'
      ? asset.values.slice(-12)
      : range === '7D'
        ? asset.values.map((v, i) => v + Math.sin(i * 2) * 8)
        : asset.values;
  const points = values
    .map((v, i) => `${(i / (values.length - 1)) * 640},${170 - v * 1.65}`)
    .join(' ');
  return (
    <section className="section product-section">
      <div className="container">
        <div className="product-heading">
          <div>
            <div className="eyebrow">
              <span className="section-cross">+</span>FROM SIGNAL TO INSIGHT
            </div>
            <h2>
              A clearer view.
              <br />
              <span>A smarter next move.</span>
            </h2>
          </div>
          <p>
            Explore a working interface concept.
            <br />
            Select an asset. Follow the signal.
          </p>
        </div>
        <Reveal className="dashboard">
          <aside className="dash-sidebar">
            <div className="dash-brand">
              <svg viewBox="0 0 36 36" aria-hidden="true">
                <path d="M3 29 17 5h7L10 29zm16-13h7l8 13h-7z" fill="currentColor" />
              </svg>
              <span>
                AERVEK<span className="muted"> / OS</span>
              </span>
            </div>
            <span className="sidebar-caption">WORKSPACE</span>
            <div className="sidebar-active">
              <Layers3 size={16} />
              Operations
            </div>
            <div className="sidebar-section-label">
              ASSETS <span>03</span>
            </div>
            {assets.map((a, i) => (
              <button
                className={`asset-button ${i === selected ? 'selected' : ''}`}
                key={a.id}
                onClick={() => {
                  setSelected(i);
                  setDetails(false);
                }}
                aria-pressed={i === selected}
              >
                <Box size={15} />
                <span>
                  {a.name}
                  <small>{a.id}</small>
                </span>
                <span className={i === 1 ? 'asset-dot amber' : 'asset-dot'} />
              </button>
            ))}
            <div className="sidebar-bottom">
              <span className="status-dot" />
              SYNTHETIC DATA ENVIRONMENT
            </div>
          </aside>
          <div className="dash-main">
            <div className="dash-topbar">
              <span>
                Workspace <span>/</span> Operations overview
              </span>
              <div>
                <span className="status-dot" />
                Sample environment
              </div>
            </div>
            <div className="dash-title">
              <div>
                <span className="micro">{asset.location.toUpperCase()}</span>
                <h3>
                  {asset.name}
                  <span>{asset.id}</span>
                </h3>
              </div>
              <button
                className="details-button"
                onClick={() => setDetails(!details)}
                aria-expanded={details}
              >
                Asset details <ChevronDown size={14} className={details ? 'rotated' : ''} />
              </button>
            </div>
            {details ? (
              <div className="asset-details" role="status">
                <strong>
                  {asset.id} · {asset.location}
                </strong>
                <p>
                  Illustrative asset profile · Operating load: {asset.load}% · Temperature:{' '}
                  {asset.temperature}°C · This equipment is fictional.
                </p>
              </div>
            ) : null}
            <div className="dash-metrics">
              <div>
                <span>
                  Asset health <Activity size={14} />
                </span>
                <strong>
                  {asset.health}
                  <small>/100</small>
                </strong>
                <p>
                  <span className={selected === 1 ? 'amber-text' : 'green-text'}>●</span>{' '}
                  {asset.status}
                </p>
              </div>
              <div>
                <span>
                  Temperature <Radio size={14} />
                </span>
                <strong>
                  {asset.temperature}
                  <small>°C</small>
                </strong>
                <p>Sample operating temperature</p>
              </div>
              <div>
                <span>
                  Vibration <Activity size={14} />
                </span>
                <strong>
                  {asset.vibration.toFixed(1)}
                  <small>mm/s</small>
                </strong>
                <p>RMS velocity · synthetic</p>
              </div>
            </div>
            <div className="telemetry">
              <div className="chart-heading">
                <div>
                  <h4>Machine telemetry</h4>
                  <span>
                    <i />
                    Vibration trend <span className="chart-unit">/ normalized sample</span>
                  </span>
                </div>
                <div className="range-buttons" role="group" aria-label="Telemetry time range">
                  {['1H', '24H', '7D'].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRange(r)}
                      aria-pressed={r === range}
                      className={r === range ? 'active' : ''}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div className="chart">
                <div className="chart-y">
                  <span>100</span>
                  <span>75</span>
                  <span>50</span>
                  <span>25</span>
                </div>
                <svg
                  viewBox="0 0 640 180"
                  preserveAspectRatio="none"
                  role="img"
                  aria-label={`${asset.name} synthetic vibration trend over ${range}`}
                >
                  <defs>
                    <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#62a4ff" stopOpacity=".22" />
                      <stop offset="100%" stopColor="#62a4ff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[15, 60, 105, 150].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      x2="640"
                      y1={y}
                      y2={y}
                      stroke="#28323d"
                      strokeWidth="1"
                      strokeDasharray="3 5"
                    />
                  ))}
                  <polygon points={`0,180 ${points} 640,180`} fill="url(#chart-fill)" />
                  <polyline
                    points={points}
                    fill="none"
                    stroke="#80b7ff"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
              <div className="chart-x">
                {(range === '1H'
                  ? ['09:00', '09:15', '09:30', '09:45', '10:00']
                  : range === '7D'
                    ? ['MON', 'TUE', 'WED', 'THU', 'FRI']
                    : ['00:00', '06:00', '12:00', '18:00', '24:00']
                ).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
            <div className="insight">
              <div className="insight-icon">
                <Cpu size={20} />
              </div>
              <div>
                <span>
                  AI-ASSISTED INSIGHT <span>ILLUSTRATIVE</span>
                </span>
                <p aria-live="polite">{asset.note}</p>
              </div>
              <ArrowUpRight size={18} />
            </div>
          </div>
        </Reveal>
        <div className="preview-caption">
          <span>
            <span className="status-dot" />
            INTERACTIVE PRODUCT CONCEPT
          </span>
          <span>
            All assets, readings and recommendations are synthetic. No live equipment is connected.
          </span>
        </div>
      </div>
    </section>
  );
}
function Capabilities() {
  const icons = [Activity, Workflow, Cpu, Layers3];
  return (
    <section className="section technology" id="technology">
      <div className="container">
        <SectionLabel number="03">TECHNOLOGY WITH PURPOSE</SectionLabel>
        <div className="section-intro">
          <h2>
            Intelligence that understands
            <br />
            <span>the world you operate in.</span>
          </h2>
          <p>
            A useful insight needs more than a model. It needs the right data, the right context,
            and a person who knows what to do with it.
          </p>
        </div>
        <div className="capability-grid">
          {capabilities.map((c, i) => {
            const Icon = icons[i];
            return (
              <Reveal className="capability" key={c.title}>
                <div className="capability-top">
                  <Icon size={27} strokeWidth={1.25} />
                  <span>0{i + 1}</span>
                </div>
                <div className={`capability-art art-${i}`} aria-hidden="true">
                  {i === 0 ? (
                    <svg viewBox="0 0 300 100">
                      <path
                        d="M0 65h35l9-15 9 27 12-46 12 34h30l12-34 12 48 12-62 14 48h28l9-17 10 28 14-41 11 30h60"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                      {[55, 127, 186, 243].map((x) => (
                        <circle key={x} cx={x} cy="65" r="3" fill="#90bcf5" />
                      ))}
                    </svg>
                  ) : i === 1 ? (
                    <div className="prediction-plot">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  ) : i === 2 ? (
                    <div className="network-visual">
                      <span>SENSOR</span>
                      <i />
                      <Cpu size={34} />
                      <i />
                      <span>ROBOT</span>
                    </div>
                  ) : (
                    <div className="twin-visual">
                      <Box size={75} strokeWidth={0.7} />
                      <span />
                      <Box size={75} strokeWidth={0.7} />
                    </div>
                  )}
                </div>
                <small>{c.tag}</small>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </Reveal>
            );
          })}
        </div>
        <p className="concept-note">
          Proposed capabilities of a fictional platform. This demonstration makes no claim of a
          commercially available product.
        </p>
      </div>
    </section>
  );
}
function Applications() {
  const [active, setActive] = useState(0);
  return (
    <section className="section applications" id="applications">
      <div className="container">
        <SectionLabel number="04">BUILT FOR THE PHYSICAL WORLD</SectionLabel>
        <div className="section-intro">
          <h2>
            Real environments.
            <br />
            <span>Meaningful possibilities.</span>
          </h2>
          <p>
            From the factory floor to critical infrastructure, better operational context can change
            the questions you’re able to ask.
          </p>
        </div>
        <div className="application-grid">
          {applications.map((a, i) => (
            <article
              className={`application ${active === i ? 'application-active' : ''}`}
              key={a.name}
            >
              <div className="application-image">
                <img src={a.image} width="700" height="620" loading="lazy" alt={a.alt} />
                <span className="image-reticle" aria-hidden="true">
                  +
                </span>
                <span className="image-index">AERVEK / FIELD 0{i + 1}</span>
              </div>
              <button
                className="application-title"
                onClick={() => setActive(i)}
                aria-expanded={active === i}
              >
                <span>
                  <small>{a.category}</small>
                  <span>{a.name}</span>
                </span>
                <ArrowUpRight size={21} />
              </button>
              <p>{a.description}</p>
              {active === i ? (
                <div className="application-detail">
                  {i === 0
                    ? 'Explore machine health, production context and maintenance priorities across connected assets.'
                    : i === 1
                      ? 'Explore cycle behavior, equipment status and human-reviewed recommendations in one workspace.'
                      : 'Explore condition trends and inspection priorities across pumps, drives and distributed infrastructure.'}
                  <a href="#contact">
                    Discuss this application <ArrowRight size={14} />
                  </a>
                </div>
              ) : null}
            </article>
          ))}
        </div>
        <div className="asset-monitoring">
          <span>
            <Radio size={19} />
            INDUSTRIAL ASSET MONITORING
          </span>
          <p>
            A common thread across every application: understand each asset in the context of the
            whole.
          </p>
          <a href="#platform" aria-label="Explore asset monitoring platform">
            <ArrowUpRight size={21} />
          </a>
        </div>
      </div>
    </section>
  );
}
function Vision() {
  return (
    <section id="vision" className="section vision">
      <div className="container vision-grid">
        <div>
          <SectionLabel number="05">THE LONG VIEW</SectionLabel>
          <h2>
            Building the intelligence
            <br />
            infrastructure for
            <br />
            <span>tomorrow’s industry.</span>
          </h2>
          <p>
            Industrial progress depends on more than connected machines. It depends on connected
            understanding.
          </p>
          <p>
            Our concept brings operational data, software intelligence and human judgment into a
            shared layer. An ambitious direction, grounded in the complexity of the real world.
          </p>
          <ArrowLink
            href="#contact"
            className="investor-link"
            onClick={() => window.dispatchEvent(new Event('investor-inquiry'))}
          >
            Investor & Partnership Inquiries
          </ArrowLink>
        </div>
        <div className="vision-principles">
          <span className="micro">A PRACTICAL FOUNDATION FOR WHAT’S NEXT</span>
          {[
            {
              title: 'Unified by design',
              text: 'A shared view of operational data, instead of another isolated tool.',
            },
            {
              title: 'Modular at the core',
              text: 'A proposed integration architecture that can evolve with your systems.',
            },
            {
              title: 'People stay in control',
              text: 'Decision support that respects operator expertise and keeps actions reviewable.',
            },
            {
              title: 'Built to grow thoughtfully',
              text: 'A software foundation designed for expansion, one useful connection at a time.',
            },
          ].map((p, i) => (
            <div className="principle" key={p.title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
              <ArrowUpRight size={16} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Contact() {
  const [formEnabled, setFormEnabled] = useState(false);
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [inquiry, setInquiry] = useState('demo');
  const formRef = useRef<HTMLFormElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    setFormEnabled(true);
    const update = () => {
      if (location.hash.includes('type=investor')) setInquiry('investor');
    };
    update();
    const investor = () => setInquiry('investor');
    window.addEventListener('investor-inquiry', investor);
    window.addEventListener('hashchange', update);
    return () => {
      window.removeEventListener('hashchange', update);
      window.removeEventListener('investor-inquiry', investor);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current?.checkValidity()) return;
    setState('loading');
    timer.current = setTimeout(() => {
      try {
        if (!formRef.current) throw new Error('Form unavailable');
        formRef.current.reset();
        setState('success');
      } catch {
        setState('error');
      }
    }, 650);
  }
  return (
    <section id="contact" className="section contact">
      <div className="container contact-grid">
        <div>
          <SectionLabel number="06">LET’S CONNECT</SectionLabel>
          <h2>
            Bring intelligence
            <br />
            to your industrial
            <br />
            <span>operations.</span>
          </h2>
          <p>
            Explore the possibilities. Share a challenge.
            <br />
            Start a conversation about what comes next.
          </p>
          <div className="contact-demo">
            <CircleHelp size={18} />
            <p>
              This is a portfolio demonstration.
              <br />
              The form simulates a submission. Nothing is sent or stored.
            </p>
          </div>
        </div>
        <div className="form-panel">
          <div className="form-title">
            <h3>Let’s explore what’s possible.</h3>
            <span>DEMO FORM</span>
          </div>
          {state === 'success' ? (
            <div className="form-success" role="status">
              <span>
                <Check size={25} />
              </span>
              <h4>Demo completed.</h4>
              <p>
                Your sample inquiry was validated successfully. No message was sent and no
                information was stored.
              </p>
              <button className="button primary" onClick={() => setState('idle')}>
                Try another inquiry <ArrowRight size={17} />
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={submit}>
              <noscript>
                This demo requires JavaScript. The form is disabled so no information is submitted.
              </noscript>
              <fieldset className="demo-form-fields" disabled={!formEnabled}>
                <div className="form-row">
                  <label>
                    Full name
                    <input
                      autoComplete="name"
                      name="name"
                      placeholder="Alex Morgan"
                      required
                      minLength={2}
                      maxLength={100}
                    />
                  </label>
                  <label>
                    Work email
                    <input
                      autoComplete="email"
                      type="email"
                      name="email"
                      placeholder="alex@company.com"
                      required
                      maxLength={200}
                    />
                  </label>
                </div>
                <label>
                  Company
                  <input
                    autoComplete="organization"
                    name="company"
                    placeholder="Your company"
                    required
                    maxLength={150}
                  />
                </label>
                <label>
                  How can we help?
                  <select
                    name="inquiry"
                    value={inquiry}
                    onChange={(e) => setInquiry(e.target.value)}
                  >
                    <option value="demo">Explore the platform / Request a demo</option>
                    <option value="investor">Investor inquiry</option>
                    <option value="partner">Strategic partnership</option>
                    <option value="other">Something else</option>
                  </select>
                </label>
                <label>
                  Tell us a little more <span className="optional">(optional)</span>
                  <textarea
                    name="message"
                    rows={3}
                    maxLength={2000}
                    placeholder="What would you like to explore?"
                  />
                </label>
                <button
                  className="button primary form-submit"
                  type="submit"
                  disabled={state === 'loading'}
                >
                  {state === 'loading' ? 'Simulating submission…' : 'Preview Your Inquiry'}
                  <ArrowUpRight size={17} />
                </button>
                {state === 'error' ? (
                  <p className="form-error" role="alert">
                    The simulation could not finish. Please try again.
                  </p>
                ) : null}
                <p className="form-disclaimer">
                  <ShieldCheck size={13} />
                  Local demonstration only. Please use sample information.
                </p>
              </fieldset>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
function Footer() {
  const [privacy, setPrivacy] = useState(false);
  const privacyBtn = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (privacy) dialog.current?.showModal();
    else dialog.current?.close();
  }, [privacy]);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Logo footer />
            <p>Intelligence for the physical world.</p>
          </div>
          <div className="footer-nav">
            {navigation.map(([name, id]) => (
              <a key={id} href={`#${id}`}>
                {name}
              </a>
            ))}
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} AERVEK · Fictional concept / Portfolio demonstration
          </span>
          <button ref={privacyBtn} onClick={() => setPrivacy(true)}>
            Demo privacy
          </button>
          <span>
            Independent concept by{' '}
            <a
              className="credit"
              href="https://mouzzambuild.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Crescita Digitale Italia
            </a>
          </span>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="privacy-dialog"
        onCancel={() => setPrivacy(false)}
        onClose={() => {
          setPrivacy(false);
          privacyBtn.current?.focus();
        }}
      >
        <button
          aria-label="Close privacy information"
          className="dialog-close"
          onClick={() => setPrivacy(false)}
        >
          <X />
        </button>
        <span className="micro">PORTFOLIO DEMONSTRATION</span>
        <h2>Your data stays here.</h2>
        <p>
          This fictional concept does not send or save form information. Submission is simulated in
          your browser. No analytics, tracking cookies, third-party embeds or advertising scripts
          are included. Fonts and images are served locally.
        </p>
        <p>
          Standard server access logs may be created by whichever host serves this preview. A real
          launch requires an accurate privacy notice and a verified contact destination.
        </p>
        <button className="button primary" onClick={() => setPrivacy(false)}>
          Understood <Check size={16} />
        </button>
      </dialog>
    </footer>
  );
}
export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  }, []);
  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', next === 'light' ? '#f6f8fb' : '#080d13');
    const url = new URL(window.location.href);
    url.searchParams.set('theme', next);
    window.history.replaceState(null, '', url);
  }
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div id="top" />
        <Header theme={theme} onToggle={toggleTheme} />
        <main id="main">
          <Hero />
          <div className="domain-strip">
            <div className="container">
              <span>ONE CONNECTED INDUSTRIAL FUTURE</span>
              <div>
                <span>
                  <Network size={17} />
                  Connected systems
                </span>
                <span>
                  <Activity size={17} />
                  Operational intelligence
                </span>
                <span>
                  <Cpu size={17} />
                  Physical AI
                </span>
              </div>
              <span className="concept-pill">INDEPENDENT CONCEPT</span>
            </div>
          </div>
          <Challenge />
          <Platform />
          <Dashboard />
          <Capabilities />
          <Applications />
          <Vision />
          <Contact />
        </main>
        <Footer />
      </LazyMotion>
    </MotionConfig>
  );
}
