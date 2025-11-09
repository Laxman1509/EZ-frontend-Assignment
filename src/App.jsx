import React, { useState } from 'react'
import './App.css'
import EZlogo from './assets/logo/EZlogo.png'

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const apiUrl = 'https://vernanbackend.ezlab.in/api/contact-us/'
  const MESSAGE_MAX = 500

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Please tell us your name'
    if (!form.email.trim()) e.email = 'We need your email to get back to you'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'That email doesn’t look right'
    if (!form.phone.trim()) e.phone = 'A phone number helps us reach you quickly'
    else if (!/^[\d+\-\s()]{7,20}$/.test(form.phone)) e.phone = 'Enter a valid phone number'
    if (!form.message.trim()) e.message = 'Tell us a bit about your request'
    else if (form.message.length > MESSAGE_MAX) e.message = `Keep it under ${MESSAGE_MAX} characters`
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(evt) {
    evt.preventDefault()
    setSuccess('')
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Network response was not ok')
      const data = await res.json()
      console.log('API returned:', data)
      setSuccess('Thanks — your message was sent. We’ll reply within 1 business day.')
      setForm({ name: '', email: '', phone: '', message: '' })
      setErrors({})
    } catch (err) {
      console.error(err)
      setSuccess('')
      setErrors(prev => ({ ...prev, submit: 'Failed to submit. Please check your connection and try again.' }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <header className="hero" aria-hidden={false}>
        <div className="hero-inner">
          <h1 className="title"><img src={EZlogo} alt="EZ Labs" style={{ width: '120px', height: 'auto' }}/></h1>
          <p className="subtitle">We are looking to hire a front-end intern with demonstrated ability to show initiative, be capable of taking ownership, have intellectual curiosity and good problem-solving skills.</p>
          <a className="cta" href="#contact">Get in touch</a>
        </div>
      </header>
      <main className="container">
        <section className="about">
          <h2>About</h2>
          <p>
            A minimal responsive landing page created for the Front‑End intern assignment.
            Use the contact form to send us a short message — we’ll reply as soon as we can.
          </p>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-heading">
          <div className="contact-card" role="region" aria-label="Contact form">
            <h3 id="contact-heading">Contact Us</h3>
            <p className="muted">Share a few details and we’ll follow up quickly.</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid">
                <label>
                  Name <small style={{color:'#6b7280', marginLeft:6}}>— who are you?</small>
                  <input
                    autoFocus
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'err-name' : undefined}
                  />
                  {errors.name && <div id="err-name" className="err">{errors.name}</div>}
                </label>

                <label>
                  Email <small style={{color:'#6b7280', marginLeft:6}}>— where we can reply</small>
                  <input
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    type="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'err-email' : undefined}
                  />
                  {errors.email && <div id="err-email" className="err">{errors.email}</div>}
                </label>

                <label>
                  Phone <small style={{color:'#6b7280', marginLeft:6}}>For urgent matters</small>
                  <input
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="123456789"
                    inputMode="tel"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'err-phone' : undefined}
                  />
                  {errors.phone && <div id="err-phone" className="err">{errors.phone}</div>}
                </label>

                <label className="full">
                  Message
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Message to EZ Labs"
                    rows={6}
                    maxLength={MESSAGE_MAX}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'err-message' : 'msg-help'}
                  />
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:6}}>
                    {errors.message ? <div id="err-message" className="err">{errors.message}</div>
                      : <div id="msg-help" className="muted" style={{fontSize:13}}>Max {MESSAGE_MAX} characters</div>}
                    <div className="muted" style={{fontSize:13}}>{form.message.length}/{MESSAGE_MAX}</div>
                  </div>
                </label>
              </div>

              {errors.submit && <div className="err submit" role="alert">{errors.submit}</div>}

              <div className="actions">
                <button
                  type="submit"
                  className="btn"
                  disabled={loading}
                  aria-disabled={loading}
                >
                  {loading ? 'Sending…' : 'Send message'}
                </button>

                <button
                  type="button"
                  className="btn-clear"
                  onClick={() => {
                    setForm({ name: '', email: '', phone: '', message: '' })
                    setErrors({})
                    setSuccess('')
                  }}
                >
                  Reset
                </button>
              </div>

              <div aria-live="polite" style={{minHeight:24}}>
                {success && <div className="success">{success}</div>}
              </div>
            </form>
          </div>

          <aside className="contact-aside" role="complementary" aria-label="Contact details">
            <h4>Need help?</h4>
            <p className="muted">Email us directly at <strong>hello@ezlabs</strong> </p>
            <p>Call us at <strong>+91 (555) 444-3333</strong>.</p>
            <p className="muted">Office hours: <strong>Mon–Fri, 9am–5pm</strong></p>
             
          </aside>
        </section>
      </main>

      <footer className="footer">
        <small> <strong> © {new Date().getFullYear()} EZ — Front‑End Intern Assignment by Laxman Sah from C-DAC, Noida</strong> </small>
      </footer>
    </div>
  )
}
 