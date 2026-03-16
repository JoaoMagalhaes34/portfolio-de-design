import React, { useState, useEffect } from 'react';
import {
  Instagram, Video, PenTool, Mail, Image as ImageIcon, Sparkles,
  Linkedin, Database, BarChart3, Users, Target,
  Terminal, Globe, Briefcase, Zap, ExternalLink,
  ChevronLeft, ChevronRight, Award, FileText, Component as LucideComponent
} from 'lucide-react';

/**
 * BASE DE DADOS DO PORTFÓLIO
 * Organizada por categorias para filtragem dinâmica.
 */
const portfolioItems = [
  // 1. CONTENT STRATEGY (SOCIAL MEDIA)
  {
    id: 10, type: 'social', source: 'instagram', link: 'https://www.instagram.com/p/CgfYlofJff5/',
    title: 'Revitalização de Marca: Banda da Freguesia',
    desc: 'Redesign de ativos digital baseado no patrimônio visual histórico da marca, respeitando as diretrizes originais de 1997.'
  },
  {
    id: 11, type: 'social', source: 'instagram', link: 'https://www.instagram.com/p/DT27cZGDWOO/',
    title: 'Branding Territorial: Feira na Taquara',
    desc: 'Criação de identidade visual estratégica para feira gastronómica, focada em gerar conexão com o público local.'
  },
  {
    id: 13, type: 'social', source: 'instagram', link: 'https://www.instagram.com/p/DNokCsESrWJ/',
    title: 'Carrossel com engajamento',
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
    title: 'Identidade Visual e Logo',
    desc: 'Desenvolvimento de sistema visual e logótipo para projecto de investigação focado em Inteligência Artificial e Sociedade.'
  },
  {
    id: 17, type: 'logotipos', source: 'image',
    imagePath: 'https://i.imgur.com/oQBAE7Z.png',
    title: 'Redesign: CASOC PUC-Rio',
    desc: 'Evolução da marca do Centro Académico de Ciências Sociais. Desenvolvido como tributo ao legado de Vânia Santos.',
    externalUrl: 'https://www.instagram.com/casoc_pucrio/',
    externalLabel: 'Ver Brand no Instagram'
  },
  // 3. VISUAL DESIGN & BRANDING
  {
    id: 21, type: 'design', source: 'instagram',
    link: 'https://www.instagram.com/p/DVjqKyZiaTB/',
    title: 'Modelo de layout: Maternidade',
    desc: 'Desenvolvimento de templates para evento focado em políticas de permanência feminina na universidade.'
  },
  {
    id: 6, type: 'design', source: 'slider',
    images: [
      'https://i.imgur.com/i8sx8R8.png',
      'https://i.imgur.com/yJsCtND.png'
    ],
    title: 'Identidade Visual: Vila Delas',
    desc: 'Concepção de identidade visual e peças de comunicação integradas para campanha de permanência feminina na universidade.'
  },
  {
    id: 22, type: 'design', source: 'instagram',
    link: 'https://www.instagram.com/p/DVeL55ACTHh/',
    title: 'Design Institucional',
    desc: 'Peça gráfica desenvolvida para comunicação do alunato de Ciências Sociais da PUC-Rio.'
  },
  {
    id: 18, type: 'design', source: 'instagram',
    link: 'https://www.instagram.com/p/DKc3MPoSzj3/',
    title: 'Arte conceitual para EP "Be a Voice not an Echo"',
    desc: 'Design de capa para single de vinil bilingue, feito para a Universidade de Furtwangen (Alemanhã). Capa feita usando técnicas de corte e colagem e scanner',
    externalUrl: 'https://www.hs-furtwangen.de/aktuelles/detail/1274-begeisterung-fuer-oeffentliche-wissenschaft',
    externalLabel: 'Detalhes do Projeto - HfU'
  },
  {
    id: 20, type: 'design', source: 'instagram',
    link: 'https://www.instagram.com/p/DJXw7VGtJHA/',
    title: 'Estudo complementar EP "Be a Voice not an Echo"',
    desc: 'Estudo complementar e exploração visual para projecto bilingue de Public Science.'
  },
  // 4. EDITORIAL DESIGN (DIAGRAMAÇÃO)
  {
    id: 19, type: 'diagramacao', source: 'canva',
    link: 'https://www.canva.com/design/DAGYJcT4Ti8/vKQEU1OtFDpaXTJljYYn_Q/view?embed',
    title: 'Design Editorial & InfoVis',
    desc: 'Projecto gráfico do relatório científico de 54 páginas "Impacto ambiental na saúde das mulheres na favela de Rio das Pedras" vinculada a Fiocruz, Inpro e PUC-Rio.'
  },
  // 5. VIDEOMAKER (MOTION & PRODUCTION)
  {
    id: 8, type: 'video', source: 'instagram', link: 'https://www.instagram.com/reel/DT5reapEfGH/',
    title: 'Cultura e Sabores (Takes conceituais criados por IA)',
    desc: 'Estratégia visual para evento gastronómico utilizando vídeos gerados por IA para prototipagem de produção e direção de arte.'
  },
  {
    id: 9, type: 'video', source: 'instagram', link: 'https://www.instagram.com/reel/DT09spJEmWe/',
    title: 'Cultura e Sabores (Estratégia de WhatsApp)',
    desc: 'Peça publicitária otimizada para circulação em redes móveis (dark social), incluindo narração e dublagem original.'
  },
  {
    id: 2, type: 'video', source: 'instagram', link: 'https://www.instagram.com/reel/C8c5CS1uljB/',
    title: 'Cobertura de Segurança Pública',
    desc: 'Edição e legendagem estratégica de ação conjunta entre Freguesia em Ação e o programa Bairro Presente (18º BPM).'
  },
  {
    id: 4, type: 'video', source: 'instagram', link: 'https://www.instagram.com/reel/DRnE81kCcSX/',
    title: 'Reels do CineDebate "Minha voz não pode calar"',
    desc: 'Captação e montagem de narrativa visual para pós-produção do cineclube do Departamento de Ciências Sociais da PUC-Rio.'
  },
  {
    id: 5, type: 'video', source: 'vimeo', link: 'https://player.vimeo.com/video/1148315267',
    title: 'Documentário e Cinedebate: "Minha voz não pode calar"',
    desc: 'Direcção e edição de versão documental curta focada em narrativas de resistência e impacto social.'
  },
  {
    id: 1, type: 'video', source: 'instagram', link: 'https://www.instagram.com/reel/CyHlLZguGag/',
    title: 'Campanha: Floresta em Pé',
    desc: 'Cobertura audiovisual da visita institucional da Secretária de Meio Ambiente Tainá de Paula à região do Quitite.'
  },
  {
    id: 3, type: 'video', source: 'instagram', link: 'https://www.instagram.com/reel/C7VF5u1PIs7/',
    title: 'Convocação - Freguesia em Ação',
    desc: 'Documentação de conflitos urbanos e convocatória estratégica para articulação na Universidade Candido Mendes.'
  },
  {
    id: 23, type: 'video', source: 'instagram', link: 'https://www.instagram.com/p/DF5XAunOr_n/',
    title: 'AMAF: Ciclo Folia',
    desc: 'Motion design para a Associação de Moradores e Amigos da Freguesia (AMAF) focado na interseção entre cicloativismo e património cultural carnavalesco local.'
  },
];

const skillCategories = [
  {
    title: "Dados & Ciências Sociais",
    icon: <Database size={18} />,
    skills: ["Ciências Sociais Computacionais", "Python/R/Java/SPSS", "Extração de Dados (Web Scraping)", "Processamento de Linguagem Natural (NLP)", "Ética de Dados"]
  },
  {
    title: "Estratégia & Performance",
    icon: <Target size={18} />,
    skills: ["Básico de Gestão de tráfego no Meta Ads", "Marketing de performance", "Copywriting", "Engenharia de Prompt (IA)", "Análise de Métricas"]
  },
  {
    title: "Design",
    icon: <PenTool size={18} />,
    skills: ["Pacote Adobe (PS, PR, DW)", "Canva", "Identidade Visual & Branding", "Design Editorial", "Capcut", "Motion Graphics"]
  },
  {
    title: "Gestão & Estratégia",
    icon: <Briefcase size={18} />,
    skills: ["Metodologias Ágeis (Scrum/Kanban)", "Auxiliar Administrativo", "Produção Cultural", "Análise de Políticas Públicas"]
  }
];

// --- COMPONENTES AUXILIARES ---

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
      case 'logotipos': return 'Identidade Visual';
      case 'design': return 'Design Visual';
      case 'diagramacao': return 'Design Editorial';
      case 'social': return 'Estratégia de Conteúdo';
      case 'video': return 'Motion & Vídeo';
      default: return 'Projeto';
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
                <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-indigo-600 rounded-full text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-10" aria-label="Anterior"><ChevronLeft size={20}/></button>
                <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-indigo-600 rounded-full text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-10" aria-label="Próximo"><ChevronRight size={20}/></button>
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
            <img src={item.imagePath} alt={item.title || "Projeto"} className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${item.type === 'design' || item.type === 'logotipos' ? 'object-contain p-6' : 'object-cover'}`} />
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
            <ExternalLink size={14} /> {item.externalLabel || 'Ver detalhes'}
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
    
    // Inserção do script do Instagram para renderizar os embeds
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* NAVEGAÇÃO */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="font-black text-xl tracking-tighter flex items-center gap-2 text-white">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-sm">JM</div>
            <span>João Magalhães</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
            <a href="#portfolio" className="hover:text-white transition-colors">Projetos</a>
            <a href="#skills" className="hover:text-white transition-colors">Habilidades</a>
            <a href="#formacao" className="hover:text-white transition-colors">Trajetória</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative pt-40 pb-20 px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full -z-10" />
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-8">
            <Sparkles size={14} /> Portfólio de design
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-none text-white">
            João <span className="text-transparent bg-clip-text bg-gradient-to-b from-indigo-400 to-purple-600">Magalhães</span>
          </h1>
          <p className="text-xl md:text-2xl font-semibold mb-8 text-zinc-300">• Design • Branding Institucional • Cientista Social </p>
          <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed mb-10">Comunicador Popular transformando complexidade em impacto visual através de dados e design estratégico.</p>
          <div className="flex justify-center">
            <a href="#portfolio" className="bg-white text-zinc-950 px-10 py-4 rounded-full font-bold hover:bg-zinc-200 transition-all shadow-xl shadow-white/5 text-center">
              Ver Portfólio
            </a>
          </div>
        </div>
      </header>

      {/* MÉTRICAS / DESTAQUES */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl text-center">
          <Zap size={24} className="text-yellow-400 block mx-auto mb-4" />
          <div className="text-3xl font-black text-white">+1.3M</div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Alcance mensal</div>
        </div>
        <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl text-center">
          <BarChart3 size={24} className="text-indigo-400 block mx-auto mb-4" />
          <div className="text-3xl font-black text-white">1M</div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Engajamento</div>
        </div>
        <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl text-center">
          <Terminal size={24} className="text-emerald-400 block mx-auto mb-4" />
          <div className="text-3xl font-black text-white">1.9k min/sem</div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Análise de Dados</div>
        </div>
        <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl text-center">
          <Users size={24} className="text-pink-400 block mx-auto mb-4" />
          <div className="text-3xl font-black text-white">11</div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Anos de Trajetória</div>
        </div>
      </section>

      {/* GALERIA DE PROJETOS */}
      <section id="portfolio" className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-900">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 text-center md:text-left">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">PROJETOS EM DESTAQUE</h2>
          <div className="flex flex-wrap justify-center gap-2 bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'social', label: 'Estratégia' },
              { id: 'logotipos', label: 'Logotipos' },
              { id: 'design', label: 'Design Visual' },
              { id: 'diagramacao', label: 'Editorial' },
              { id: 'video', label: 'Motion & Vídeo' }
            ].map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)} className={`px-6 py-2 rounded-xl font-bold text-xs transition-all ${filter === f.id ? 'bg-indigo-600 text-white' : 'text-zinc-500 hover:text-white'}`}>{f.label}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => <ProjectCard key={item.id} item={item} />)}
        </div>
      </section>

      {/* HABILIDADES TÉCNICAS */}
      <section id="skills" className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-900">
        <h2 className="text-4xl font-black mb-12 text-white uppercase tracking-tighter">Especialidades Técnicas</h2>
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

      {/* RECONHECIMENTO */}
      <section id="formacao" className="bg-indigo-600/5 py-24 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black mb-12 text-white uppercase tracking-tighter flex items-center gap-3"><Award className="text-indigo-500" /> RECONHECIMENTO E FORMAÇÃO </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-6 border-l-2 border-indigo-500 bg-indigo-500/5 rounded-r-2xl h-full">
              <h4 className="font-bold text-lg text-white">2º Lugar - Hackathon COVID-19</h4>
              <p className="text-xs text-indigo-400 font-bold mb-2 uppercase">HACKING.RIO (2020)</p>
              <p className="text-sm text-zinc-400 leading-relaxed">Design de solução para assistência social em resposta à pandemia.</p>
            </div>
            <div className="p-6 border-l-2 border-indigo-500 bg-indigo-500/5 rounded-r-2xl h-full">
              <h4 className="font-bold text-lg text-white">Colaboração Workshop "Public Science"</h4>
              <p className="text-xs text-indigo-400 font-bold mb-2 uppercase">Furtwangen University & PUC-Rio (2025)</p>
              <p className="text-sm text-zinc-400 leading-relaxed">Concepção do projeto transmídia <span className="italic">"Be a Voice not an Echo"</span>, focado em divulgação científica.</p>
            </div>
            <div className="p-6 border-l-2 border-indigo-500 bg-indigo-500/5 rounded-r-2xl h-full">
              <h4 className="font-bold text-lg text-white">Computational Social Science</h4>
              <p className="text-xs text-indigo-400 font-bold mb-2 uppercase">University of California, Davis (2026)</p>
              <p className="text-sm text-zinc-400 leading-relaxed">Investigação focada em fenómenos digitais e infraestrutura de dados.</p>
            </div>
            <div className="p-6 border-l-2 border-indigo-500 bg-indigo-500/5 rounded-r-2xl h-full">
              <h4 className="font-bold text-lg text-white">Pesquisador Colaborador</h4>
              <p className="text-xs text-indigo-400 font-bold mb-2 uppercase">Fiocruz/InPro (2024)</p>
              <p className="text-sm text-zinc-400 leading-relaxed">Diagnósticos territoriais em saúde através de design de dados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* RODAPÉ E CONTATO */}
      <footer className="bg-zinc-950 pt-24 pb-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <h2 className="text-4xl font-black mb-6 text-white tracking-tighter">Fortalecendo territórios através da criatividade <span className="text-indigo-500 italic">baseada em dados.</span> </h2> 
            <p className="text-zinc-500 text-lg">Aberto a parcerias em projectos de impacto social e branding institucional.</p>
          </div>
          <div className="flex flex-col md:items-end justify-center gap-6">
            <div className="flex gap-4 justify-center md:justify-end">
              <a href="https://www.linkedin.com/in/magalhaescunha" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all text-white" aria-label="LinkedIn"><Linkedin /></a>
            </div>
            <p className="text-2xl font-bold text-white">joao.magalhaes.34@gmail.com</p>
          </div>
          <div className="text-center text-zinc-700 text-sm pt-8 border-t border-zinc-900 mt-20">© {new Date().getFullYear()} João Magalhães. Design & estratégia visual.</div>
        </div>
      </footer>
    </div>
  );
}
