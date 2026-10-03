import { useState, useEffect, useRef } from 'react';
import './Experience.css';

const tabs = {
  Engineering: [
    'Architected and scaled the TSS LMS to handle 2,000+ concurrent active students simultaneously with zero downtime during high-stakes assessments.',
    'Engineered high-throughput backend microservices using NestJS and Express.js with database connection pooling and query optimization in MongoDB.',
    'Built dynamic, responsive frontend UIs using React.js with optimized state management and real-time student activity tracking.',
    'Implemented comprehensive unit and integration test coverage using Jest, enforcing reliable deployment pipelines and enterprise-grade code stability.',
  ],
  Training: [
    'Lead technical instructor training engineering batches in Data Structures & Algorithms, Full-Stack Web Development, and modern backend frameworks.',
    'Designed comprehensive hands-on curricula, live coding sessions, and real-world project scenarios elevating students\' problem-solving proficiency.',
    'Evaluated coding assessments, conducted detailed code reviews, and mentored aspiring software engineers to achieve industry-ready capabilities.',
  ],
};

export default function Experience() {
  const [activeTab, setActiveTab] = useState('Engineering');
  const [animKey, setAnimKey] = useState(0);
  const ref = useRef(null);

  const switchTab = (t) => { setActiveTab(t); setAnimKey(k => k + 1); };

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    const el = ref.current;
    if (el) [...el.querySelectorAll('.reveal')].forEach(n => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section-wrapper alt" id="experience" ref={ref}>
      <div className="container">
        <div className="section-heading reveal">
          <h2>Professional <span>Experience</span></h2>
          <div className="heading-line" />
        </div>

        <div className="exp-card reveal">
          <div className="exp-header">
            <div className="exp-header-left">
              <div className="exp-company-logo">🏢</div>
              <div>
                <h3>Senior Software Developer &amp; Technical Trainer</h3>
                <p className="exp-company">Tech Sign Solutions (TSS)</p>
              </div>
            </div>
            <span className="exp-date">2019 – 2023</span>
          </div>

          <div className="exp-tabs">
            <button className={`exp-tab ${activeTab === 'Engineering' ? 'active' : ''}`} onClick={() => switchTab('Engineering')}>
              ⚙️ Engineering
            </button>
            <button className={`exp-tab ${activeTab === 'Training' ? 'active' : ''}`} onClick={() => switchTab('Training')}>
              🎓 Training
            </button>
          </div>

          <ul className="exp-list" key={animKey}>
            {tabs[activeTab].map((item, i) => (
              <li className="exp-list-item" key={i} style={{ animationDelay: `${i * 0.07}s` }}>
                <span className="exp-bullet" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
