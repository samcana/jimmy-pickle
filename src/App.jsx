import React, { useEffect, useMemo, useState } from 'react'
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Bookmark, Check,
  ChevronDown, ChevronRight, Clock3, Dumbbell, Filter, Heart, Mail,
  MapPin, Menu, Minus, Play, Plus, Printer, Search, Send, ShieldCheck,
  Sparkles, Users, X, Zap
} from 'lucide-react'
import { drills, categories } from './drills'

const LOGO = `${import.meta.env.BASE_URL}jimmy-pickle-logo.png`
const readStore = (key, fallback) => {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback } catch { return fallback }
}
const saveStore = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)) } catch {} }

function Logo({ small = false }) {
  const [failed, setFailed] = useState(false)
  return <a className={`brand ${small ? 'brand-small' : ''}`} href="#home" aria-label="Jimmy Pickle home">
    {!failed && <img src={LOGO} alt="Jimmy Pickle" onError={() => setFailed(true)} />}
    {failed && <span className="brand-mark">JP<span>!</span></span>}
    <span className="brand-words">JIMMY <b>PICKLE</b><small>GOOD SHOTS. GOOD TIMES.</small></span>
  </a>
}

function App() {
  const [page, setPage] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [favourites, setFavourites] = useState(() => readStore('jp-favourites', []))
  const [plans, setPlans] = useState(() => readStore('jp-plans', []))
  const [plan, setPlan] = useState(() => readStore('jp-current-plan', { name: 'My lesson plan', target: 60, items: [] }))
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All skills')
  const [level, setLevel] = useState('All levels')
  const [playerCount, setPlayerCount] = useState('Any group')
  const [maxMinutes, setMaxMinutes] = useState('Any duration')
  const [showFavourites, setShowFavourites] = useState(false)
  const [selected, setSelected] = useState(null)
  const [toast, setToast] = useState('')
  const [contactSent, setContactSent] = useState(false)

  useEffect(() => saveStore('jp-favourites', favourites), [favourites])
  useEffect(() => saveStore('jp-plans', plans), [plans])
  useEffect(() => saveStore('jp-current-plan', plan), [plan])

  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(''), 2400) }
  const navigate = (next) => { setPage(next); setMobileOpen(false); setSelected(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const toggleFavourite = (id) => setFavourites(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id])
  const addToPlan = (drill) => {
    setPlan(old => old.items.some(item => item.id === drill.id) ? old : { ...old, items: [...old.items, { id: drill.id, minutes: drill.minutes }] })
    notify('Added to your lesson plan')
  }
  const filteredDrills = useMemo(() => drills.filter(d => {
    const term = search.toLowerCase().trim()
    const matchesSearch = !term || `${d.title} ${d.category} ${d.objective} ${d.level}`.toLowerCase().includes(term)
    const matchesCategory = category === 'All skills' || d.category === category
    const matchesLevel = level === 'All levels' || d.level === level
    const matchesPlayers = playerCount === 'Any group' || (playerCount === '1–2 players' ? ['1–2','2'].includes(d.players) : playerCount === '3–4 players' ? ['2–4','4'].includes(d.players) : playerCount === '5–8 players' ? ['4','5–8'].includes(d.players) : true)
    const matchesDuration = maxMinutes === 'Any duration' || (maxMinutes === 'Up to 10 min' ? d.minutes <= 10 : maxMinutes === '11–15 min' ? d.minutes >= 11 && d.minutes <= 15 : d.minutes >= 16)
    return matchesSearch && matchesCategory && matchesLevel && matchesPlayers && matchesDuration && (!showFavourites || favourites.includes(d.id))
  }), [search, category, level, playerCount, maxMinutes, showFavourites, favourites])

  const planTotal = plan.items.reduce((sum, item) => sum + Number(item.minutes || 0), 0)
  const planDrills = plan.items.map(item => ({ ...drills.find(d => d.id === item.id), minutes: Number(item.minutes) })).filter(d => d.id)

  const updatePlanItem = (id, patch) => setPlan(old => ({ ...old, items: old.items.map(item => item.id === id ? { ...item, ...patch } : item) }))
  const removePlanItem = (id) => setPlan(old => ({ ...old, items: old.items.filter(item => item.id !== id) }))
  const movePlanItem = (index, direction) => setPlan(old => {
    const items = [...old.items]; const target = index + direction
    if (target < 0 || target >= items.length) return old
    ;[items[index], items[target]] = [items[target], items[index]]
    return { ...old, items }
  })
  const savePlan = () => {
    const name = plan.name.trim() || 'My lesson plan'
    const entry = { ...plan, name, updatedAt: new Date().toISOString() }
    setPlans(old => [...old.filter(p => p.name !== name), entry])
    notify('Lesson plan saved on this device')
  }
  const loadPlan = (saved) => { setPlan({ ...saved }); notify(`Loaded ${saved.name}`) }
  const clearFilters = () => { setSearch(''); setCategory('All skills'); setLevel('All levels'); setPlayerCount('Any group'); setMaxMinutes('Any duration'); setShowFavourites(false) }

  const navItems = [['home','Home'],['drills',"Jimmy's Drills"],['coaching','Lessons & Coaching'],['about','Meet Jimmy'],['contact','Contact Jimmy']]
  const goToDrills = () => navigate('drills')

  return <div className="app-shell">
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav className="desktop-nav">{navItems.map(([id,label]) => <button key={id} className={page === id ? 'nav-link active' : 'nav-link'} onClick={() => navigate(id)}>{label}</button>)}</nav>
        <button className="header-cta" onClick={() => navigate('contact')}>Book a lesson <ArrowUpRight size={16}/></button>
        <button className="mobile-menu" onClick={() => setMobileOpen(v => !v)} aria-label="Toggle navigation">{mobileOpen ? <X/> : <Menu/>}</button>
      </div>
      {mobileOpen && <nav className="mobile-nav">{navItems.map(([id,label]) => <button key={id} onClick={() => navigate(id)}>{label}<ChevronRight size={16}/></button>)}</nav>}
    </header>

    <main>
      {page === 'home' && <Home navigate={navigate} />}
      {page === 'drills' && <section className="page-wrap drills-page">
        <div className="page-heading">
          <div><span className="eyebrow"><span className="eyebrow-dot"/> THE COACH'S TOOLKIT</span><h1>Jimmy's <em>Drills.</em></h1><p>A court-side collection of drills to sharpen every part of your game. Find one, favourite it, or build a whole lesson.</p></div>
          <div className="heading-stamp"><span>PLAY</span><b>BETTER</b><span>HAVE FUN</span></div>
        </div>
        <div className="drills-layout">
          <div className="library-main">
            <div className="filter-panel">
              <div className="search-box"><Search size={18}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search drills, skills or goals..." /><kbd>⌘ K</kbd></div>
              <div className="filter-row">
                <label><span>SKILL</span><select value={category} onChange={e => setCategory(e.target.value)}><option>All skills</option>{categories.map(c => <option key={c}>{c}</option>)}</select></label>
                <label><span>LEVEL</span><select value={level} onChange={e => setLevel(e.target.value)}><option>All levels</option>{['Beginner','Intermediate','Advanced'].map(x => <option key={x}>{x}</option>)}</select></label>
                <label><span>PLAYERS</span><select value={playerCount} onChange={e => setPlayerCount(e.target.value)}>{['Any group','1–2 players','3–4 players','5–8 players'].map(x => <option key={x}>{x}</option>)}</select></label>
                <label><span>DRILL LENGTH</span><select value={maxMinutes} onChange={e => setMaxMinutes(e.target.value)}>{['Any duration','Up to 10 min','11–15 min','16+ min'].map(x => <option key={x}>{x}</option>)}</select></label>
              </div>
              <div className="filter-bottom"><button className={showFavourites ? 'chip-button selected' : 'chip-button'} onClick={() => setShowFavourites(v => !v)}><Heart size={14} fill={showFavourites ? 'currentColor' : 'none'}/> Favourites <span>{favourites.length}</span></button><button className="text-button" onClick={clearFilters}>Clear filters <X size={13}/></button></div>
            </div>
            <div className="results-bar"><span><b>{filteredDrills.length}</b> drills to choose from</span><span>14 SKILL AREAS</span></div>
            {filteredDrills.length ? <div className="drill-grid">{filteredDrills.map((d,i) => <DrillCard key={d.id} drill={d} index={i} favourite={favourites.includes(d.id)} onFavourite={() => toggleFavourite(d.id)} onOpen={() => setSelected(d)} onAdd={() => addToPlan(d)} />)}</div> : <div className="empty-state"><Search size={28}/><h3>No drills found</h3><p>Try changing a filter or search term.</p><button className="button button-dark" onClick={clearFilters}>Reset filters</button></div>}
          </div>
          <aside className="planner-aside">
            <div className="planner-card">
              <div className="planner-top"><span className="eyebrow">SESSION BUILDER</span><span className="planner-icon"><Dumbbell size={18}/></span></div>
              <h3>Build a <em>lesson.</em></h3>
              <p>Pick your drills and put together a session that makes sense for your players.</p>
              <div className="duration-picks"><span>SESSION GOAL</span><div>{[30,60,90].map(n => <button key={n} className={plan.target === n ? 'duration active' : 'duration'} onClick={() => setPlan(old => ({...old,target:n}))}>{n}<small>MIN</small></button>)}</div></div>
              <div className="plan-progress"><div className="progress-label"><span>YOUR SESSION</span><b>{planTotal} / {plan.target} min</b></div><div className="progress-track"><span style={{width:`${Math.min(100,planTotal/plan.target*100)}%`}}/></div></div>
              <div className="mini-plan">{planDrills.length ? planDrills.slice(0,3).map((d,i) => <div className="mini-plan-item" key={d.id}><span>{String(i+1).padStart(2,'0')}</span><b>{d.title}</b><small>{d.minutes}m</small></div>) : <div className="mini-empty">Your lesson plan is waiting for its first drill.</div>}{planDrills.length > 3 && <small className="more-drills">+ {planDrills.length-3} more drills</small>}</div>
              <button className="button button-lime full" onClick={() => navigate('planner')}>Open lesson planner <ArrowRight size={16}/></button>
              <div className="planner-note"><ShieldCheck size={14}/> Saved privately on this device</div>
            </div>
            <div className="aside-tip"><span>JIMMY'S TIP <Sparkles size={14}/></span><p>Good practice has a purpose. Pick one thing to improve, then make every rep count.</p></div>
          </aside>
        </div>
      </section>}

      {page === 'planner' && <section className="page-wrap">
        <div className="page-heading compact"><div><span className="eyebrow"><span className="eyebrow-dot"/> YOUR COURT-SIDE PLAN</span><h1>Lesson <em>planner.</em></h1><p>Put the session together, tweak the timings and take your plan to the court.</p></div><button className="button button-outline" onClick={() => navigate('drills')}> <Plus size={16}/> Add drills</button></div>
        <div className="planner-page-grid">
          <div className="plan-editor panel">
            <div className="panel-title"><div><span className="eyebrow">SESSION DETAILS</span><h2>Make it a good one.</h2></div><span className="planner-icon"><Dumbbell/></span></div>
            <label className="field-label">LESSON NAME<input value={plan.name} onChange={e => setPlan(old => ({...old,name:e.target.value}))} placeholder="e.g. Saturday beginners"/></label>
            <div className="target-select"><span className="field-label">TARGET LENGTH</span><div>{[30,60,90].map(n => <button key={n} className={plan.target === n ? 'target-option active' : 'target-option'} onClick={() => setPlan(old => ({...old,target:n}))}>{n} minutes</button>)}</div></div>
            <div className="plan-summary"><div><span>PLANNED TIME</span><b>{planTotal}<small> min</small></b></div><div><span>DRILLS</span><b>{plan.items.length}</b></div><div><span>REMAINING</span><b className={plan.target-planTotal < 0 ? 'over' : ''}>{plan.target-planTotal}<small> min</small></b></div></div>
            <div className="progress-track big"><span style={{width:`${Math.min(100,planTotal/plan.target*100)}%`}}/></div>
            <div className="plan-list-heading"><h3>Session sequence</h3><span>Drag-free ordering with up/down controls</span></div>
            {planDrills.length ? <div className="plan-list">{planDrills.map((d,i) => <div className="plan-row" key={d.id}>
              <div className="plan-number">{String(i+1).padStart(2,'0')}</div><div className="plan-row-info"><b>{d.title}</b><span>{d.category} · {d.level}</span></div>
              <div className="minute-control"><button onClick={() => updatePlanItem(d.id,{minutes:Math.max(1,d.minutes-1)})}><Minus size={13}/></button><b>{d.minutes}m</b><button onClick={() => updatePlanItem(d.id,{minutes:d.minutes+1})}><Plus size={13}/></button></div>
              <div className="order-buttons"><button onClick={() => movePlanItem(i,-1)} disabled={i===0} aria-label="Move up">↑</button><button onClick={() => movePlanItem(i,1)} disabled={i===planDrills.length-1} aria-label="Move down">↓</button></div>
              <button className="remove-button" onClick={() => removePlanItem(d.id)} aria-label="Remove drill"><X size={16}/></button>
            </div>)}</div> : <div className="empty-plan"><div className="empty-plan-icon"><Dumbbell size={24}/></div><h3>Your lesson starts here.</h3><p>Add drills from the library and they'll appear in your session sequence.</p><button className="button button-dark" onClick={() => navigate('drills')}>Browse the drills <ArrowRight size={16}/></button></div>}
            <div className="plan-actions"><button className="button button-lime" onClick={savePlan}><Check size={16}/> Save lesson plan</button><button className="button button-outline" onClick={() => window.print()}><Printer size={16}/> Print plan</button></div>
          </div>
          <aside className="saved-panel panel"><span className="eyebrow">YOUR SAVED SESSIONS</span><h2>Back for <em>more?</em></h2><p>Saved plans stay in this browser, ready for next time.</p>{plans.length ? <div className="saved-list">{plans.map((p,i) => <button key={i} className="saved-plan" onClick={() => loadPlan(p)}><span className="saved-plan-icon"><Bookmark size={16}/></span><span><b>{p.name}</b><small>{p.items.length} drills · {p.target} min target</small></span><ChevronRight size={16}/></button>)}</div> : <div className="saved-empty">No saved sessions yet. Save your first plan and it'll live here.</div>}<button className="text-button" onClick={() => {setPlan({name:'New lesson plan',target:60,items:[]});notify('Started a fresh plan')}}>Start a fresh plan <ArrowRight size={14}/></button></aside>
        </div>
      </section>}

      {page === 'coaching' && <section className="page-wrap content-page"><div className="page-heading"><div><span className="eyebrow"><span className="eyebrow-dot"/> GET ON COURT</span><h1>Lessons & <em>coaching.</em></h1><p>Whether you're picking up a paddle for the first time or looking to sharpen your competitive edge, there's a session for you.</p></div></div>
        <div className="coaching-grid">{[['01','Private coaching','One-to-one attention, tailored to your game. Work on the shots, movement and decisions that will make the biggest difference.','1 player'],['02','Small group sessions','Learn together, get plenty of reps and enjoy a bit of friendly competition.','2–4 players'],['03','Beginner sessions','Get comfortable with the rules, court positions and essential shots. Build confidence from the first serve.','New to pickleball'],['04','Skills sessions','Focused practice for serves, returns, dinks, volleys, resets and everything in between.','Pick your focus']].map(([n,t,d,tag])=><article className="coaching-card" key={n}><span className="coaching-num">{n}</span><div className="coaching-symbol"><Activity size={22}/></div><h3>{t}</h3><p>{d}</p><span className="coaching-tag">{tag}</span><button className="arrow-link" onClick={() => navigate('contact')}>Ask about this session <ArrowUpRight size={16}/></button></article>)}</div>
        <div className="callout-band"><div><span className="eyebrow">LET'S GET YOU PLAYING</span><h2>Good coaching.<br/><em>Better pickleball.</em></h2></div><button className="button button-lime" onClick={() => navigate('contact')}>Enquire about a lesson <ArrowRight size={16}/></button></div>
        <p className="placeholder-note">Lesson availability, locations and pricing can be added here once confirmed.</p>
      </section>}

      {page === 'about' && <section className="page-wrap content-page"><div className="about-hero"><div className="about-copy"><span className="eyebrow"><span className="eyebrow-dot"/> THE GUY BEHIND THE PADDLE</span><h1>Meet <em>Jimmy.</em></h1><p className="lead">A little less standing around. A little more getting better. And always a good time on court.</p><p>Jimmy Pickle is all about helping people enjoy pickleball, build confidence and improve one shot at a time. Whether you're brand new to the game or looking to sharpen a specific skill, sessions are designed to be practical, positive and full of useful reps.</p><p>This is Jimmy's corner of the pickleball world. Add a personal photo and a few details about his story here to make it your own.</p><button className="button button-dark" onClick={() => navigate('contact')}>Come hit a few <ArrowRight size={16}/></button></div><div className="about-photo"><div className="photo-placeholder"><span className="pickleball-ball">●</span><b>JIMMY<br/>PICKLE</b><small>PHOTO GOES HERE</small></div><div className="photo-caption">GOOD SHOTS. GOOD TIMES.</div></div></div></section>}

      {page === 'contact' && <section className="page-wrap content-page contact-page"><div className="page-heading"><div><span className="eyebrow"><span className="eyebrow-dot"/> LET'S TALK PICKLEBALL</span><h1>Contact <em>Jimmy.</em></h1><p>Got a question, want to book a session or just want to work on that backhand? Send Jimmy a note.</p></div></div><div className="contact-grid"><div className="contact-intro"><div className="contact-graphic"><span>JP</span><div className="graphic-ball">●</div></div><h2>Ready to get<br/><em>on court?</em></h2><p>Tell Jimmy a little about what you're looking for and he'll be in touch.</p><div className="contact-detail"><MapPin size={17}/><span>Coaching location to be confirmed</span></div><div className="contact-detail"><Mail size={17}/><span>Contact details to be added</span></div></div><form className="contact-form panel" onSubmit={e => {e.preventDefault();setContactSent(true)}}><div className="form-heading"><span className="eyebrow">LESSON ENQUIRY</span><h2>What's the <em>plan?</em></h2></div>{contactSent ? <div className="form-success"><div><Check size={25}/></div><h3>Thanks for reaching out!</h3><p>This is a preview form. It hasn't sent your enquiry yet. Connect an email service when you're ready to receive messages.</p><button type="button" className="button button-dark" onClick={() => setContactSent(false)}>Send another enquiry</button></div> : <><div className="form-two"><label className="field-label">YOUR NAME *<input required placeholder="Your name"/></label><label className="field-label">EMAIL ADDRESS *<input required type="email" placeholder="you@example.com"/></label></div><div className="form-two"><label className="field-label">PHONE NUMBER<input type="tel" placeholder="Optional"/></label><label className="field-label">LESSON TYPE<select defaultValue=""><option value="" disabled>Select a lesson</option><option>Private coaching</option><option>Small group</option><option>Beginner lesson</option><option>Skills session</option><option>Not sure yet</option></select></label></div><div className="form-two"><label className="field-label">NUMBER OF PLAYERS<select defaultValue=""><option value="" disabled>Select group size</option><option>1</option><option>2</option><option>3–4</option><option>5–8</option><option>More than 8</option></select></label><label className="field-label">EXPERIENCE LEVEL<select defaultValue=""><option value="" disabled>Select your level</option><option>Brand new</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label></div><label className="field-label">PREFERRED DATE / TIME<input placeholder="e.g. Weekday mornings, Saturday afternoon..."/></label><label className="field-label">ANYTHING ELSE?<textarea rows="4" placeholder="Tell Jimmy what you'd like to work on..."/></label><button className="button button-lime full" type="submit">Send lesson enquiry <Send size={16}/></button><p className="form-disclaimer">This form is currently a front-end demo and does not send or store enquiries.</p></>}</form></div></section>}
    </main>

    <Footer navigate={navigate}/>
    {selected && <DrillModal drill={selected} favourite={favourites.includes(selected.id)} onClose={() => setSelected(null)} onFavourite={() => toggleFavourite(selected.id)} onAdd={() => addToPlan(selected)} />}
    {toast && <div className="toast"><Check size={16}/>{toast}</div>}
  </div>
}

function DrillCard({drill,index,favourite,onFavourite,onOpen,onAdd}) {
  const accents = ['mint','peach','blue','yellow']
  return <article className="drill-card">
    <div className={`drill-art ${accents[index%4]}`}><span className="drill-art-number">{String(index+1).padStart(2,'0')}</span><span className="art-ball">●</span><button className={favourite?'card-heart liked':'card-heart'} onClick={onFavourite} aria-label="Toggle favourite"><Heart size={17} fill={favourite?'currentColor':'none'}/></button><span className="art-category">{drill.category}</span></div>
    <div className="drill-card-body"><div className="drill-meta"><span>{drill.level}</span><span><Clock3 size={13}/>{drill.minutes} min</span></div><h3>{drill.title}</h3><p>{drill.objective}</p><div className="card-footer"><span><Users size={14}/>{drill.players} players</span><div><button className="icon-action" onClick={onAdd} title="Add to lesson plan"><Plus size={17}/></button><button className="card-open" onClick={onOpen}>View drill <ArrowUpRight size={15}/></button></div></div></div>
  </article>
}

function DrillModal({drill,favourite,onClose,onFavourite,onAdd}) {
  useEffect(() => { const fn = e => e.key === 'Escape' && onClose(); window.addEventListener('keydown',fn); return () => window.removeEventListener('keydown',fn) },[onClose])
  const yt = `https://www.youtube.com/results?search_query=${encodeURIComponent(`pickleball ${drill.title} drill`) }`
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}><div className="drill-modal" role="dialog" aria-modal="true" aria-label={drill.title}><div className="modal-top"><span className="eyebrow">{drill.category} / {drill.level}</span><button className="close-modal" onClick={onClose}><X/></button></div><h2>{drill.title}</h2><p className="modal-objective">{drill.objective}</p><div className="modal-stats"><span><Clock3 size={15}/>{drill.minutes} minutes</span><span><Users size={15}/>{drill.players} players</span><span><Zap size={15}/>{drill.level}</span></div><div className="modal-section"><h3>How it works</h3><ol>{drill.steps.map((s,i)=><li key={i}>{s}</li>)}</ol></div><div className="modal-section"><h3>Jimmy's coaching tips</h3><ul>{drill.tips.map((s,i)=><li key={i}>{s}</li>)}</ul></div><div className="variation-grid"><div><b>MAKE IT EASIER</b><p>{drill.easier}</p></div><div><b>LEVEL IT UP</b><p>{drill.harder}</p></div></div><div className="modal-section equipment"><h3>Equipment</h3><p>{drill.equipment}</p></div><div className="modal-actions"><button className="button button-dark" onClick={onAdd}><Plus size={16}/> Add to lesson</button><button className={favourite?'button button-fav active':'button button-outline'} onClick={onFavourite}><Heart size={16} fill={favourite?'currentColor':'none'}/>{favourite?'Saved':'Favourite'}</button><a className="button button-outline" href={yt} target="_blank" rel="noreferrer"><Play size={15}/> Find video <ArrowUpRight size={14}/></a></div><p className="video-note">Opens YouTube search results for this drill. No unverified videos are embedded.</p></div></div>
}

function Home({navigate}) {
  return <><section className="hero-section"><div className="hero-grid-bg"/><div className="hero-inner"><div className="hero-copy"><span className="eyebrow"><span className="eyebrow-dot"/> PICKLEBALL COACHING, WITH PERSONALITY</span><h1>Get in the game.<br/><em>Find your</em> <span className="scribble">pickle.</span></h1><p>Good shots. Good times. A little coaching can make a big difference. Welcome to Jimmy Pickle — your friendly corner of the court.</p><div className="hero-actions"><button className="button button-lime" onClick={() => navigate('contact')}>Book a lesson <ArrowUpRight size={17}/></button><button className="button button-ghost" onClick={() => navigate('drills')}>Explore the drills <ArrowRight size={17}/></button></div><div className="hero-proof"><div className="proof-icons"><span>🏓</span><span>🥒</span><span>☀️</span></div><span>More confidence. Better rallies. More fun.</span></div></div><div className="hero-visual"><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/><div className="hero-court"><div className="court-net"/><div className="court-line vertical"/><div className="court-line horizontal"/><div className="court-circle"><span className="court-ball">●</span></div><div className="court-stamp">JIMMY<br/><b>PICKLE</b><small>LET'S PLAY</small></div></div><div className="floating-note note-top"><Zap size={15}/> PRACTISE WITH PURPOSE</div><div className="floating-note note-bottom"><span className="tiny-ball">●</span> STAY OUT OF THE KITCHEN? NEVER.</div><div className="hero-sun">✳</div></div></div><div className="hero-bottom"><span>YOUR GAME. YOUR PACE.</span><span>SCROLL TO EXPLORE ↓</span><span>EST. FOR THE LOVE OF PICKLEBALL</span></div></section>
    <section className="home-intro section-pad"><div className="section-kicker">THE JIMMY PICKLE WAY <span>01 / 03</span></div><div className="intro-grid"><h2>Less guesswork.<br/><em>More good reps.</em></h2><div><p>Pickleball is easy to pick up — and ridiculously fun to get better at. Jimmy's approach is simple: useful practice, clear coaching and plenty of time with a paddle in your hand.</p><button className="arrow-link" onClick={() => navigate('about')}>Get to know Jimmy <ArrowUpRight size={16}/></button></div></div></section>
    <section className="feature-section"><div className="section-pad"><div className="section-kicker">A LITTLE SOMETHING FOR EVERY PLAYER <span>02 / 03</span></div><div className="feature-heading"><h2>Find your next<br/><em>favourite drill.</em></h2><p>From your first serve to a tidy third-shot drop, browse practical drills by skill, level and group size.</p></div><div className="feature-cards"><div className="feature-card feature-dark"><span className="feature-index">01 — THE TOOLKIT</span><div className="feature-icon"><Dumbbell size={23}/></div><h3>Jimmy's<br/><em>Drills.</em></h3><p>A growing library of court-ready practice ideas, with coaching tips and progressions.</p><button className="button button-lime" onClick={() => navigate('drills')}>Browse the drills <ArrowRight size={16}/></button><div className="feature-decoration">JP</div></div><div className="feature-card feature-lime"><span className="feature-index">02 — YOUR SESSION</span><div className="feature-icon"><Activity size={23}/></div><h3>Make a<br/><em>game plan.</em></h3><p>Pick your drills, set the timings and build a 30, 60 or 90-minute session.</p><button className="button button-dark" onClick={() => navigate('planner')}>Build a lesson <ArrowRight size={16}/></button><div className="feature-decoration pickle">●</div></div><div className="feature-card feature-paper"><span className="feature-index">03 — GET ON COURT</span><div className="feature-icon"><Users size={23}/></div><h3>Coaching<br/><em>with Jimmy.</em></h3><p>Personal, practical sessions built around your game and what you want to improve.</p><button className="button button-outline" onClick={() => navigate('coaching')}>Explore coaching <ArrowRight size={16}/></button><div className="feature-decoration sun">✳</div></div></div></div></section>
    <section className="home-cta section-pad"><div><span className="eyebrow"><span className="eyebrow-dot"/> YOUR NEXT GREAT RALLY STARTS HERE</span><h2>Ready to get<br/><em>your pickle on?</em></h2></div><button className="button button-lime" onClick={() => navigate('contact')}>Say hello to Jimmy <ArrowUpRight size={17}/></button></section></>
}

function Footer({navigate}) {
  return <footer className="site-footer"><div className="footer-main"><div><Logo small/><p>Good shots. Good times.<br/>See you on the court.</p></div><div className="footer-links"><span>TAKE A LOOK</span><button onClick={() => navigate('drills')}>Jimmy's Drills</button><button onClick={() => navigate('coaching')}>Lessons & Coaching</button><button onClick={() => navigate('about')}>Meet Jimmy</button><button onClick={() => navigate('contact')}>Contact Jimmy</button></div><div className="footer-note"><span>THE ONLY BAD SHOT...</span><b>...is the one you don't learn from.</b><span className="footer-pickle">🥒</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} JIMMY PICKLE. ALL RIGHTS RESERVED.</span><span>MADE FOR THE LOVE OF THE GAME.</span></div></footer>
}

export default App
