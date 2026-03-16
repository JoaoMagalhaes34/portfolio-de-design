import React, { useState, useEffect, useRef } from 'react';

import {

  Instagram, Video, PenTool, Mail, Image as ImageIcon, Sparkles,

  Linkedin, Database, BarChart3, Users, Target,

  Terminal, Globe, Briefcase, Zap, ExternalLink,

  ChevronLeft, ChevronRight, Award, FileText, Component as LucideComponent

} from 'lucide-react';



// --- BASE DE DADOS COMPLETA E REORGANIZADA ---

const portfolioItems = [

  // 1. CONTENT STRATEGY (SOCIAL MEDIA)

  {

    id: 10, type: 'social', source: 'instagram', link: 'https://www.instagram.com/p/CgfYlofJff5/',

    title: 'Brand Revival: Banda da Freguesia',

    desc: 'Revitalização de assets digitais baseada no património visual histórico da marca, respeitando as directrizes de 1997.'

  },

  {

    id: 11, type: 'social', source: 'instagram', link: 'https://www.instagram.com/p/DT27cZGDWOO/',

    title: 'Branding Territorial: Feira Taquara',

    desc: 'Criação de identidade visual estratégica para feira gastronómica, focada em gerar conexão com o público local.'

  },

  {

    id: 13, type: 'social', source: 'instagram', link: 'https://www.instagram.com/p/DNokCsESrWJ/',

    title: 'Content Design & Public Science',

    desc: 'Estratégia de visualização de dados para divulgação científica. Performance de 23.8 mil impressões orgânicas.'

  },

  {

    id: 14, type: 'social', source: 'instagram', link: 'https://www.instagram.com/p/DCmI1QGJ7d_/',

    title: 'Digital Storytelling: Memória local',

    desc: 'Gestão do perfil Jacarepaguá das Antigas. Alcance superior a 20.000 interacções orgânicas por asset.'

  },



  // 2. LOGOTIPOS

  {

    id: 12, type: 'logotipos', source: 'instagram', link: 'https://www.instagram.com/p/DQxhbgGDnk_/',

    title: 'Brand Identity: Tech & Society',

    desc: 'Desenvolvimento de sistema visual e logótipo para projecto de investigação focado em Inteligência Artificial e Sociedade.'

  },

  {

    id: 17, type: 'logotipos', source: 'image',

    imagePath: 'https://i.imgur.com/oQBAE7Z.png',

    title: 'Logo Redesign: CASOC PUC-Rio',

    desc: 'Evolução da marca do Centro Académico de Ciências Sociais. Desenvolvido como tributo ao legado de Vânia Santos.',

    externalUrl: 'https://www.instagram.com/casoc_pucrio/',

    externalLabel: 'Ver Brand Presence no Instagram'

  },



  // 3. VISUAL DESIGN & BRANDING

  {

    id: 21, type: 'design', source: 'instagram',

    link: 'https://www.instagram.com/p/DVjqKyZiaTB/',

    title: 'Campaign Layout: Maternidade',

    desc: 'Desenvolvimento de templates para evento focado em políticas de permanência estudantil.'

  },

  {

    id: 6, type: 'design', source: 'slider',

    images: [

      'https://i.imgur.com/i8sx8R8.png',

      'https://i.imgur.com/yJsCtND.png'

    ],

    title: 'Event Identity: Vila Delas',

    desc: 'Concepção de universo visual e peças de comunicação integradas para campanha de permanência feminina.'

  },

  {

    id: 22, type: 'design', source: 'instagram',

    link: 'https://www.instagram.com/p/DVeL55ACTHh/',

    title: 'Institutional Design Asset',

    desc: 'Peça gráfica desenvolvida para comunicação do alunato de Ciências Sociais da PUC-Rio.'

  },

  {

    id: 18, type: 'design', source: 'instagram',

    link: 'https://www.instagram.com/p/DKc3MPoSzj3/',

    title: 'Cover Art & Visual Concept',

    desc: 'Design de capa para single de vinil bilingue, explorando a intersecção entre arte e ciência internacional.',

    externalUrl: 'https://www.hs-furtwangen.de/aktuelles/detail/1274-begeisterung-fuer-oeffentliche-wissenschaft',

    externalLabel: 'Project Details - HfU Germany'

  },

  {

    id: 20, type: 'design', source: 'instagram',

    link: 'https://www.instagram.com/p/DJXw7VGtJHA/',

    title: 'EP Visual Exploration',

    desc: 'Estudo complementar e exploração visual para projecto bilingue de Public Science.'

  },



  // 4. EDITORIAL DESIGN (DIAGRAMAÇÃO)

  {

    id: 19, type: 'diagramacao', source: 'canva',

    link: 'https://www.canva.com/design/DAGYJcT4Ti8/vKQEU1OtFDpaXTJljYYn_Q/view?embed',

    title: 'Editorial Design & InfoVis',

    desc: 'Projecto gráfico do relatório científico "Impacto ambiental na saúde das mulheres na favela de Rio das Pedras".'

  },



  // 5. VIDEOMAKER (MOTION & PRODUCTION)

  {

    id: 8, type: 'video', source: 'instagram', link: 'https://www.instagram.com/reel/DT5reapEfGH/',

    title: 'Cultura e Sabores (IA Conceptual)',

    desc: 'Estratégia visual para evento gastronómico utilizando vídeos gerados por IA para prototipagem de produção e direção de arte.'

  },

  {

    id: 9, type: 'video', source: 'instagram', link: 'https://www.instagram.com/reel/DT09spJEmWe/',

    title: 'Cultura e Sabores (WhatsApp Strategy)',

    desc: 'Peça publicitária otimizada para circulação em redes móveis (dark social), incluindo narração e dublagem original.'

  },

  {

    id: 2, type: 'video', source: 'instagram', link: 'https://www.instagram.com/reel/C8c5CS1uljB/',

    title: 'Public Safety Cover: 18º BPM',

    desc: 'Edição e legendagem estratégica de ação conjunta entre Freguesia em Ação e o programa Bairro Presente.'

  },

  {

    id: 4, type: 'video', source: 'instagram', link: 'https://www.instagram.com/reel/DRnE81kCcSX/',

    title: 'Reels CineDebate: Investigação Social',

    desc: 'Captação e montagem de narrativa visual para pós-produção do cineclube do Departamento de Ciências Sociais da PUC-Rio.'

  },

  {

    id: 5, type: 'video', source: 'vimeo', link: 'https://player.vimeo.com/video/1148315267',

    title: 'Documentary: "Minha voz não pode calar"',

    desc: 'Direcção e edição de versão documental curta focada em narrativas de resistência e impacto social.'

  },

  {

    id: 1, type: 'video', source: 'instagram', link: 'https://www.instagram.com/reel/CyHlLZguGag/',

    title: 'Advocacy: Floresta em Pé',

    desc: 'Cobertura audiovisual da visita institucional da Secretária de Meio Ambiente Tainá de Paula à região do Quitite.'

  },

  {

    id: 3, type: 'video', source: 'instagram', link: 'https://www.instagram.com/reel/C7VF5u1PIs7/',

    title: 'Crisis & Community Mobilization',

    desc: 'Documentação de conflitos urbanos e convocatória estratégica para articulação na Universidade Candido Mendes.'

  },

  {

    id: 23, type: 'video', source: 'instagram', link: 'https://www.instagram.com/p/DF5XAunOr_n/',

    title: 'Ciclo Folia: Urban Culture',

    desc: 'Motion design para a AMAF focado na interseção entre cicloativismo e património cultural carnavalesco local.'

  },

];



const skillCategories = [

  {

    title: "Data & Social Science",

    icon: <Database size={18} />,

    skills: ["Computational Social Science", "Python/R/SPSS", "Web Scraping", "NLP", "Data Ethics"]

  },

  {

    title: "Growth & Performance",

    icon: <Target size={18} />,

    skills: ["Meta Ads", "Marketing Automation", "Copywriting", "IA Prompting", "Analytics"]

  },

  {

    title: "Visual Design",

    icon: <PenTool size={18} />,

    skills: ["Adobe Creative Cloud", "Brand Identity", "Editorial Design", "Motion Graphics"]

  },

  {

    title: "Strategy & Management",

    icon: <Briefcase size={18} />,

    skills: ["Agile (Scrum/Kanban)", "Produção Cultural", "Políticas Públicas"]

  }

];



// --- COMPONENTES ---



function InstagramEmbed({ link }) {

  useEffect(() => {

    if (window.instgrm) {

      window.instgrm.Embeds.process();

    }

  }, [link]);



  return (

    <div className="w-full bg-zinc-950 flex justify-center min-h-[450px]">

      <div dangerouslySetInnerHTML={{

        __html: `<blockquote class="instagram-media" data-instgrm-permalink="${link}?utm_source=ig_embed" data-instgrm-version="14" data-theme="dark" style="background:transparent; border:0; margin:0; width:100%;"></blockquote>`

      }} className="w-full" />

    </div>

  );

}



function ProjectCard({ item }) {

  const [currentIdx, setCurrentIdx] = useState(0);



  if (!item) return null;



  const nextImg = (e) => {

    if (!item.images) return;

    e.stopPropagation();

    setCurrentIdx((prev) => (prev + 1) % item.images.length);

  };



  const prevImg = (e) => {

    if (!item.images) return;

    e.stopPropagation();

    setCurrentIdx((prev) => (prev - 1 + item.images.length) % item.images.length);

  };



  const getIcon = () => {

    switch (item.type) {

      case 'logotipos': return <LucideComponent size={12}/>;

      case 'design': return <PenTool size={12}/>;

      case 'diagramacao': return <FileText size={12}/>;

      case 'social': return <Users size={12}/>;

      case 'video': return <Video size={12}/>;

      default: return <ImageIcon size={12}/>;

    }

  };



  const getLabel = () => {

    switch (item.type) {

      case 'logotipos': return 'Logo Identity';

      case 'design': return 'Visual Design';

      case 'diagramacao': return 'Editorial Design';

      case 'social': return 'Content Strategy';

      case 'video': return 'Motion & Video';

      default: return 'Project';

    }

  };



  return (

    <div className="group bg-zinc-900/40 rounded-[32px] border border-zinc-800 overflow-hidden hover:border-indigo-500/50 transition-all duration-500 flex flex-col shadow-xl h-full text-white text-left">

      <div className="relative">

        {item.source === 'instagram' && <InstagramEmbed link={item.link} />}



        {item.source === 'vimeo' && (

          <div className="aspect-video w-full bg-black">

            <iframe src={item.link} className="w-full h-full" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen title={item.title}></iframe>

          </div>

        )}



        {item.source === 'slider' && item.images && (

          <div className="relative aspect-square bg-zinc-800 flex items-center justify-center p-6 overflow-hidden">

            <img src={item.images[currentIdx]} className="w-full h-full object-contain transition-all duration-500" alt={item.title} />

            {item.images.length > 1 && (

              <>

                <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-indigo-600 rounded-full text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-10" aria-label="Previous image"><ChevronLeft size={20}/></button>

                <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-indigo-600 rounded-full text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-10" aria-label="Next image"><ChevronRight size={20}/></button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">

                  {item.images.map((_, i) => (

                    <div key={i} className={`h-1.5 w-1.5 rounded-full transition-all ${i === currentIdx ? 'bg-indigo-500 w-4' : 'bg-zinc-600'}`} />

                  ))}

                </div>

              </>

            )}

          </div>

        )}



        {item.source === 'canva' && (

          <div className="aspect-[4/5] w-full bg-zinc-950 overflow-hidden">

            <iframe loading="lazy" className="w-full h-full border-0" src={item.link} allowFullScreen allow="fullscreen" title={item.title}></iframe>

          </div>

        )}



        {item.source === 'image' && (

          <div className={`relative overflow-hidden bg-zinc-800 flex items-center justify-center ${item.type === 'design' || item.type === 'logotipos' ? 'aspect-square' : 'aspect-video'}`}>

            <img src={item.imagePath} alt={item.title || "Project"} className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${item.type === 'design' || item.type === 'logotipos' ? 'object-contain p-6' : 'object-cover'}`} />

          </div>

        )}

      </div>



      <div className="p-8 flex-grow flex flex-col">

        <div className="flex items-center gap-2 text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-3">

          {getIcon()} <span>{getLabel()}</span>

        </div>

        <h3 className="font-bold text-lg mb-2 group-hover:text-indigo-400 transition-colors text-white">{item.title}</h3>

        {item.desc && <p className="text-sm text-zinc-500 leading-relaxed mb-4 flex-grow">{item.desc}</p>}

        {item.externalUrl && (

          <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors pt-4 border-t border-zinc-800 w-full mt-auto">

            <ExternalLink size={14} /> {item.externalLabel || 'View Details'}

          </a>

        )}

      </div>

    </div>

  );

}



// --- APP PRINCIPAL ---



export default function App() {

  const [filter, setFilter] = useState('todos');

  const [scrolled, setScrolled] = useState(false);



  const filteredItems = filter === 'todos'

    ? portfolioItems

    : portfolioItems.filter(item => item.type === filter);



  useEffect(() => {

    const handleScroll = () => setScrolled(window.scrollY > 50);

    window.addEventListener('scroll', handleScroll);

    const script = document.createElement("script");

    script.src = "https://www.instagram.com/embed.js";

    script.async = true;

    document.body.appendChild(script);

    return () => window.removeEventListener('scroll', handleScroll);

  }, []);



  return (

    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-indigo-500/30 overflow-x-hidden">

     

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 py-4' : 'bg-transparent py-6'}`}>

        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

          <div className="font-black text-xl tracking-tighter flex items-center gap-2 text-white">

            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-sm">JM</div>

            <span>João Magalhães</span>

          </div>

          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">

            <a href="#portfolio" className="hover:text-white transition-colors">Projectos</a>

            <a href="#skills" className="hover:text-white transition-colors">Skills</a>

            <a href="#formacao" className="hover:text-white transition-colors">Trajectória</a>

            <a href="mailto:joao.magalhaes.34@gmail.com" className="hover:text-white transition-colors">Contacto</a>

          </div>

        </div>

      </nav>



      <header className="relative pt-40 pb-20 px-6 text-center">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-4xl mx-auto flex flex-col items-center">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-8">

            <Sparkles size={14} /> Creative Strategist & Data Expert

          </div>

          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-none text-white">

            João <span className="text-transparent bg-clip-text bg-gradient-to-b from-indigo-400 to-purple-600">Magalhães</span>

          </h1>

          <p className="text-xl md:text-2xl font-semibold mb-8 text-zinc-300">• Design • Brand Strategy • Social Science </p>

          <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed mb-10">Comunicador Popular transformando complexidade em impacto visual através de dados e design estratégico.</p>

          <div className="flex flex-col sm:flex-row gap-4">

            <a href="#portfolio" className="bg-white text-zinc-950 px-10 py-4 rounded-full font-bold hover:bg-zinc-200 transition-all shadow-xl shadow-white/5 text-center">Portfolio</a>

            <a href="mailto:joao.magalhaes.34@gmail.com" className="bg-zinc-900 border border-zinc-800 px-10 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all text-white text-center"><Mail size={18} /> Contacto</a>

          </div>

        </div>

      </header>



      <section className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-2 md:grid-cols-4 gap-6">

        <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl text-center">

          <Zap size={24} className="text-yellow-400 block mx-auto mb-4" />

          <div className="text-3xl font-black text-white">+1.3M</div>

          <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Reach Total</div>

        </div>

        <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl text-center">

          <BarChart3 size={24} className="text-indigo-400 block mx-auto mb-4" />

          <div className="text-3xl font-black text-white">1M</div>

          <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Engagement</div>

        </div>

        <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl text-center">

          <Terminal size={24} className="text-emerald-400 block mx-auto mb-4" />

          <div className="text-3xl font-black text-white">49</div>

          <div className="text-[10px] text-zinc-500 uppercase tracking-widest">IA Units/wk</div>

        </div>

        <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl text-center">

          <Users size={24} className="text-pink-400 block mx-auto mb-4" />

          <div className="text-3xl font-black text-white">11</div>

          <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Years Experience</div>

        </div>

      </section>



      <section id="portfolio" className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-900">

        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 text-center md:text-left">

          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Selected Projects</h2>

          <div className="flex flex-wrap justify-center gap-2 bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800">

            {[

              { id: 'todos', label: 'All' },

              { id: 'social', label: 'Content Strategy' },

              { id: 'logotipos', label: 'Logotipos' },

              { id: 'design', label: 'Visual Design' },

              { id: 'diagramacao', label: 'Editorial' },

              { id: 'video', label: 'Motion & Video' }

            ].map(f => (

              <button key={f.id} onClick={() => setFilter(f.id)} className={`px-6 py-2 rounded-xl font-bold text-xs transition-all ${filter === f.id ? 'bg-indigo-600 text-white' : 'text-zinc-500 hover:text-white'}`}>{f.label}</button>

            ))}

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredItems.map(item => <ProjectCard key={item.id} item={item} />)}

        </div>

      </section>



      <section id="skills" className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-900">

        <h2 className="text-4xl font-black mb-12 text-white uppercase tracking-tighter">Core Competencies</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {skillCategories.map((cat, idx) => (

            <div key={idx} className="p-8 bg-zinc-900/20 border border-zinc-900 rounded-3xl h-full">

              <div className="flex items-center gap-3 text-indigo-400 font-bold uppercase text-xs tracking-widest mb-6">

                {cat.icon}

                <span className="text-white">{cat.title}</span>

              </div>

              <div className="flex flex-wrap gap-2">

                {cat.skills.map((skill, sIdx) => (

                  <span key={sIdx} className="px-3 py-1.5 bg-zinc-900 text-zinc-400 text-[10px] uppercase font-bold rounded-lg border border-zinc-800 tracking-tight">

                    {skill}

                  </span>

                ))}

              </div>

            </div>

          ))}

        </div>

      </section>



      <section id="formacao" className="bg-indigo-600/5 py-24 border-t border-zinc-900">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-black mb-12 text-white uppercase tracking-tighter flex items-center gap-3"><Award className="text-indigo-500" /> Recognition & Education</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">

            <div className="p-6 border-l-2 border-indigo-500 bg-indigo-500/5 rounded-r-2xl h-full"><h4 className="font-bold text-lg text-white">2º Lugar - Hackathon COVID-19</h4><p className="text-xs text-indigo-400 font-bold mb-2 uppercase">LatAm (2020)</p><p className="text-sm text-zinc-400 leading-relaxed">Design de solução para assistência social em resposta à pandemia.</p></div>

            <div className="p-6 border-l-2 border-indigo-500 bg-indigo-500/5 rounded-r-2xl h-full"><h4 className="font-bold text-lg text-white">Public Science Collaboration</h4><p className="text-xs text-indigo-400 font-bold mb-2 uppercase">HfU Germany</p><p className="text-sm text-zinc-400 leading-relaxed">Concepção de projecto transmídia focado em estratégias de comunicação.</p></div>

            <div className="p-6 border-l-2 border-indigo-500 bg-indigo-500/5 rounded-r-2xl h-full"><h4 className="font-bold text-lg text-white">Computational Social Science</h4><p className="text-xs text-indigo-400 font-bold mb-2 uppercase">PUC-Rio</p><p className="text-sm text-zinc-400 leading-relaxed">Investigação focada em fenómenos digitais e infraestrutura de dados.</p></div>

            <div className="p-6 border-l-2 border-indigo-500 bg-indigo-500/5 rounded-r-2xl h-full"><h4 className="font-bold text-lg text-white">Pesquisador Colaborador</h4><p className="text-xs text-indigo-400 font-bold mb-2 uppercase">Fiocruz / InPro</p><p className="text-sm text-zinc-400 leading-relaxed">Diagnósticos territoriais em saúde através de design de dados.</p></div>

          </div>

        </div>

      </section>



      <footer className="bg-zinc-950 pt-24 pb-12 border-t border-zinc-900">

        <div className="max-w-7xl mx-auto px-6 text-center md:text-left">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">

            <div><h2 className="text-4xl font-black mb-6 text-white tracking-tighter">Empowering territories through <span className="text-indigo-500 italic">data-driven creativity.</span></h2><p className="text-zinc-500 text-lg">Aberto a parcerias em projectos de impacto social e branding institucional.</p></div>

            <div className="flex flex-col md:items-end justify-center gap-6">

              <div className="flex gap-4 justify-center md:justify-end">

                <a href="https://www.linkedin.com/in/magalhaescunha" target="_blank" className="w-14 h-14 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all text-white" aria-label="LinkedIn"><Linkedin /></a>

                <a href="mailto:joao.magalhaes.34@gmail.com" className="w-14 h-14 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all text-white" aria-label="Email"><Mail /></a>

              </div>

              <p className="text-2xl font-bold text-white">joao.magalhaes.34@gmail.com</p>

            </div>

          </div>

          <div className="text-center text-zinc-700 text-sm pt-8 border-t border-zinc-900">© {new Date().getFullYear()} João Magalhães. Design & Estratégia Visual.</div>

        </div>

      </footer>

    </div>

  );

}