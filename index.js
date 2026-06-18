// ── Blob follow mouse ──
let curX = 0, curY = 0, tgX = 0, tgY = 0;
 
// ══════════════════════════════════════
//  PROJECT DATA — swap in your real files
// ══════════════════════════════════════
const VIDEO = 'project-video.mp4';
const IMG   = 'project-img.jpg';
 
const PROJECTS = [
    // ── Management Experience (2) ──
    {
        id: 1, category: 'management',
        title: 'Embedded AI Safety Device',
        short: 'Industry Sponsored - Team coordination/delivery',
        summary: 'Directed and contributed to a four-person engineering team by coordinating project schedules, assigning responsibilities, coding, and monitoring progress throughout the development lifecycle. Maintained stakeholder relationships through regular communication and project updates while using Gantt charts to keep deliverables on track.',
        media: 'AIproject.jpg', isVideo: false
    },
    {
        id: 2, category: 'management',
        title: 'Lazer Tag Software',
        short: 'Python · Trello · Slack · GitHub',
        summary: 'Coordinated with my team to develop a laser tag management system by organizing project timelines, managing task assignments, and facilitating communication across the development process. Leveraged Agile methodologies and collaboration tools while actively contributing to coding, testing, and system implementation to keep the project on schedule.',
        media: 'lt.mp4', isVideo: true
    },
 
    // ── Projects (3) ──
    {
        id: 3, category: 'project',
        title: 'Data Analytics Dashboard',
        short: 'SQL · Power BI · Excel',
        summary: 'Built an interactive data analytics dashboard using Power BI. Learned to understand and process over 50k rows of sales data to surface trends, KPIs, and forecasts. Designed for non-technical stakeholders with filters and charts.',
        media: 'AnalyticDashboard.mp4', isVideo: true
    },
    {
        id: 4, category: 'project',
        title: 'Financial Transaction Visualizer ',
        short: 'Python · Pandas · Matplotlib',
        summary: 'Built an interactive data analytics tool that converted raw banking transactions into clear visual insights and performance metrics. Utilized data visualization and trend analysis to identify spending behaviors and highlight key areas of financial impact.',
        media: 'vt.mp4', isVideo: true
    },
 
    // ── Websites (3) ──
    {
        id: 5, category: 'website',
        title: 'Personal Portfolio',
        short: 'HTML · CSS · JavaScript',
        summary: 'The website you are viewing right now! Designed with an animated blob backgrounds, CSS keyframe animations, a responsive layout, and smooth single-page navigation.',
        media: 'port.mp4', isVideo: true
    },
    {
        id: 6, category: 'website',
        title: 'Web 1.0 inspired Database Management System',
        short: 'SQL · PHP · HTML',
        summary: 'My first database-backed web application, inspired by the simplicity of early internet websites. The concert management platform organized artists, events, customers, and ticket sales while offering reporting tools to support efficient data management.',
        media: 'concert.mp4', isVideo: true
    },
    {
        id: 7, category: 'website',
        title: 'Overwatch Stadium Build website',
        short: 'Under Development - JavaScript · HTML · GitHub',
        summary: 'Co led the planning and development of a web application inspired by community demand, enabling players to create, save, and manage custom character builds. Collaborated closely with a development partner to coordinate project execution, improve workflow efficiency, and deliver an intuitive user experience that enhanced player engagement.',
        media: 'ow.mp4', isVideo: true
    }
];
 
// ══════════════════════════════════════
//  PROJECTS UI
// ══════════════════════════════════════
let currentFilter = 'all';
let currentIndex  = 0; // index within filtered list
 
function filteredList() {
    return currentFilter === 'all'
        ? PROJECTS
        : PROJECTS.filter(p => p.category === currentFilter);
}
 
function mediaEl(p, forFeatured = false) {
    if (p.isVideo) {
        const v = document.createElement('video');
        v.src = p.media;
        v.autoplay = true;
        v.loop = true;
        v.muted = true;
        v.playsInline = true;
        v.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:' + (forFeatured ? '14px' : '0') + ';';
        return v;
    } else {
        const i = document.createElement('img');
        i.src = p.media;
        i.alt = p.title;
        i.style.cssText = 'width:100%;height:100%;object-fit:cover;';
        return i;
    }
}
 
function renderFeatured(p) {
    const wrap = document.querySelector('.proj-media-wrap');
    const title = document.querySelector('.proj-feat-title');
    const shortEl = document.querySelector('.proj-feat-short');
    const summary = document.querySelector('.proj-feat-summary');
 
    wrap.innerHTML = '';
    wrap.appendChild(mediaEl(p, true));
    title.textContent = p.title;
    shortEl.textContent = p.short;
    summary.textContent = p.summary;
 
    // animate
    document.querySelector('.proj-featured').classList.remove('fade-in');
    void document.querySelector('.proj-featured').offsetWidth;
    document.querySelector('.proj-featured').classList.add('fade-in');
}
 
function renderGrid(list) {
    const grid = document.getElementById('projGrid');
    grid.innerHTML = '';
 
    list.forEach((p, idx) => {
        const card = document.createElement('div');
        card.className = 'proj-card' + (idx === currentIndex ? ' active-card' : '');
        card.dataset.idx = idx;
 
        // thumbnail
        const thumb = document.createElement('div');
        thumb.className = 'proj-thumb';
        thumb.appendChild(mediaEl(p, false));
 
        // overlay
        const overlay = document.createElement('div');
        overlay.className = 'proj-thumb-overlay';
        overlay.innerHTML = `<span class="proj-thumb-name">${p.title}</span><span class="proj-thumb-desc">${p.short}</span>`;
        thumb.appendChild(overlay);
 
        // tag
        const tag = document.createElement('div');
        tag.className = 'proj-card-tag';
        const labels = { management: 'Management', project: 'Project', website: 'Website' };
        tag.textContent = labels[p.category] || p.category;
 
        card.appendChild(thumb);
        card.appendChild(tag);
 
        // click to select
        card.addEventListener('click', () => {
            currentIndex = idx;
            renderFeatured(p);
            // update active card
            document.querySelectorAll('.proj-card').forEach(c => c.classList.remove('active-card'));
            card.classList.add('active-card');
        });
 
        // stagger fade-in
        card.style.animationDelay = `${idx * 0.07}s`;
        grid.appendChild(card);
    });
}
 
function updateProjects() {
    const list = filteredList();
    if (list.length === 0) return;
    if (currentIndex >= list.length) currentIndex = 0;
    renderFeatured(list[currentIndex]);
    renderGrid(list);
}
 
function initProjects() {
    // filter buttons
    document.querySelectorAll('.proj-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentFilter = btn.dataset.filter;
            currentIndex = 0;
            document.querySelectorAll('.proj-filter-btn').forEach(b => b.classList.remove('active-filter'));
            btn.classList.add('active-filter');
            updateProjects();
        });
    });
 
    // arrows
    document.getElementById('projPrev').addEventListener('click', () => {
        const list = filteredList();
        currentIndex = (currentIndex - 1 + list.length) % list.length;
        renderFeatured(list[currentIndex]);
        document.querySelectorAll('.proj-card').forEach((c, i) => {
            c.classList.toggle('active-card', i === currentIndex);
        });
    });
    document.getElementById('projNext').addEventListener('click', () => {
        const list = filteredList();
        currentIndex = (currentIndex + 1) % list.length;
        renderFeatured(list[currentIndex]);
        document.querySelectorAll('.proj-card').forEach((c, i) => {
            c.classList.toggle('active-card', i === currentIndex);
        });
    });
 
    updateProjects();
}
 
// ══════════════════════════════════════
//  MAIN
// ══════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
 
    // Blob animation
    const interBubble = document.querySelector('.interactive');
    if (interBubble) {
        function move() {
            curX += (tgX - curX) / 20;
            curY += (tgY - curY) / 20;
            interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
            requestAnimationFrame(move);
        }
        window.addEventListener('mousemove', e => { tgX = e.clientX; tgY = e.clientY; });
        move();
    }
 
    // Hamburger
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger) hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
 
    // Page navigation
    const navButtons = document.querySelectorAll('.navbtn');
    const sections = document.querySelectorAll('.page-section');
 
    navButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const target = btn.getAttribute('data-target');
            sections.forEach(s => s.style.display = 'none');
            const targetSection = document.getElementById(target);
            if (targetSection) {
                targetSection.style.display = 'block';
                // trigger fade-in on about/projects
                if (target === 'projects') {
                    initProjects();
                }
                if (target === 'about') {
                    // reset scroll
                    const am = document.getElementById('aboutMain');
                    if (am) am.scrollTop = 0;
                    // retrigger fade-in every visit
                    const layout = document.querySelector('.about-layout');
                    if (layout) {
                        layout.style.animation = 'none';
                        void layout.offsetWidth;
                        layout.style.animation = '';
                    }
                }
            }
            navButtons.forEach(b => b.classList.remove('navbtn-active'));
            btn.classList.add('navbtn-active');
        });
    });
 
    // About sidebar scroll
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('data-section');
            const targetEl = document.getElementById(targetId);
            const aboutMain = document.getElementById('aboutMain');
            if (targetEl && aboutMain) {
                aboutMain.scrollTo({ top: targetEl.offsetTop - 20, behavior: 'smooth' });
            }
            sidebarLinks.forEach(l => l.classList.remove('active-link'));
            link.classList.add('active-link');
        });
    });
 
    // Scroll spy
    const aboutMain = document.getElementById('aboutMain');
    if (aboutMain) {
        aboutMain.addEventListener('scroll', () => {
            const scrollPos = aboutMain.scrollTop + 60;
            document.querySelectorAll('.about-section').forEach(section => {
                if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                    const id = section.id;
                    sidebarLinks.forEach(l => {
                        l.classList.toggle('active-link', l.getAttribute('data-section') === id);
                    });
                }
            });
        });
    }
    
    // ── Resume download ──
    const resumeBtn = document.getElementById('resume_button');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', () => {
            window.open('JaydenBlairsResume.pdf', '_blank');
        });
    }
 
});
 
