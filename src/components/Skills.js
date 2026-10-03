import { useEffect, useRef } from 'react';
import './Skills.css';

const skillGroups = [
  { category: 'Languages & Runtimes', icon: '💻', skills: ['TypeScript', 'JavaScript (ES6+)', 'Node.js', 'C', 'C++', 'Core Java'] },
  { category: 'Backend Architecture', icon: '⚙️', skills: ['NestJS', 'Express.js', 'Microservices', 'REST APIs', 'WebSockets', 'Scalable Auth'] },
  { category: 'Frontend Ecosystem', icon: '🎨', skills: ['React.js', 'Vue.js', 'State Management', 'High-Performance UI'] },
  { category: 'Databases & DevOps', icon: '🗄️', skills: ['MongoDB', 'Indexing & Aggregations', 'Jest', 'Git', 'CI/CD'] },
  { category: 'Instructional Areas', icon: '🎓', skills: ['Data Structures & Algorithms', 'Full-Stack MERN/Nest', 'System Design'] },
];

function SkillCard({ group, delay }) {
  const cardRef = useRef(null);

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      className="skill-card reveal"
      style={{ transitionDelay: delay }}
      onMouseMove={onMouseMove}
    >
      <div className="skill-card-header">
        <div className="skill-card-icon">{group.icon}</div>
        <h3>{group.category}</h3>
      </div>
      <div className="skill-tags">
        {group.skills.map(s => <span key={s} className="skill-tag">{s}</span>)}
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    const el = ref.current;
    if (el) [...el.querySelectorAll('.reveal')].forEach(n => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section-wrapper" id="skills" ref={ref}>
      <div className="container">
        <div className="section-heading reveal">
          <h2>Technical <span>Expertise</span></h2>
          <div className="heading-line" />
        </div>

        <div className="skills-grid">
          {skillGroups.map((g, i) => (
            <SkillCard key={g.category} group={g} delay={`${i * 0.1}s`} />
          ))}
        </div>

        <div className="dsa-banner reveal">
          <div className="dsa-icon-wrap">🏆</div>
          <div>
            <strong>Algorithmic Mastery</strong>
            <p>
              Solved ≥ 500 problems on LeetCode &amp; global coding platforms — Dynamic Programming,
              Advanced Graph Theory, Trees, Recursion, System Design Optimization, and Computational Complexity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
