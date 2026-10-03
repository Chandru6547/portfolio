import { useState, useEffect, useRef } from 'react';
import './Hero.css';

const roles = ['Senior Full-Stack Developer', 'Corporate Technical Trainer', 'Microservices Architect', 'DSA & Algorithms Expert'];

function useCounter(target, duration, start) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0 = null;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// Particle canvas
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${p.o})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="hero-canvas" />;
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [started, setStarted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;
    if (!deleting && displayed.length < current.length)
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 65);
    else if (!deleting && displayed.length === current.length)
      timeout = setTimeout(() => setDeleting(true), 2200);
    else if (deleting && displayed.length > 0)
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    else { setDeleting(false); setRoleIdx((roleIdx + 1) % roles.length); }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.2 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const c1 = useCounter(500, 1800, started);
  const c2 = useCounter(2000, 2200, started);
  const c3 = useCounter(4, 1000, started);

  return (
    <section className="hero" id="about">
      <ParticleCanvas />
      <div className="hero-bg">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
      </div>

      <div className="hero-inner">
        {/* ── Left: text ── */}
        <div className="hero-text">
          <div className="hero-badge">
            <span className="badge-dot" /> Available for Opportunities
          </div>

          <h1><span className="name-gradient">Chandruvasan S</span></h1>

          <div className="hero-typing-wrap">
            <span className="typing-prefix">I'm a</span>
            <span className="hero-typing">{displayed}<span className="cursor" /></span>
          </div>

          <div className="hero-location">📍 Salem, Tamil Nadu, India</div>

          <p className="hero-summary">
            Versatile Senior Software Developer and Corporate Technical Trainer with extensive expertise in
            full-stack engineering, microservices architecture, and technical mentorship. Architected an LMS
            to handle <strong>2,000+ concurrent active students</strong> without downtime. Trained hundreds
            of developers in DSA, modern JavaScript ecosystems, and high-throughput backend architecture.
          </p>

          <div className="hero-btns">
            <a href="mailto:chandruvasan65@gmail.com" className="btn btn-primary">✉ Hire Me</a>
            <a href="#contact" className="btn btn-outline"
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              View Contact
            </a>
          </div>

          <div className="hero-stats" ref={statsRef}>
            <div className="hero-stat">
              <span className="hero-stat-num">{c1}+</span>
              <p>DSA Problems</p>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-num">{c2}+</span>
              <p>Concurrent Users</p>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-num">{c3}+</span>
              <p>Years Exp.</p>
            </div>
          </div>
        </div>

        {/* ── Right: photo ── */}
        <div className="hero-photo-col">
          <div className="hero-photo-card">
            <div className="photo-ring photo-ring-1" />
            <div className="photo-ring photo-ring-2" />
            <div className="photo-ring photo-ring-3" />
            <div className="hero-photo-frame">
              <div className="hero-photo-inner">
                <img src="/myimage.png" alt="Chandruvasan S" />
              </div>
            </div>
            <div className="photo-badge">
              <span className="photo-badge-dot" />
              <span>Open to Work</span>
            </div>
            <div className="tech-chip chip-1">NestJS</div>
            <div className="tech-chip chip-2">React.js</div>
            <div className="tech-chip chip-3">MongoDB</div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-mouse"><div className="scroll-wheel" /></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
