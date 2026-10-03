import { useState, useEffect, useRef } from 'react';
import './Contact.css';

const contacts = [
  { icon: '📧', label: 'Email', value: 'chandruvasan65@gmail.com', href: 'mailto:chandruvasan65@gmail.com' },
  { icon: '📱', label: 'Phone', value: '+91 9360530330', href: 'tel:+919360530330' },
  { icon: '📍', label: 'Location', value: 'Salem, Tamil Nadu, India', href: null },
];

export default function Contact() {
  const ref = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    const el = ref.current;
    if (el) [...el.querySelectorAll('.reveal')].forEach(n => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Opens mailto with form data
    const mailto = `mailto:chandruvasan65@gmail.com?subject=${encodeURIComponent(form.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section className="section-wrapper alt" id="contact" ref={ref}>
      <div className="container">
        <div className="section-heading reveal">
          <h2>Get In <span>Touch</span></h2>
          <div className="heading-line" />
        </div>

        <div className="contact-layout">
          {/* Left: info */}
          <div className="reveal">
            <p className="contact-sub">
              Open to senior developer roles, technical training engagements, and consulting opportunities.
              Let's build something great together.
            </p>

            <div className="contact-info-cards">
              {contacts.map((c, i) => {
                const Tag = c.href ? 'a' : 'div';
                return (
                  <Tag
                    key={c.label}
                    href={c.href}
                    className="contact-card"
                    style={{ transitionDelay: `${i * 0.08}s` }}
                  >
                    <div className="contact-icon">{c.icon}</div>
                    <div>
                      <strong>{c.label}</strong>
                      <p>{c.value}</p>
                    </div>
                  </Tag>
                );
              })}
            </div>
          </div>

          {/* Right: form */}
          <div className="contact-form-card reveal" style={{ transitionDelay: '0.15s' }}>
            <h3>Send a Message</h3>
            <p>I'll get back to you within 24 hours.</p>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text" placeholder="John Doe" required
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email" placeholder="john@example.com" required
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text" placeholder="Project Collaboration"
                  value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  rows={5} placeholder="Tell me about your project or opportunity..." required
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                Send Message ✉
              </button>
              {sent && (
                <div className="form-success">
                  ✅ Your email client has been opened. Message ready to send!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
