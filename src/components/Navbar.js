import { useState, useEffect } from 'react';
import './Navbar.css';

const links = ['About', 'Skills', 'Experience', 'Education', 'Contact'];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('About');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setScrolled(scrollTop > 40);

      const sections = links.map(l => document.getElementById(l.toLowerCase()));
      const current = sections.findLast(s => s && s.getBoundingClientRect().top <= 100);
      if (current) setActive(current.id.charAt(0).toUpperCase() + current.id.slice(1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <div className="nav-progress" style={{ width: `${progress}%` }} />
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <span className="nav-logo" onClick={() => scrollTo('about')}>Chandruvasan S</span>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? '✕' : '☰'}
        </button>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(l => (
            <li
              key={l}
              className={`${active === l ? 'active' : ''} ${l === 'Contact' ? 'nav-cta' : ''}`}
              onClick={() => scrollTo(l)}
            >
              {l}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
