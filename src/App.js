import { useState, useEffect } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return show ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 999,
        width: '46px', height: '46px', borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
        border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer',
        boxShadow: '0 4px 20px var(--primary-glow)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'transform 0.2s, box-shadow 0.2s',
        fontFamily: 'Inter, sans-serif',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 30px var(--primary-glow)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px var(--primary-glow)'; }}
      aria-label="Back to top"
    >↑</button>
  ) : null;
}

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Skills />
      <Experience />
      <Education />
      <Contact />
      <footer className="footer">
        <p>© 2024 <span>Chandruvasan S</span> · Senior Full-Stack Developer &amp; Corporate Technical Trainer</p>
      </footer>
      <BackToTop />
    </>
  );
}

export default App;
