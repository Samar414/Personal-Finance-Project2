import { useMemo, useState, type ReactNode } from 'react'

type Page =
  | 'home'
  | 'login'
  | 'register'
  | 'customer'
  | 'investments'
  | 'holding'
  | 'expenses'
  | 'privacy'
  | 'consultant'
  | 'customers'
  | 'profile'
  | 'reports'
  | 'system'

type IconName =
  | 'arrow'
  | 'chevron'
  | 'eye'
  | 'lock'
  | 'plus'
  | 'search'
  | 'sliders'
  | 'trend'
  | 'users'
  | 'wallet'
  | 'close'
  | 'check'
  | 'menu'

type Customer = [string, string, number, number, string, string, string]

const money = (value: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)

const holdings = [
  { name: 'HDFC Balanced Advantage Fund', detail: 'Hybrid · Direct Growth', type: 'Mutual fund', invested: 850000, value: 1042800, gain: 22.68, managed: true },
  { name: 'Parag Parikh Flexi Cap Fund', detail: 'Equity · Direct Growth', type: 'Mutual fund', invested: 700000, value: 923400, gain: 31.91, managed: true },
  { name: 'UTI Nifty 50 Index Fund', detail: 'Index · Direct Growth', type: 'Mutual fund', invested: 130000, value: 147800, gain: 13.69, managed: true },
  { name: 'Infosys Limited', detail: '28 shares · Avg. ₹1,412', type: 'Equity', invested: 395360, value: 462280, gain: 16.93, managed: true },
  { name: 'HDFC Bank Limited', detail: '41 shares · Avg. ₹1,486', type: 'Equity', invested: 609260, value: 683120, gain: 12.12, managed: true },
  { name: 'Tata Consumer Products', detail: '85 shares · Avg. ₹952', type: 'Equity', invested: 80920, value: 103000, gain: 27.29, managed: false },
  { name: 'SBI Fixed Deposit', detail: 'Matures 18 Sep 2026 · 7.10%', type: 'Fixed deposit', invested: 800000, value: 800000, gain: 0, managed: false },
  { name: 'Sovereign Gold Bond 2021–29', detail: '10 units · 8 grams', type: 'Gold', invested: 505000, value: 600000, gain: 18.81, managed: false },
]

const expenses = [
  { date: '24 Feb 2025', name: 'Nature’s Basket', category: 'Food & dining', method: 'UPI', amount: 2840 },
  { date: '22 Feb 2025', name: 'BESCOM electricity bill', category: 'Utilities', method: 'Net banking', amount: 3210 },
  { date: '20 Feb 2025', name: 'Apollo Pharmacy', category: 'Healthcare', method: 'Credit card', amount: 1860 },
  { date: '18 Feb 2025', name: 'Fuel — IndianOil', category: 'Transport', method: 'UPI', amount: 4200 },
  { date: '15 Feb 2025', name: 'Apartment rent', category: 'Housing', method: 'Bank transfer', amount: 38000 },
  { date: '12 Feb 2025', name: 'BookMyShow', category: 'Entertainment', method: 'Credit card', amount: 1450 },
  { date: '09 Feb 2025', name: 'Fabindia', category: 'Shopping', method: 'Credit card', amount: 5260 },
]

const customers: Customer[] = [
  ['Aarav Mehta', 'aarav.mehta@example.in', 4862400, 3255000, '+4.8%', '24 Feb 2025', 'Granted'],
  ['Naina Kapoor', 'naina.kapoor@example.in', 12740000, 9820000, '+3.2%', '24 Feb 2025', 'Granted'],
  ['Rohit Iyer', 'rohit.iyer@example.in', 8640000, 7900000, '+5.1%', '23 Feb 2025', 'Not granted'],
  ['Meera Nair', 'meera.nair@example.in', 3210000, 2760000, '−0.7%', '22 Feb 2025', 'Revoked'],
  ['Kabir Shah', 'kabir.shah@example.in', 15850000, 12100000, '+2.6%', '22 Feb 2025', 'Granted'],
  ['Diya Menon', 'diya.menon@example.in', 6900000, 5350000, '+6.4%', '21 Feb 2025', 'Not granted'],
  ['Vikram Rao', 'vikram.rao@example.in', 2450000, 1800000, '+1.9%', '20 Feb 2025', 'Granted'],
  ['Ananya Bose', 'ananya.bose@example.in', 9800000, 7420000, '+3.8%', '19 Feb 2025', 'Granted'],
  ['Arjun Patel', 'arjun.patel@example.in', 5720000, 4130000, '−1.2%', '18 Feb 2025', 'Not granted'],
  ['Ishita Sen', 'ishita.sen@example.in', 11100000, 8600000, '+4.1%', '18 Feb 2025', 'Granted'],
  ['Siddharth Jain', 'siddharth.jain@example.in', 4380000, 3180000, '+2.2%', '17 Feb 2025', 'Revoked'],
  ['Tara Deshmukh', 'tara.deshmukh@example.in', 7650000, 5940000, '+5.6%', '16 Feb 2025', 'Granted'],
  ['Neel Joshi', 'neel.joshi@example.in', 2930000, 2150000, '+0.9%', '15 Feb 2025', 'Not granted'],
  ['Rhea Malhotra', 'rhea.malhotra@example.in', 13400000, 10300000, '+3.5%', '14 Feb 2025', 'Granted'],
  ['Aditya Kulkarni', 'aditya.k@example.in', 6050000, 4780000, '+4.7%', '13 Feb 2025', 'Granted'],
  ['Sanya Gupta', 'sanya.gupta@example.in', 3520000, 2660000, '−0.4%', '12 Feb 2025', 'Not granted'],
  ['Karan Bhat', 'karan.bhat@example.in', 8900000, 6910000, '+2.8%', '11 Feb 2025', 'Granted'],
  ['Leela Reddy', 'leela.reddy@example.in', 4100000, 3020000, '+3.9%', '10 Feb 2025', 'Granted'],
  ['Om Prakash', 'om.prakash@example.in', 7200000, 5600000, '+1.4%', '09 Feb 2025', 'Revoked'],
  ['Zoya Khan', 'zoya.khan@example.in', 5280000, 3980000, '+5.0%', '08 Feb 2025', 'Granted'],
]

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    eye: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6S2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="2.5" /></>,
    lock: <><rect x="5" y="10" width="14" height="10" rx="1" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
    sliders: <><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></>,
    trend: <><path d="m4 16 5-5 4 3 7-8" /><path d="M15 6h5v5" /></>,
    users: <><circle cx="9" cy="8" r="3" /><path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6" /><path d="M16 5.5a3 3 0 0 1 0 5.5M17 14c2.3.5 4 2.6 4 5" /></>,
    wallet: <><path d="M3 7h16v12H3z" /><path d="M3 7V5h13v2M14 12h7v4h-7z" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  }
  return <svg aria-hidden="true" className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

function Button({ children, kind = 'primary', onClick, icon }: { children: ReactNode; kind?: 'primary' | 'secondary' | 'quiet' | 'danger'; onClick?: () => void; icon?: IconName }) {
  return <button className={`btn btn-${kind}`} onClick={onClick}>{icon && <Icon name={icon} size={16} />}{children}</button>
}

function Logo({ compact = false }: { compact?: boolean }) {
  return <div className="logo"><span className="logo-mark"><i /><i /><i /></span>{!compact && <span><b>Artha</b><small>CAPITAL ADVISORY</small></span>}</div>
}

function Tag({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'good' | 'warn' | 'bad' }) {
  return <span className={`tag tag-${tone}`}>{children}</span>
}

function Field({ label, placeholder, type = 'text', error }: { label: string; placeholder: string; type?: string; error?: string }) {
  return <label className="field"><span>{label}</span><input type={type} placeholder={placeholder} className={error ? 'input-error' : ''} />{error && <small className="error">{error}</small>}</label>
}

function Select({ children }: { children: ReactNode }) {
  return <button className="select">{children}<span>⌄</span></button>
}

function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return <div className="modal-backdrop" onMouseDown={onClose}><section className="modal" onMouseDown={e => e.stopPropagation()}><header><h3>{title}</h3><button className="icon-btn" onClick={onClose}><Icon name="close" /></button></header>{children}</section></div>
}

function Chart({ variant = 'customer' }: { variant?: 'customer' | 'consultant' | 'expense' }) {
  const customer = 'M5 126 C35 124 45 106 72 110 S110 87 135 94 S175 60 205 67 S250 48 277 56 S320 22 365 30 S405 18 455 22'
  const consultant = 'M5 121 C40 118 55 105 85 106 S135 92 165 95 S205 73 240 78 S290 58 325 60 S375 35 455 28'
  const expense = 'M5 96 C45 90 70 42 110 65 S175 105 220 76 S295 36 335 63 S400 104 455 72'
  const path = variant === 'customer' ? customer : variant === 'consultant' ? consultant : expense
  return <div className={`chart chart-${variant}`}>
    <svg viewBox="0 0 460 150" preserveAspectRatio="none">
      <defs><linearGradient id={`fill-${variant}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="currentColor" stopOpacity=".18" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></linearGradient></defs>
      {[30, 70, 110, 145].map(y => <line key={y} x1="0" x2="460" y1={y} y2={y} className="grid" />)}
      <path d={`${path} L455 150 L5 150 Z`} fill={`url(#fill-${variant})`} stroke="none" />
      <path d={path} className="line" vectorEffect="non-scaling-stroke" />
      <circle cx="365" cy={variant === 'customer' ? 30 : variant === 'consultant' ? 38 : 63} r="4" className="point" />
    </svg>
    <div className="chart-labels"><span>Mar ’24</span><span>Jun</span><span>Sep</span><span>Dec</span><span>Feb ’25</span></div>
  </div>
}

function Donut({ consultant = false, total, subtitle }: { consultant?: boolean; total?: string; subtitle?: string }) {
  return <div className="donut-wrap">
    <div className={`donut ${consultant ? 'donut-consultant' : ''}`}><span><b>{total ?? (consultant ? '₹12.84' : '₹48.62')}</b><small>{subtitle ?? (consultant ? 'crore AUM' : 'lakh total')}</small></span></div>
    <div className="legend">
      <span><i className="dot teal" /><b>Mutual funds</b><em>{consultant ? '48%' : '45.5%'}</em></span>
      <span><i className="dot rust" /><b>Equities</b><em>{consultant ? '29%' : '25.7%'}</em></span>
      <span><i className="dot gold" /><b>Fixed deposits</b><em>{consultant ? '16%' : '16.5%'}</em></span>
      <span><i className="dot sage" /><b>Gold</b><em>{consultant ? '7%' : '12.3%'}</em></span>
    </div>
  </div>
}

function PublicHeader({ go }: { go: (page: Page) => void }) {
  return <header className="public-header"><Logo /><nav><button onClick={() => go('home')}>Home</button><button onClick={() => go('home')}>Approach</button><button onClick={() => go('home')}>Services</button><button onClick={() => go('home')}>Contact</button></nav><div className="header-actions"><Button kind="quiet" onClick={() => go('login')}>Sign in</Button><Button onClick={() => go('register')}>Get started</Button></div><button className="mobile-menu"><Icon name="menu" /></button></header>
}

function AppShell({ page, go, role, children }: { page: Page; go: (page: Page) => void; role: 'customer' | 'consultant'; children: ReactNode }) {
  const customerNav: [Page, string][] = [['customer', 'Overview'], ['investments', 'Investments'], ['expenses', 'Expenses'], ['privacy', 'Settings']]
  const consultantNav: [Page, string][] = [['consultant', 'Overview'], ['customers', 'Customers'], ['reports', 'Reports'], ['privacy', 'Settings']]
  return <div className="app-shell">
    <aside className={`sidebar sidebar-${role}`}>
      <div className="portal-brand"><Logo /><div className="role-label">{role === 'customer' ? 'CUSTOMER PORTAL' : 'CONSULTANT PORTAL'}</div></div>
      <nav>{(role === 'customer' ? customerNav : consultantNav).map(([p, label]) => <button key={p} className={page === p || (page === 'holding' && p === 'investments') || (page === 'profile' && p === 'customers') ? 'active' : ''} onClick={() => go(p)}>{label}</button>)}</nav>
      <div className="sidebar-note"><Icon name="lock" size={16} /><span><b>Private by design</b><small>{role === 'customer' ? 'You control expense sharing.' : 'Access follows customer consent.'}</small></span></div>
      <button className="profile-switch" onClick={() => go(role === 'customer' ? 'consultant' : 'customer')}><span className="avatar">{role === 'customer' ? 'AM' : 'RK'}</span><span><b>{role === 'customer' ? 'Aarav Mehta' : 'Ritika Khanna'}</b><small>{role === 'customer' ? 'Customer account' : 'Senior consultant'}</small></span><span>↕</span></button>
    </aside>
    <main className="workspace"><div className="mobile-appbar"><Logo compact /><b>{role === 'customer' ? 'Customer portal' : 'Consultant portal'}</b><button className="icon-btn"><Icon name="menu" /></button></div>{children}</main>
  </div>
}

function Home({ go }: { go: (p: Page) => void }) {
  return <div className="public-page">
    <PublicHeader go={go} />
    <main>
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow">INVESTMENT CLARITY, ON YOUR TERMS</p><h1>See the whole of your wealth. Understand every decision.</h1><p className="lede">A considered view of investments and everyday finances, supported by personal consulting—not product pressure.</p><div className="hero-actions"><Button onClick={() => go('register')}>Open an account <Icon name="arrow" size={16} /></Button><Button kind="secondary" onClick={() => go('login')}>Sign in</Button></div></div>
        <div className="hero-preview">
          <div className="preview-bar"><Logo compact /><span>Portfolio overview</span><i>AM</i></div>
          <div className="preview-body">
            <div className="preview-title"><span><small>Total portfolio value</small><b>₹48,62,400</b></span><Tag tone="good">+19.18% all time</Tag></div>
            <Chart />
            <div className="preview-split"><div><small>Managed investments</small><b>₹32,55,380</b><span>Across 6 holdings</span></div><div><small>February spending</small><b>₹98,450</b><span className="down">↓ 6.2% vs January</span></div></div>
          </div>
        </div>
      </section>
      <section className="principles">
        <div className="section-intro"><p className="eyebrow">ONE FINANCIAL VIEW</p><h2>Advice works better when the picture is complete.</h2></div>
        <div className="principle-grid">
          <article><span>01</span><h3>Your portfolio, reconciled</h3><p>Mutual funds, equities, fixed deposits and gold—shown with the details that matter to each asset.</p></article>
          <article><span>02</span><h3>Spending in context</h3><p>Understand monthly patterns and recurring commitments without confusing expenses with investments.</p></article>
          <article><span>03</span><h3>Control stays with you</h3><p>Portfolio information supports advice. Detailed expenses remain private unless you explicitly share them.</p></article>
        </div>
      </section>
      <section className="services">
        <div><p className="eyebrow">HOW WE WORK</p><h2>A calm, evidence-led approach to personal wealth.</h2><p>Artha Capital Advisory pairs an organised financial view with human review and clearly defined permissions.</p><Button kind="secondary" onClick={() => go('customer')}>Explore customer portal</Button></div>
        <div className="service-list">
          <div><span>01</span><b>Portfolio organisation</b><p>Bring diverse holdings into one understandable view.</p></div>
          <div><span>02</span><b>Ongoing review</b><p>Track performance using relevant measures, not a single headline number.</p></div>
          <div><span>03</span><b>Consultant collaboration</b><p>Share only what is needed, with a visible record of consent.</p></div>
        </div>
      </section>
      <section className="privacy-banner"><div><p className="eyebrow">PRIVACY IS A PRODUCT DECISION</p><h2>Your expenses are not part of the advisory relationship by default.</h2></div><p>Grant access when a broader financial conversation would help. Revoke it at any time. Portfolio access and detailed expense access are always shown as separate permissions.</p><Button kind="secondary" onClick={() => go('privacy')}>See consent controls</Button></section>
      <section className="contact"><div><p className="eyebrow">START A CONVERSATION</p><h2>Bring clarity to the decisions ahead.</h2></div><div><p>For advisory enquiries</p><a href="mailto:hello@example.in">hello@example.in</a><p>Bengaluru, India</p></div><Button onClick={() => go('register')}>Create account</Button></section>
    </main>
    <footer><Logo /><p>Investments are subject to market risks. Please read all scheme-related documents carefully.</p><a className="download-link" href="/artha-wealth-platform.zip" download>Download project files</a><button onClick={() => go('system')}>Design system</button><span>© 2025 Artha Capital Advisory</span></footer>
  </div>
}

function Auth({ mode, go }: { mode: 'login' | 'register'; go: (p: Page) => void }) {
  const [showDemo, setShowDemo] = useState(true)
  const [error, setError] = useState(false)
  return <div className="auth-page">
    <aside className="auth-story"><Logo /><div><p className="eyebrow">A CLEARER FINANCIAL PICTURE</p><h1>{mode === 'login' ? 'Welcome back to your portfolio.' : 'Begin with what you already own.'}</h1><p>Track investments and expenses with detail, context and control over what your consultant can see.</p></div><small>Your financial information stays protected.</small></aside>
    <main className="auth-form">
      <button className="back-link" onClick={() => go('home')}>← Back to website</button>
      <div className="auth-card"><p className="eyebrow">{mode === 'login' ? 'SECURE SIGN IN' : 'CUSTOMER REGISTRATION'}</p><h2>{mode === 'login' ? 'Sign in to Artha' : 'Create your account'}</h2><p>{mode === 'login' ? 'Use your registered email address to continue.' : 'A few details are enough to set up your account.'}</p>
        {mode === 'register' && <Field label="Full name" placeholder="e.g. Aarav Mehta" />}
        <Field label="Email address" placeholder="you@example.in" type="email" error={error ? 'Enter a valid email address.' : undefined} />
        <Field label="Password" placeholder={mode === 'login' ? 'Enter your password' : 'At least 8 characters'} type="password" />
        {mode === 'register' && <Field label="Confirm password" placeholder="Re-enter your password" type="password" />}
        {mode === 'login' ? <div className="form-row"><label className="check"><input type="checkbox" /> Remember me</label><button className="text-link">Forgot password?</button></div> : <label className="check terms"><input type="checkbox" /> I agree to the terms of service and privacy policy.</label>}
        <Button onClick={() => mode === 'login' ? go('customer') : setError(true)}>{mode === 'login' ? 'Sign in' : 'Create account'} <Icon name="arrow" size={16} /></Button>
        <p className="auth-switch">{mode === 'login' ? 'New to Artha?' : 'Already have an account?'} <button onClick={() => go(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'Create an account' : 'Sign in'}</button></p>
      </div>
      <section className="demo-panel"><button className="demo-head" onClick={() => setShowDemo(!showDemo)}><span><b>Quick account access</b><small>Choose the workspace you want to open</small></span><span>{showDemo ? '−' : '+'}</span></button>{showDemo && <div className="demo-options"><button onClick={() => go('customer')}><span className="avatar">AM</span><span><b>Aarav Mehta</b><small>Customer · Balanced portfolio</small></span><Icon name="arrow" /></button><button onClick={() => go('consultant')}><span className="avatar consultant">RK</span><span><b>Ritika Khanna</b><small>Consultant · 20 customers</small></span><Icon name="arrow" /></button></div>}</section>
    </main>
  </div>
}

function PageHead({ eyebrow, title, description, children }: { eyebrow?: string; title: string; description?: string; children?: ReactNode }) {
  return <header className="page-head"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1>{description && <p>{description}</p>}</div>{children && <div className="page-actions">{children}</div>}</header>
}

function CustomerDashboard({ go }: { go: (p: Page) => void }) {
  return <div className="page"><header className="page-head customer-welcome"><div><h1>Good morning, Aarav.</h1><p className="customer-date">MONDAY, 24 FEBRUARY</p><p>Here’s how your finances stand today.</p></div><div className="page-actions"><Button kind="secondary">Download statement</Button></div></header>
    <section className="portfolio-hero"><div className="value-block"><span>Total portfolio value</span><b>₹48,62,400</b><div><Tag tone="good">+₹7,82,400</Tag><small>+19.18% on ₹40,80,000 invested</small></div></div><div className="range-tabs">{['1M','3M','6M','1Y','All'].map(x => <button key={x} className={x === '1Y' ? 'active' : ''}>{x}</button>)}</div><Chart /><div className="chart-foot"><span>₹44L</span><span><i className="dot teal" /> Portfolio value</span><small>Historical portfolio performance</small><span>₹49L</span></div></section>
    <div className="dashboard-grid">
      <section className="panel allocation"><header><div><p className="eyebrow">ALLOCATION</p><h2>Where your money sits</h2></div><button className="text-link" onClick={() => go('investments')}>View holdings →</button></header><Donut /></section>
      <section className="panel holdings-preview"><header><div><p className="eyebrow">HOLDINGS</p><h2>Largest positions</h2></div><button className="text-link" onClick={() => go('investments')}>View all</button></header>{holdings.slice(0,4).map(h => <button key={h.name} className="holding-row" onClick={() => go('holding')}><span className="asset-letter">{h.name[0]}</span><span><b>{h.name}</b><small>{h.type}</small></span><span><b>{money(h.value)}</b><small className="positive">+{h.gain}%</small></span></button>)}</section>
      <section className="panel expense-summary"><header><div><p className="eyebrow">FEBRUARY SPENDING</p><h2>₹98,450</h2></div><Tag tone="good">6.2% lower</Tag></header><div className="expense-bars"><span><i style={{width:'39%'}} /><b>Housing</b><em>₹38,000</em></span><span><i style={{width:'19%'}} /><b>Food & dining</b><em>₹18,600</em></span><span><i style={{width:'11%'}} /><b>Shopping</b><em>₹10,500</em></span><span><i style={{width:'31%'}} /><b>Others</b><em>₹31,350</em></span></div><button className="text-link" onClick={() => go('expenses')}>Review February expenses →</button></section>
      <section className="panel activity"><header><div><p className="eyebrow">RECENT ACTIVITY</p><h2>Latest updates</h2></div></header><ul><li><i className="activity-mark" /><span><b>Expense added</b><small>Nature’s Basket · Food & dining</small></span><time>Today</time></li><li><i className="activity-mark rust" /><span><b>NAV value updated</b><small>HDFC Balanced Advantage Fund</small></span><time>24 Feb</time></li><li><i className="activity-mark gold" /><span><b>Fixed deposit reviewed</b><small>SBI Fixed Deposit</small></span><time>21 Feb</time></li></ul></section>
    </div>
  </div>
}

function Investments({ go, consultant = false }: { go: (p: Page) => void; consultant?: boolean }) {
  const [modal, setModal] = useState<'add' | 'delete' | null>(null)
  const [tab, setTab] = useState('All assets')
  const filtered = tab === 'All assets' ? holdings : holdings.filter(h => h.type === tab.replace('s',''))
  return <div className="page"><PageHead eyebrow={consultant ? 'MANAGED HOLDINGS' : 'YOUR INVESTMENTS'} title={consultant ? 'Holdings across customers' : 'Investments & holdings'} description={consultant ? 'Review holdings included in eligible firm AUM.' : 'Values reflect the latest recorded prices for your holdings.'}><Button icon="plus" onClick={() => setModal('add')}>Add holding</Button></PageHead>
    <section className="summary-strip"><div><span>Current value</span><b>₹48,62,400</b></div><div><span>Invested amount</span><b>₹40,80,000</b></div><div><span>Absolute gain</span><b className="positive">₹7,82,400</b></div><div><span>Absolute return</span><b className="positive">+19.18%</b></div></section>
    <div className="asset-tabs">{['All assets','Mutual funds','Equities','Fixed deposits','Gold'].map(t => <button key={t} className={tab===t?'active':''} onClick={() => setTab(t)}>{t}<span>{t==='All assets'?8:holdings.filter(h=>h.type===t.replace('s','')).length}</span></button>)}</div>
    <div className="table-tools"><div className="search"><Icon name="search" size={17}/><input placeholder="Search holdings" /></div><Select>Current value</Select><Button kind="secondary" icon="sliders">Filters</Button></div>
    <section className="table-card"><table><thead><tr><th>Holding</th><th>Invested</th><th>Current value</th><th>Gain / loss</th><th>Return</th><th></th></tr></thead><tbody>{filtered.map(h => <tr key={h.name} onClick={() => go('holding')}><td><span className="table-asset"><i>{h.name[0]}</i><span><b>{h.name}</b><small>{h.detail}</small></span></span></td><td>{money(h.invested)}</td><td><b>{money(h.value)}</b></td><td className={h.gain>0?'positive':''}>{h.gain ? `+${money(h.value-h.invested)}` : 'At principal'}</td><td><Tag tone={h.gain>0?'good':'neutral'}>{h.gain ? `+${h.gain}%` : '—'}</Tag></td><td><button className="more">•••</button></td></tr>)}</tbody></table></section>
    <p className="table-note">Showing {filtered.length} tracked holdings · Updated 24 February 2025</p>
    {modal === 'add' && <Modal title="Add a holding" onClose={() => setModal(null)}><div className="modal-body"><label className="field"><span>Asset type</span><select><option>Mutual fund</option><option>Equity</option><option>Fixed deposit</option><option>Gold</option></select></label><Field label="Fund name" placeholder="Search or enter fund name" /><div className="form-grid"><Field label="Invested amount" placeholder="₹ 0" /><Field label="Purchase date" placeholder="DD / MM / YYYY" /></div><Field label="Current value" placeholder="₹ 0" /><p className="helper">Enter the latest available value for this holding.</p><div className="modal-actions"><Button kind="quiet" onClick={() => setModal(null)}>Cancel</Button><Button onClick={() => setModal(null)}>Add holding</Button></div></div></Modal>}
  </div>
}

function HoldingDetail({ go }: { go: (p: Page) => void }) {
  return <div className="page detail-page"><button className="back-link" onClick={() => go('investments')}>← Back to investments</button><PageHead eyebrow="MUTUAL FUND · DIRECT GROWTH" title="HDFC Balanced Advantage Fund" description="Hybrid: Dynamic Asset Allocation · Folio ending 4821" />
    <section className="holding-summary"><div><span>Current value</span><b>₹10,42,800</b><small>As entered on 24 Feb 2025</small></div><div><span>Invested amount</span><b>₹8,50,000</b><small>Across 14 investments</small></div><div><span>Absolute gain</span><b className="positive">+₹1,92,800</b><small>+22.68% absolute return</small></div><div><span>CAGR</span><b className="positive">11.42%</b><small>Since 18 Jun 2022</small></div></section>
    <div className="detail-grid"><section className="panel performance-panel"><header><div><p className="eyebrow">PERFORMANCE HISTORY</p><h2>Holding value over time</h2></div><div className="range-tabs">{['6M','1Y','3Y','All'].map(x=><button key={x} className={x==='All'?'active':''}>{x}</button>)}</div></header><Chart /></section><section className="panel facts"><p className="eyebrow">HOLDING DETAILS</p><h2>Position facts</h2><dl><div><dt>Units held</dt><dd>2,341.827</dd></div><div><dt>Average NAV</dt><dd>₹362.96</dd></div><div><dt>Current NAV</dt><dd>₹445.30 <small>24 Feb 2025</small></dd></div><div><dt>Purchase date</dt><dd>18 Jun 2022</dd></div><div><dt>Firm-managed AUM</dt><dd><Tag tone="good">Eligible</Tag></dd></div></dl></section></div>
    <section className="panel timeline"><header><div><p className="eyebrow">POSITION TIMELINE</p><h2>Holding changes</h2></div></header><div className="timeline-row"><time>24 Feb 2025</time><i /><span><b>Current value updated</b><small>₹10,42,800 entered by Aarav Mehta</small></span></div><div className="timeline-row"><time>12 Jan 2025</time><i /><span><b>Additional investment</b><small>₹50,000 added to invested amount</small></span></div><div className="timeline-row"><time>18 Jun 2022</time><i /><span><b>Holding created</b><small>Initial purchase of ₹2,50,000</small></span></div></section>
  </div>
}

function Expenses() {
  const [tab, setTab] = useState<'transactions'|'commitments'>('transactions')
  const [add, setAdd] = useState(false)
  return <div className="page"><PageHead eyebrow="PERSONAL EXPENSES" title="February spending" description="Recorded transactions and regular commitments are kept separate."><Select>February 2025</Select><Button icon="plus" onClick={() => setAdd(true)}>{tab==='transactions'?'Add expense':'Add commitment'}</Button></PageHead>
    <div className="subnav"><button className={tab==='transactions'?'active':''} onClick={()=>setTab('transactions')}>Transactions</button><button className={tab==='commitments'?'active':''} onClick={()=>setTab('commitments')}>Recurring commitments</button></div>
    {tab==='transactions'?<><section className="expense-overview"><div className="expense-total"><span>Total this month</span><b>₹98,450</b><small><Tag tone="good">↓ 6.2%</Tag> ₹6,500 less than January</small></div><div className="mini-trend"><header><b>Six-month trend</b><small>Sep 2024 – Feb 2025</small></header><Chart variant="expense" /></div><div className="category-breakdown"><b>By category</b><span><i className="dot teal"/>Housing <em>₹38,000</em></span><span><i className="dot rust"/>Food & dining <em>₹18,600</em></span><span><i className="dot gold"/>Shopping <em>₹10,500</em></span><span><i className="dot sage"/>Others <em>₹31,350</em></span></div></section>
    <div className="table-tools"><div className="search"><Icon name="search" size={17}/><input placeholder="Search transactions" /></div><Select>All categories</Select><Button kind="secondary" icon="sliders">Filters</Button></div>
    <section className="table-card"><table><thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Payment method</th><th>Amount</th><th></th></tr></thead><tbody>{expenses.map(x=><tr key={`${x.date}-${x.name}`}><td>{x.date}</td><td><b>{x.name}</b></td><td>{x.category}</td><td className="muted">{x.method}</td><td><b>{money(x.amount)}</b></td><td><button className="more">•••</button></td></tr>)}</tbody></table></section></>:<Commitments />}
    {add&&<Modal title={tab==='transactions'?'Add expense':'Add recurring commitment'} onClose={()=>setAdd(false)}><div className="modal-body"><Field label={tab==='transactions'?'Description':'Commitment name'} placeholder={tab==='transactions'?'e.g. Weekly groceries':'e.g. Home rent'} /><div className="form-grid"><Field label="Amount" placeholder="₹ 0" /><Field label={tab==='transactions'?'Date':'Next due date'} placeholder="DD / MM / YYYY" /></div><label className="field"><span>Category</span><select><option>Food & dining</option><option>Housing</option><option>Transport</option><option>Utilities</option></select></label><Field label="Notes (optional)" placeholder="Add context" /><div className="modal-actions"><Button kind="quiet" onClick={()=>setAdd(false)}>Cancel</Button><Button onClick={()=>setAdd(false)}>Save</Button></div></div></Modal>}
  </div>
}

function Commitments() {
  const data=[['Apartment rent','Housing','₹38,000','Monthly','01 Mar 2025'],['Home loan EMI','Loan / EMI','₹24,600','Monthly','05 Mar 2025'],['Health insurance','Insurance','₹3,250','Monthly','12 Mar 2025'],['Internet & mobile','Utilities','₹1,899','Monthly','16 Mar 2025'],['Music subscription','Subscription','₹119','Monthly','22 Mar 2025']]
  return <><div className="commitment-note"><Icon name="wallet"/><div><b>₹67,868 due in March</b><p>Commitments are planned obligations. They enter spending totals only when recorded as paid transactions.</p></div></div><section className="commitment-grid">{data.map((x,i)=><article key={x[0]}><div><Tag tone={i===4?'neutral':'good'}>{i===4?'Inactive':'Active'}</Tag><button className="more">•••</button></div><p>{x[1]}</p><h3>{x[0]}</h3><b>{x[2]}</b><dl><dt>{x[3]}</dt><dd>Next: {x[4]}</dd></dl></article>)}</section></>
}

function Privacy() {
  const [granted,setGranted]=useState(true)
  const [confirm,setConfirm]=useState(false)
  const [section,setSection]=useState<'profile'|'preferences'|'privacy'|'security'>('privacy')
  return <div className="page settings-page"><PageHead eyebrow="ACCOUNT & PRIVACY" title="Your settings" description="Manage your details, preferences and consultant permissions." />
    <div className="settings-layout"><nav><button className={section==='profile'?'active':''} onClick={()=>setSection('profile')}>Profile</button><button className={section==='preferences'?'active':''} onClick={()=>setSection('preferences')}>Preferences</button><button className={section==='privacy'?'active':''} onClick={()=>setSection('privacy')}>Privacy & access</button><button className={section==='security'?'active':''} onClick={()=>setSection('security')}>Security</button></nav><div>
      {section==='profile'&&<section className="settings-section compact-settings"><p className="eyebrow">PERSONAL DETAILS</p><h2>Profile information</h2><p>Keep your contact details current for portfolio communication and account recovery.</p><div className="settings-form"><Field label="Full name" placeholder="Aarav Mehta"/><Field label="Email address" placeholder="aarav.mehta@example.in" type="email"/><div className="form-grid"><Field label="Mobile number" placeholder="+91 98765 43210"/><Field label="City" placeholder="Bengaluru"/></div></div><div className="settings-actions"><Button kind="secondary">Cancel</Button><Button>Save profile</Button></div></section>}
      {section==='preferences'&&<section className="settings-section compact-settings"><p className="eyebrow">ACCOUNT PREFERENCES</p><h2>Updates and display</h2><p>Choose how you receive important account information.</p><div className="preference-list"><label className="preference-row"><span><b>Monthly portfolio summary</b><small>Receive a concise email on the first working day.</small></span><input type="checkbox" defaultChecked /></label><label className="preference-row"><span><b>Holding update alerts</b><small>Notify me when a consultant updates a shared holding.</small></span><input type="checkbox" defaultChecked /></label><label className="preference-row"><span><b>Expense reminders</b><small>Remind me to review uncategorised transactions.</small></span><input type="checkbox" /></label><label className="preference-row"><span><b>Indian number format</b><small>Display values using lakh and crore groupings.</small></span><input type="checkbox" defaultChecked /></label></div><div className="settings-actions"><Button>Save preferences</Button></div></section>}
      {section==='privacy'&&<>
      <section className="settings-section"><p className="eyebrow">CONSULTANT ACCESS</p><h2>Detailed expense records</h2><p>Your portfolio holdings are shared for investment management. Expense details require a separate, explicit permission.</p>
        <div className={`consent-card ${granted?'granted':'revoked'}`}><div className="consent-icon"><Icon name={granted?'check':'lock'} /></div><div><Tag tone={granted?'good':'neutral'}>{granted?'Access granted':'Access not granted'}</Tag><h3>{granted?'Ritika Khanna can view expense details':'Expense details are private'}</h3><p>{granted?'Granted on 10 January 2025. You can revoke this access at any time.':'Your consultant can still view managed holdings, but not transactions or commitments.'}</p></div><Button kind={granted?'danger':'primary'} onClick={()=>setConfirm(true)}>{granted?'Revoke access':'Grant access'}</Button></div>
        <div className="access-list"><h3>What this permission includes</h3><div><Icon name="check"/><span><b>Monthly expense totals</b><small>Selected month and comparison with previous month</small></span></div><div><Icon name="check"/><span><b>Categories and transactions</b><small>Descriptions, payment methods and optional notes</small></span></div><div><Icon name="check"/><span><b>Recurring commitments</b><small>Amount, frequency and next due date</small></span></div></div>
      </section>
      <section className="settings-section"><p className="eyebrow">CONSENT HISTORY</p><h2>Permission record</h2><div className="history-row"><span><i className="activity-mark"/><b>Access granted</b><small>By Aarav Mehta</small></span><time>10 Jan 2025 · 11:42</time></div><div className="history-row"><span><i className="activity-mark rust"/><b>Access revoked</b><small>By Aarav Mehta</small></span><time>03 Nov 2024 · 09:18</time></div></section>
      </>}
      {section==='security'&&<section className="settings-section compact-settings"><p className="eyebrow">ACCOUNT SECURITY</p><h2>Password and sessions</h2><p>Use a strong, unique password and review where your account is signed in.</p><div className="settings-form"><Field label="Current password" placeholder="Enter current password" type="password"/><div className="form-grid"><Field label="New password" placeholder="At least 8 characters" type="password"/><Field label="Confirm new password" placeholder="Re-enter password" type="password"/></div></div><div className="settings-actions"><Button>Update password</Button></div><div className="security-session"><span><Icon name="check"/><span><b>Current session</b><small>Chrome on macOS · Bengaluru · Active now</small></span></span><Button kind="secondary">Sign out other sessions</Button></div></section>}
    </div></div>
    {confirm&&<Modal title={granted?'Revoke expense access?':'Grant expense access?'} onClose={()=>setConfirm(false)}><div className="modal-body"><p>{granted?'Ritika will immediately lose access to transaction details, category breakdowns and recurring commitments. Portfolio permissions are unchanged.':'Ritika will be able to view transaction details, category breakdowns and recurring commitments until you revoke access.'}</p><div className="modal-actions"><Button kind="quiet" onClick={()=>setConfirm(false)}>Cancel</Button><Button kind={granted?'danger':'primary'} onClick={()=>{setGranted(!granted);setConfirm(false)}}>{granted?'Revoke access':'Grant access'}</Button></div></div></Modal>}
  </div>
}

function ConsultantDashboard({ go, openCustomer }: { go:(p:Page)=>void; openCustomer:(customer:Customer)=>void }) {
  return <div className="page consultant-page"><header className="consultant-welcome"><div><p className="eyebrow">CONSULTANT OVERVIEW</p><h1>Good morning, Ritika.</h1><p>Eligible managed assets across 20 associated customers.</p></div><blockquote>“Every clear financial decision begins with a complete view.”<small>Your focus today: 4 portfolio reviews</small></blockquote><div><Select>Last 12 months</Select><Button kind="secondary" onClick={()=>go('reports')}>View reports</Button></div></header>
    <section className="consultant-lead"><div className="managed-assets"><span>Managing assets of</span><b>₹12.84 crore</b><p>Across <strong>20 customers</strong></p><small>Only holdings classified as firm-managed are included.</small></div><div><span>Associated customers</span><b>20</b><p>16 active · 4 review due</p></div><div><span>Average managed portfolio</span><b>₹64.2 lakh</b><p>Across eligible customer assets</p></div></section>
    <div className="consultant-grid"><section className="panel aum-trend"><header><div><p className="eyebrow">AUM TREND</p><h2>Managed assets over time</h2></div><div className="range-tabs"><button>3M</button><button>6M</button><button className="active">1Y</button></div></header><Chart variant="consultant"/><div className="chart-foot"><span>₹11.9cr</span><small>Portfolio history</small><span>₹12.84cr</span></div></section><section className="panel"><header><div><p className="eyebrow">ELIGIBLE AUM MIX</p><h2>Asset distribution</h2></div></header><Donut consultant/></section></div>
    <section className="panel customer-preview"><header><div><p className="eyebrow">CUSTOMER PORTFOLIOS</p><h2>Recently updated</h2></div><button className="text-link" onClick={()=>go('customers')}>Open directory →</button></header><table><thead><tr><th>Customer</th><th>Tracked portfolio</th><th>Eligible AUM</th><th>12M change</th><th>Updated</th></tr></thead><tbody>{customers.slice(0,5).map(c=><tr key={c[1]} onClick={()=>openCustomer(c)}><td><span className="person"><i>{c[0].split(' ').map(x=>x[0]).join('')}</i><span><b>{c[0]}</b><small>{c[1]}</small></span></span></td><td>{money(c[2])}</td><td><b>{money(c[3])}</b></td><td className={c[4].startsWith('+')?'positive':'negative'}>{c[4]}</td><td>{c[5]}</td></tr>)}</tbody></table></section>
  </div>
}

function CustomerDirectory({ go, openCustomer }: { go:(p:Page)=>void; openCustomer:(customer:Customer)=>void }) {
  const [query,setQuery]=useState('')
  const [adding,setAdding]=useState(false)
  const shown=useMemo(()=>customers.filter(c=>(c[0] as string).toLowerCase().includes(query.toLowerCase())||(c[1] as string).toLowerCase().includes(query.toLowerCase())),[query])
  return <div className="page"><PageHead eyebrow="RELATIONSHIPS" title="Customer directory" description="View and manage all customers associated with your advisory practice." />
    <div className="table-tools customer-tools"><div className="search"><Icon name="search" size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search name or email" /></div><Select>All asset classes</Select><Select>Last updated</Select><Button kind="secondary" icon="sliders">Filters</Button><Button icon="plus" onClick={()=>setAdding(true)}>Add customer</Button></div>
    <section className="table-card directory"><table><thead><tr><th>Customer</th><th>Portfolio value</th><th>Eligible AUM</th><th>12M change</th><th>Expense access</th><th>Last update</th><th></th></tr></thead><tbody>{shown.map(c=><tr key={c[1]} onClick={()=>openCustomer(c)}><td><span className="person"><i>{c[0].split(' ').map(x=>x[0]).join('')}</i><span><b>{c[0]}</b><small>{c[1]}</small></span></span></td><td>{money(c[2])}</td><td><b>{money(c[3])}</b></td><td className={c[4].startsWith('+')?'positive':'negative'}>{c[4]}</td><td><Tag tone={c[6]==='Granted'?'good':c[6]==='Revoked'?'warn':'neutral'}>{c[6]}</Tag></td><td>{c[5]}</td><td><button className="icon-btn" onClick={(event)=>{event.stopPropagation();openCustomer(c)}}><Icon name="chevron"/></button></td></tr>)}</tbody></table>{shown.length===0&&<div className="empty"><div><Icon name="search"/></div><h3>No customers found</h3><p>Try a different name, email address or clear your filters.</p><Button kind="secondary" onClick={()=>setQuery('')}>Clear search</Button></div>}</section>
    {adding&&<Modal title="Add customer" onClose={()=>setAdding(false)}><div className="modal-body"><Field label="Full name" placeholder="Enter customer name"/><Field label="Email address" placeholder="customer@example.in" type="email"/><div className="form-grid"><Field label="Mobile number" placeholder="+91 98765 43210"/><Field label="Relationship start date" placeholder="DD / MM / YYYY"/></div><p className="helper">The customer will receive an email to review and complete their account setup.</p><div className="modal-actions"><Button kind="quiet" onClick={()=>setAdding(false)}>Cancel</Button><Button onClick={()=>setAdding(false)}>Add customer</Button></div></div></Modal>}
  </div>
}

function CustomerProfile({ go, customer }: { go:(p:Page)=>void; customer:Customer }) {
  const [privateView,setPrivateView]=useState(false)
  const [name,email,portfolio,aum,change,lastUpdate,access]=customer
  const initials=name.split(' ').map(part=>part[0]).join('')
  const accessUnavailable=privateView||access!=='Granted'
  const holdingScale=portfolio/4862400
  const portfolioLabel=portfolio>=10000000?`₹${(portfolio/10000000).toFixed(2)}cr`:`₹${(portfolio/100000).toFixed(1)}L`
  return <div className="page profile-page"><button className="back-link" onClick={()=>go('customers')}>← Customer directory</button><section className="customer-profile-identity"><span className="profile-monogram">{initials}</span><div><p className="eyebrow">CUSTOMER PROFILE</p><h1>{name}</h1><p>{email} · Customer since June 2022</p></div><div><Tag tone="good">Active relationship</Tag><Button kind="secondary">Contact</Button><Button>Edit managed holdings</Button></div></section>
    <section className="profile-values"><div><span>Tracked portfolio</span><b>{money(portfolio)}</b><small>All customer-recorded assets</small></div><div><span>Eligible managed AUM</span><b>{money(aum)}</b><small>{Math.round(aum/portfolio*100)}% of tracked portfolio</small></div><div><span>12-month change</span><b className={change.startsWith('+')?'positive':'negative'}>{change}</b><small>Portfolio trend</small></div><div><span>Last reviewed</span><b>{lastUpdate}</b><small>By Ritika Khanna</small></div></section>
    <div className="profile-grid"><section className="panel"><header><div><p className="eyebrow">PORTFOLIO</p><h2>Asset allocation</h2></div></header><Donut total={portfolioLabel} subtitle="tracked total" /></section><section className="panel managed-list"><header><div><p className="eyebrow">MANAGED POSITIONS</p><h2>Eligible holdings</h2></div><button className="text-link" onClick={()=>go('holding')}>View all</button></header>{holdings.slice(0,4).map(h=><div key={h.name} className="holding-row"><span className="asset-letter">{h.name[0]}</span><span><b>{h.name}</b><small>{h.type}</small></span><span><b>{money(Math.round(h.value*holdingScale))}</b><Tag tone={h.managed?'good':'neutral'}>{h.managed?'Eligible':'Tracked only'}</Tag></span></div>)}</section></div>
    <section className="panel customer-expenses"><header><div><p className="eyebrow">CUSTOMER-PERMITTED DATA</p><h2>Expense context</h2></div>{access==='Granted'&&<label className="demo-toggle"><input type="checkbox" checked={privateView} onChange={e=>setPrivateView(e.target.checked)}/><span>Hide private data</span></label>}</header>{!accessUnavailable?<div className="expense-access-content"><div><span>February spending</span><b>₹98,450</b><small>↓ 6.2% from January</small></div><div className="compact-categories"><span>Housing <b>₹38,000</b></span><span>Food & dining <b>₹18,600</b></span><span>Shopping <b>₹10,500</b></span></div><div><span>Recurring commitments</span><b>₹67,868</b><small>5 commitments</small></div></div>:<div className="privacy-empty"><Icon name="lock"/><div><h3>Detailed expense access is unavailable</h3><p>{name} has not granted, or has revoked, permission to view transactions, category totals and recurring commitments. Portfolio access is unchanged.</p></div></div>}</section>
    <section className="panel audit"><header><div><p className="eyebrow">CHANGE HISTORY</p><h2>Shared holding history</h2></div></header><div className="history-row"><span><i className="activity-mark"/><b>Current value updated</b><small>HDFC Balanced Advantage Fund · by {name}</small></span><time>24 Feb 2025 · 09:42</time></div><div className="history-row"><span><i className="activity-mark rust"/><b>Management eligibility changed</b><small>Infosys Limited · by Ritika Khanna</small></span><time>20 Feb 2025 · 14:18</time></div></section>
  </div>
}

function Reports() {
  return <div className="page reports-page"><PageHead eyebrow="REPORTS & ANALYTICS" title="Managed portfolio reporting" description="Reporting includes only eligible firm-managed holdings."><Select>01 Mar 2024 — 28 Feb 2025</Select><Button kind="secondary">Export report</Button></PageHead>
    <div className="report-filters"><Select>All customers</Select><Select>All asset classes</Select><span>Last refreshed 24 Feb 2025, 09:30</span></div>
    <div className="report-grid"><section className="panel report-chart"><p className="eyebrow">ELIGIBLE AUM BY ASSET CLASS</p><h2>₹12.84 crore managed</h2><div className="horizontal-bars"><span><b>Mutual funds</b><i><em style={{width:'100%'}} /></i><strong>₹6.16cr</strong></span><span><b>Equities</b><i><em style={{width:'60%'}} /></i><strong>₹3.72cr</strong></span><span><b>Fixed deposits</b><i><em style={{width:'33%'}} /></i><strong>₹2.05cr</strong></span><span><b>Gold</b><i><em style={{width:'15%'}} /></i><strong>₹0.91cr</strong></span></div></section><section className="panel concentration"><p className="eyebrow">CUSTOMER DISTRIBUTION</p><h2>Managed portfolio bands</h2><div className="band-row"><span><b>5</b><small>Under ₹25L</small></span><span><b>8</b><small>₹25L–₹75L</small></span><span><b>5</b><small>₹75L–₹1.5cr</small></span><span><b>2</b><small>Above ₹1.5cr</small></span></div><p>Most managed relationships fall between ₹25 lakh and ₹75 lakh.</p></section></div>
    <section className="table-card"><table><thead><tr><th>Asset class</th><th>Eligible AUM</th><th>Share of AUM</th><th>Customers</th><th>Holdings</th><th>12M change</th></tr></thead><tbody><tr><td><b>Mutual funds</b></td><td>₹6.16 crore</td><td>48.0%</td><td>18</td><td>46</td><td className="positive">+6.8%</td></tr><tr><td><b>Equities</b></td><td>₹3.72 crore</td><td>29.0%</td><td>14</td><td>61</td><td className="positive">+4.2%</td></tr><tr><td><b>Fixed deposits</b></td><td>₹2.05 crore</td><td>16.0%</td><td>9</td><td>13</td><td className="positive">+2.1%</td></tr><tr><td><b>Gold</b></td><td>₹0.91 crore</td><td>7.0%</td><td>7</td><td>9</td><td className="negative">−0.6%</td></tr></tbody></table></section><p className="table-note">Reporting data updated through 24 February 2025.</p>
  </div>
}

function DesignSystem({ go }: { go:(p:Page)=>void }) {
  return <div className="system-page"><header><Logo/><Button kind="secondary" onClick={()=>go('home')}>Back to website</Button></header><main><p className="eyebrow">ARTHA PRODUCT SYSTEM · DESIGN.MD</p><h1>Engineered clarity,<br/>financial precision.</h1><section><h2>Foundation</h2><div className="swatches"><span className="swatch ink"><i/><b>Ink</b><small>#262626</small></span><span className="swatch teal"><i/><b>Primary blue</b><small>#1C69D4</small></span><span className="swatch paper"><i/><b>Surface soft</b><small>#F7F7F7</small></span><span className="swatch rust"><i/><b>Surface dark</b><small>#1A2129</small></span><span className="swatch gold"><i/><b>Muted</b><small>#6B6B6B</small></span></div></section><section><h2>Typography & figures</h2><div className="type-samples"><div><small>DISPLAY · INTER 700</small><b>Wealth deserves<br/>a wider view.</b></div><div><small>BODY · INTER 300</small><p>Clear labels, calm instructions and deliberate actions make complex financial information easier to understand.</p><strong>₹48,62,400.00</strong></div></div></section><section><h2>Core controls</h2><div className="component-row"><Button>Primary action</Button><Button kind="secondary">Secondary</Button><Button kind="danger">Revoke access</Button><Tag tone="good">Access granted</Tag><Tag tone="warn">Review due</Tag><Tag>Tracked only</Tag></div></section></main></div>
}

export default function App() {
  const [page,setPage]=useState<Page>('home')
  const [selectedCustomer,setSelectedCustomer]=useState<Customer>(customers[0])
  const go=(p:Page)=>{setPage(p);window.scrollTo({top:0,behavior:'smooth'})}
  const openCustomer=(customer:Customer)=>{setSelectedCustomer(customer);go('profile')}
  if(page==='home') return <Home go={go}/>
  if(page==='login'||page==='register') return <Auth mode={page} go={go}/>
  if(page==='system') return <DesignSystem go={go}/>
  const consultant=['consultant','customers','profile','reports'].includes(page)
  return <AppShell page={page} go={go} role={consultant?'consultant':'customer'}>
    {page==='customer'&&<CustomerDashboard go={go}/>}
    {page==='investments'&&<Investments go={go}/>}
    {page==='holding'&&<HoldingDetail go={go}/>}
    {page==='expenses'&&<Expenses/>}
    {page==='privacy'&&<Privacy/>}
    {page==='consultant'&&<ConsultantDashboard go={go} openCustomer={openCustomer}/>}
    {page==='customers'&&<CustomerDirectory go={go} openCustomer={openCustomer}/>}
    {page==='profile'&&<CustomerProfile go={go} customer={selectedCustomer}/>}
    {page==='reports'&&<Reports/>}
  </AppShell>
}
