import React, { useEffect, useRef, useState } from 'react'
import Scene from './Scene.jsx'

const WA_NUMBER = '919993756923'
const PHONE_DISPLAY = '+91 99937 56923'
const PHONE_TEL = '+919993756923'

const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`

const CATEGORIES = [
  { icon: '🌾', title: 'Atta, Rice & Dal', text: 'Daily staples, sourced fresh and stored clean.' },
  { icon: '🫒', title: 'Oils & Ghee', text: 'Mustard, sunflower, groundnut and pure desi ghee.' },
  { icon: '🌶️', title: 'Masala & Spices', text: 'Whole and ground spices with real aroma.' },
  { icon: '🍵', title: 'Tea, Snacks & Biscuits', text: 'Chai-time favourites for the whole family.' },
  { icon: '🧼', title: 'Household Needs', text: 'Soaps, detergents and cleaning essentials.' },
  { icon: '🥛', title: 'Dairy & Daily Fresh', text: 'Milk, paneer, curd and bread every morning.' }
]

const PRODUCTS = [
  { id: 1, name: 'Premium Basmati Rice 5kg', price: 640, tag: 'Best Seller' },
  { id: 2, name: 'Fresh Chakki Atta 10kg', price: 410, tag: 'Fresh Stock' },
  { id: 3, name: 'Kachi Ghani Mustard Oil 1L', price: 165, tag: 'Pure' },
  { id: 4, name: 'Toor Dal 1kg', price: 145, tag: 'Value Pack' },
  { id: 5, name: 'Assam Gold Tea 500g', price: 235, tag: 'Chai Special' },
  { id: 6, name: 'Garam Masala 200g', price: 120, tag: 'Aromatic' }
]

const STATS = [
  { value: 12, suffix: '+', label: 'Years serving families' },
  { value: 2500, suffix: '+', label: 'Products in stock' },
  { value: 800, suffix: '+', label: 'Happy regular customers' },
  { value: 30, suffix: ' min', label: 'Home delivery promise' }
]

function WhatsAppIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44zM12.07 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.9 9.9 0 0 1-1.52-5.26c0-5.46 4.45-9.9 9.92-9.9 2.64 0 5.12 1.03 6.99 2.9a9.84 9.84 0 0 1 2.9 7c0 5.46-4.45 9.9-9.9 9.9zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35z" />
    </svg>
  )
}

function Counter({ value, suffix }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true
            const t0 = performance.now()
            const dur = 1600
            const tick = (t) => {
              const k = Math.min(1, (t - t0) / dur)
              setN(Math.round(value * (1 - Math.pow(1 - k, 3))))
              if (k < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          }
        })
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value])

  return (
    <span ref={ref}>
      {n.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}

export default function App() {
  const progress = useRef(0)
  const [cart, setCart] = useState({})
  const [cartOpen, setCartOpen] = useState(false)
  const [scrollPct, setScrollPct] = useState(0)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      progress.current = p
      setScrollPct(p)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in')
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const add = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }))
  const remove = (id) =>
    setCart((c) => {
      const next = { ...c }
      if (next[id] > 1) next[id] -= 1
      else delete next[id]
      return next
    })

  const items = PRODUCTS.filter((p) => cart[p.id])
  const count = Object.values(cart).reduce((a, b) => a + b, 0)
  const total = items.reduce((sum, p) => sum + p.price * cart[p.id], 0)

  const orderOnWhatsApp = () => {
    let text
    if (items.length === 0) {
      text = 'Hello Mohit Kirana Store, I would like to place an order.'
    } else {
      const lines = items.map((p) => `• ${p.name} x ${cart[p.id]} = ₹${p.price * cart[p.id]}`)
      text = `Hello Mohit Kirana Store, I would like to order:\n\n${lines.join('\n')}\n\nTotal: ₹${total}\n\nPlease confirm availability and delivery time.`
    }
    window.open(waLink(text), '_blank', 'noopener,noreferrer')
  }

  const sendContact = () => {
    const who = name.trim() ? `Hi, I am ${name.trim()}.` : 'Hi,'
    const body = message.trim() ? message.trim() : 'I would like to know more about your store.'
    window.open(waLink(`${who}\n${body}`), '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <div className="canvas-wrap">
        <Scene progress={progress} />
        <div className="vignette" />
      </div>

      <div className="progress" style={{ transform: `scaleX(${scrollPct})` }} />

      <header className="nav">
        <a href="#top" className="brand">
          <span className="brand-mark">M</span>
          <span>Mohit Kirana Store</span>
        </a>
        <nav className="links">
          <a href="#categories">Categories</a>
          <a href="#products">Products</a>
          <a href="#why">Why Us</a>
          <a href="#visit">Visit</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="cart-btn" onClick={() => setCartOpen(true)}>
          🛒 Cart <span className="badge">{count}</span>
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <p className="eyebrow">Fresh • Local • Trusted</p>
          <h1>
            Mohit <span className="gold">Kirana</span> Store
          </h1>
          <p className="lead">
            Your neighbourhood grocery, reimagined. Everything your kitchen needs, from daily staples to special
            spices, delivered with the warmth you already trust.
          </p>
          <div className="cta-row">
            <a href="#products" className="btn primary">Shop Essentials</a>
            <a
              href={waLink('Hello Mohit Kirana Store, I would like to place an order.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn wa"
            >
              <WhatsAppIcon size={18} /> Order on WhatsApp
            </a>
            <a href="#contact" className="btn ghost">Contact Us</a>
          </div>
          <div className="scroll-hint">Scroll to explore the 3D store ↓</div>
        </section>

        <section id="categories" className="section">
          <div className="reveal">
            <p className="eyebrow">Aisles</p>
            <h2>Everything under one cozy roof</h2>
          </div>
          <div className="grid cats">
            {CATEGORIES.map((c, i) => (
              <article key={c.title} className="glass card reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="products" className="section">
          <div className="reveal">
            <p className="eyebrow">Featured</p>
            <h2>Customer favourites this week</h2>
          </div>
          <div className="grid prods">
            {PRODUCTS.map((p, i) => (
              <article key={p.id} className="glass product reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="tag">{p.tag}</span>
                <h3>{p.name}</h3>
                <div className="price-row">
                  <strong>₹{p.price}</strong>
                  <button className="btn small" onClick={() => add(p.id)}>Add +</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="why" className="section">
          <div className="reveal">
            <p className="eyebrow">Why families choose us</p>
            <h2>Small shop. Big trust.</h2>
          </div>
          <div className="grid stats">
            {STATS.map((s) => (
              <div key={s.label} className="glass stat reveal">
                <div className="num">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="visit" className="section">
          <div className="glass visit reveal">
            <div>
              <p className="eyebrow">Visit or order</p>
              <h2>Open every day, 7 AM to 10 PM</h2>
              <p className="lead small">
                Walk in, call, or message us your list on WhatsApp. We pack it fresh and send it home.
              </p>
            </div>
            <ul className="info">
              <li>📍 Main Market Road, Your City</li>
              <li>📞 {PHONE_DISPLAY}</li>
              <li>💬 WhatsApp orders welcome</li>
              <li>🚚 Free delivery above ₹499</li>
            </ul>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="reveal">
            <p className="eyebrow">Contact us</p>
            <h2>For orders, message us on WhatsApp</h2>
          </div>
          <div className="glass contact reveal">
            <div className="contact-info">
              <p className="lead small no-pull">
                Send your grocery list, ask about prices, or check what is in stock. We usually reply within minutes
                during store hours.
              </p>
              <div className="contact-number">{PHONE_DISPLAY}</div>
              <div className="contact-actions">
                <a
                  href={waLink('Hello Mohit Kirana Store, I would like to place an order.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn wa"
                >
                  <WhatsAppIcon size={18} /> Chat on WhatsApp
                </a>
                <a href={`tel:${PHONE_TEL}`} className="btn ghost">📞 Call Now</a>
              </div>
            </div>
            <div className="contact-form">
              <label className="field">
                <span>Your name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </label>
              <label className="field">
                <span>Your message or order list</span>
                <textarea
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Example: 5kg atta, 1L mustard oil, 2 packs tea"
                />
              </label>
              <button className="btn wa full" onClick={sendContact}>
                <WhatsAppIcon size={18} /> Send on WhatsApp
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Mohit Kirana Store. Orders: {PHONE_DISPLAY}</span>
        <a href="#top">Back to top ↑</a>
      </footer>

      <a
        className="wa-float"
        href={waLink('Hello Mohit Kirana Store, I would like to place an order.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order on WhatsApp"
      >
        <WhatsAppIcon size={30} />
      </a>

      <aside className={`drawer ${cartOpen ? 'open' : ''}`} aria-hidden={!cartOpen}>
        <div className="drawer-head">
          <h3>Your Cart</h3>
          <button className="close" onClick={() => setCartOpen(false)}>✕</button>
        </div>
        <div className="drawer-body">
          {items.length === 0 && <p className="muted">Your cart is empty. Add something tasty!</p>}
          {items.map((p) => (
            <div key={p.id} className="line">
              <div>
                <div className="line-name">{p.name}</div>
                <div className="muted">₹{p.price} × {cart[p.id]}</div>
              </div>
              <div className="qty">
                <button onClick={() => remove(p.id)}>−</button>
                <span>{cart[p.id]}</span>
                <button onClick={() => add(p.id)}>+</button>
              </div>
            </div>
          ))}
        </div>
        <div className="drawer-foot">
          <div className="total"><span>Total</span><strong>₹{total}</strong></div>
          <button className="btn wa full" onClick={orderOnWhatsApp}>
            <WhatsAppIcon size={18} /> Order on WhatsApp
          </button>
        </div>
      </aside>
      {cartOpen && <div className="scrim" onClick={() => setCartOpen(false)} />}
    </>
  )
}
