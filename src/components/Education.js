import { useEffect, useRef } from 'react';
import './Education.css';

const strengths = [
  { icon: '🚀', label: 'High-Throughput System Design' },
  { icon: '📊', label: 'Advanced DSA Mentorship' },
  { icon: '🔧', label: 'Distributed Backend Engineering' },
  { icon: '👥', label: 'Developer Enablement' },
  { icon: '🏗️', label: 'Scalable Architecture' },
  { icon: '⚡', label: 'Rapid Adaptability' },
  { icon: '🎯', label: 'Technical Leadership' },
  { icon: '📡', label: 'Technical Communication' },
];

export default function Education() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    const el = ref.current;
    if (el) [...el.querySelectorAll('.reveal, .reveal-left, .reveal-right')].forEach(n => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section-wrapper" id="education" ref={ref}>
      <div className="container">
        <div className="section-heading reveal">
          <h2>Education &amp; <span>Strengths</span></h2>
          <div className="heading-line" />
        </div>

        <div className="edu-card reveal">
          <div className="edu-icon-wrap">🎓</div>
          <div>
            <h3>B.E. in Electronics and Communication Engineering</h3>
            <p className="edu-college">Bannari Amman Institute of Technology, Sathyamangalam, Erode</p>
            <span className="edu-cgpa">⭐ CGPA: 8.19</span>
          </div>
        </div>

        <div className="section-heading reveal" style={{ marginTop: '3.5rem' }}>
          <h2>Areas of <span>Interest</span></h2>
          <div className="heading-line" />
        </div>

        <div className="strengths-grid">
          {strengths.map((s, i) => (
            <div
              className="strength-card reveal"
              key={s.label}
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <span className="strength-icon">{s.icon}</span>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
