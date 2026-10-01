import './style.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { SiAstro, SiVuedotjs, SiReact, SiTypescript, SiTailwindcss, SiNextdotjs, SiNodedotjs, SiHtml5, SiCss, SiJavascript, SiGit, SiSupabase, SiMysql, SiGnubash, SiVite, SiKalilinux, SiBurpsuite, SiMetasploit, SiWireshark, SiOwasp, SiCyberdefenders, SiLinux, SiPython, SiOpenjdk, SiSharp, SiCplusplus, SiAssemblyscript } from 'react-icons/si'
import LogoLoop from './LogoLoop.jsx'
import GooeyNav from './GooeyNav.jsx'
import SideRays from './SideRays.jsx'
import BorderGlow from './BorderGlow.jsx'

const skills = [
  [SiKalilinux, 'Kali Linux', 'https://www.kali.org', '#557c94'], [SiLinux, 'Nmap', 'https://nmap.org', '#4d8cc9'], [SiBurpsuite, 'Burp Suite', 'https://portswigger.net/burp', '#ff6633'],
  [SiMetasploit, 'Metasploit', 'https://www.metasploit.com', '#2596be'], [SiWireshark, 'Wireshark', 'https://www.wireshark.org', '#1679a7'], [SiOwasp, 'OWASP', 'https://owasp.org', '#f9a03c'],
  [SiLinux, 'Ghidra', 'https://ghidra-sre.org', '#f0a500'], [SiCyberdefenders, 'CyberDefenders', 'https://cyberdefenders.org', '#65c7f7'],
  [SiPython, 'Python', 'https://www.python.org', '#3776ab'], [SiOpenjdk, 'Java', 'https://www.java.com', '#ed8b00'], [SiSharp, 'C#', 'https://learn.microsoft.com/dotnet/csharp', '#9b4f96'], [SiCplusplus, 'C/C++', 'https://isocpp.org', '#00599c'], [SiAssemblyscript, 'Assembly', 'https://www.assemblyscript.org', '#007acc'],
  [SiAstro, 'Astro', 'https://astro.build', '#ff5d01'], [SiVuedotjs, 'Vue', 'https://vuejs.org', '#41b883'], [SiReact, 'React', 'https://react.dev', '#61dafb'],
  [SiVite, 'Vite', 'https://vite.dev', '#a476ff'],
  [SiTypescript, 'TypeScript', 'https://www.typescriptlang.org', '#3178c6'], [SiTailwindcss, 'Tailwind CSS', 'https://tailwindcss.com', '#38bdf8'],
  [SiNextdotjs, 'Next.js', 'https://nextjs.org', '#e5e7eb'], [SiNodedotjs, 'Node.js', 'https://nodejs.org', '#68a063'], [SiHtml5, 'HTML5', 'https://developer.mozilla.org', '#e34f26'],
  [SiCss, 'CSS3', 'https://developer.mozilla.org', '#2965f1'], [SiJavascript, 'JavaScript', 'https://developer.mozilla.org', '#f7df1e'],
  [SiGit, 'Git', 'https://git-scm.com', '#f05032'], [SiSupabase, 'Supabase', 'https://supabase.com', '#3ecf8e'], [SiMysql, 'MySQL', 'https://mysql.com', '#00758f'], [SiGnubash, 'Bash', 'https://gnu.org/software/bash', '#c7c7c7'],
]
const skillSets = [
  ['Cybersecurity', skills.slice(0, 8)],
  ['Programming', skills.slice(8, 13)],
  ['Web Development', skills.slice(13)],
]
const projects = [
  ['Cyber Threat Detection in Email Traffic Using YARA and Suricata', 'Security research', 'YARA rules · Suricata · Python', 'https://github.com/Shaharzz/YARA-Project', 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=85'],
  ['SocketLink Client-Server (C++)', 'Networking project', 'C++ · Sockets · Client/server architecture', 'https://github.com/Shaharzz/client-server-cpp', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85'],
  ['Repair Lab Tracker', 'Repair management platform', 'TypeScript · CSS · PL/pgSQL', 'https://github.com/Shaharzz/repair-lab-tracker', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85'],
  ['Shahar David Portfolio', 'Live website', 'Frontend development · Personal portfolio', 'https://shahardavid.vercel.app/', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=85'],
  ['May David', 'Live website', 'Web development · Personal website', 'https://maydavid.vercel.app/#', 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=85'],
]
const skillGroups = [
  ['Cybersecurity (Tap/Hover for more)', [
    { label: 'Penetration Testing (Kali Linux)', details: ['Kali Linux, Nmap, Burp Suite, Metasploit', 'ffuf, Gobuster, Hydra, Netcat, Wireshark', 'Web app testing, service enumeration, exploitation'] },
    { label: 'CTF', details: ['Binary exploitation, web, forensics, crypto, reversing', 'Linux privilege escalation and Windows post-exploitation', 'Team-based problem solving under time pressure'] },
    { label: 'Reverse Engineering', details: ['Ghidra, IDA Pro, x64dbg, Cutter, Radare2', 'Frida, WinDbg, dnSpy, strings, objdump', 'Static and dynamic analysis for malware and binaries'] },
    { label: 'Vulnerability Research', details: ['Proof-of-concept development and root cause analysis', 'Memory corruption, input validation, and attack surfaces', 'Reproducible notes, debugging, and disclosure mindset'] },
    { label: 'YARA', details: ['Malware classification, triage, and pattern matching', 'Strings, condition logic, and rule optimization', 'IOC extraction and repeatable detection workflows'] },
    { label: 'Suricata', details: ['Network detection rules and alert tuning', 'Packet inspection, protocol analysis, and threat hunting', 'Rule writing for actionable, low-noise detections'] },
  ]],
  ['Programming', ['Python', 'Java', 'C#', 'C/C++', 'Assembly']],
  ['Computer Science', ['Data Structures & Algorithms', 'OOP', 'Operating Systems']],
  ['Web Development', ['Vite', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Node.js', 'Next.js', 'Vue', 'Astro', 'Git', 'Supabase', 'MySQL']],
]

document.querySelector('#app').innerHTML = `
  <div id="nav"></div>
  <main>
    <section id="home" class="home page-width">
      <div id="hero-rays"></div>
      <p class="greeting">Hi, I'm Shahar</p>
      <div class="intro"><h1>Cybersecurity<br>Researcher &amp; Pentester</h1><p>Computer Science graduate seeking a Penetration Tester, Cybersecurity Researcher, or Detection Engineering role, offering strong algorithmic foundations and a math-heavy problem-solving approach. Proficient in Python, Java, and C# across Windows and Kali environments, with specialized experience in penetration testing, CTFs, reverse engineering, and network security using YARA and Suricata.</p></div>
      <div class="socials">
        <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">◈</a>
        <a href="https://www.linkedin.com/in/shahar-david-a18810106" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
        <a href="mailto:shahardavid169@gmail.com" aria-label="Email">@</a>
      </div>
      <div id="skills-loop" class="skills-marquee-stack" aria-label="Technology skills"></div>
      <div class="home-lower">
        <div class="services"><h2>What I do?</h2>${[
          ['⌁','Cybersecurity','Penetration testing with Kali Linux<br>Web application testing and vulnerability research<br>CTF, reverse engineering, YARA and Suricata'],
          ['⌘','Programming','Python, Java, C#, C/C++ and Assembly<br>Data structures, algorithms and object-oriented programming'],
          ['⌂','Systems & IT','Operating systems and Linux workflows<br>Network fundamentals, debugging and technical problem solving'],
          ['▣','Web Development','Single Page Applications (SPAs)<br>Landing pages and business websites<br>Portfolio websites'],
          ['▯','Mobile Development','Mobile-friendly web apps<br>React Native mobile apps'],
          ['◈','UI/UX Design & Prototyping','UI design with Figma & Canva<br>UX research & improvements<br>Prototyping for websites & mobile apps'],
        ].map(([icon,title,detail]) => `<button class="service"><span class="service-icon">${icon}</span><span class="service-title">${title}</span><span class="chevron">⌄</span><span class="service-detail">${detail}</span></button>`).join('')}</div>
      </div>
    </section>
    <section id="skills" class="skills-section page-width"><p class="section-label">What I know</p><h2>Skills</h2><div id="skills-groups" class="skills-groups"></div></section>
    <section id="projects" class="projects page-width"><p class="section-label">My work</p><h2>Projects</h2><div id="project-cards" class="project-grid"></div></section>
    <section id="contact" class="contact page-width"><p class="section-label">Let's connect</p><h2>Have a question or a project in mind?</h2><a class="email" href="mailto:shahardavid169@gmail.com">shahardavid169@gmail.com <span>↗</span></a><p class="location">Location: Israel</p></section>
  </main>
  <footer class="page-width"><span>© 2026 Shahar</span><span>Built with curiosity</span></footer>
`

document.querySelectorAll('.service').forEach((service) => {
  service.addEventListener('click', () => service.classList.toggle('open'))
})
window.addEventListener('scroll', () => document.querySelector('#nav').classList.toggle('scrolled', window.scrollY > 20))

createRoot(document.querySelector('#skills-loop')).render(
  React.createElement(React.Fragment, null, skillSets.map(([title, skillSet], index) =>
    React.createElement('div', { className: 'skills-loop-row', key: title },
      React.createElement('span', { className: 'skills-loop-label' }, title),
      React.createElement(LogoLoop, {
        logos: skillSet.map(([Icon, logoTitle, href, color]) => ({
          node: React.createElement(React.Fragment, null, React.createElement(Icon, { 'aria-hidden': true, style: { color } }), React.createElement('span', null, logoTitle)),
          title: logoTitle,
          href,
        })),
        speed: index === 1 ? 38 : 45,
        direction: index === 1 ? 'right' : 'left',
        logoHeight: 20,
        gap: 30,
        hoverSpeed: 0,
        scaleOnHover: true,
        fadeOut: true,
        fadeOutColor: '#141414',
        ariaLabel: `${title} skills`,
      }),
    ),
  )),
)

createRoot(document.querySelector('#nav')).render(
  React.createElement(GooeyNav, {
    items: [{ label: 'Home', href: '#home' }, { label: 'Skills', href: '#skills' }, { label: 'Projects', href: '#projects' }, { label: 'Contact', href: '#contact' }],
    particleCount: 6,
    particleDistances: [90, 10],
    particleR: 100,
    initialActiveIndex: 0,
    animationTime: 600,
    timeVariance: 500,
    colors: [1, 2, 3, 1, 2, 3, 1, 4],
  }),
)

createRoot(document.querySelector('#project-cards')).render(
  React.createElement(React.Fragment, null, projects.map(([name, status, stack, url, image], index) =>
    React.createElement(BorderGlow, { key: name, animated: true, className: `project-glow${index === 0 ? ' project-featured' : ''}` },
      React.createElement('article', { className: 'project' },
        React.createElement('a', { href: url, target: '_blank', rel: 'noreferrer' },
          React.createElement('div', { className: 'project-image project-photo' },
            React.createElement('img', { src: image, alt: name, loading: 'lazy' }),
            React.createElement('span', { className: 'photo-shade' }),
          ),
          React.createElement('div', { className: 'project-info' },
            React.createElement('div', null, React.createElement('h3', null, name), React.createElement('small', null, `${status} · ${stack}`)),
            React.createElement('span', { className: 'external' }, '↗'),
          ),
        ),
      ),
    ),
  )),
)

createRoot(document.querySelector('#skills-groups')).render(
  React.createElement(React.Fragment, null, skillGroups.map(([title, groupSkills]) =>
    React.createElement(BorderGlow, { key: title, animated: true, className: 'skills-glow' },
      React.createElement('article', { className: 'skills-group' },
        React.createElement('h3', null, title),
        React.createElement('div', { className: 'skill-tags' },
          groupSkills.map((skill) => {
            const label = typeof skill === 'string' ? skill : skill.label
            return skill.details
              ? React.createElement('button', { className: 'skill-tag skill-tag-button', type: 'button', key: label },
                React.createElement('span', null, label),
                React.createElement('span', { className: 'skill-popover', role: 'tooltip' },
                  React.createElement('strong', null, 'Tools & focus'),
                  skill.details.map((detail) => React.createElement('span', { className: 'skill-popover-line', key: detail }, detail)),
                ),
              )
              : React.createElement('span', { className: 'skill-tag', key: label }, label)
          }),
        ),
      ),
    ),
  )),
)

createRoot(document.querySelector('#hero-rays')).render(
  React.createElement(SideRays, {
    speed: 1.8,
    rayColor1: '#a476ff',
    rayColor2: '#4169e1',
    intensity: 2.4,
    spread: 2.4,
    origin: 'top-right',
    tilt: 18,
    saturation: 1.15,
    blend: 0.72,
    falloff: 1.8,
    opacity: 0.9,
  }),
)
