import { useState } from 'react'
import CollectionPage from './CollectionPage'
import anjoBarroco from '@/imports/Anjo-Barroco-4_5000x.jpg'
import geminiAnjo from '@/imports/Gemini_Generated_Image_qwpf18qwpf18qwpf.jpg'
import photoRoom from '@/imports/photoroom_20260727_185419-590e834e077850f9fa17851943765528-1024-1024.jpg'
import geminiK1ad5x from '@/imports/Gemini_Generated_Image_k1ad5xk1ad5xk1ad.jpg'
import logoImage from '@/imports/Prancheta 1antiques.png'
import anjoDeCedro from '@/imports/anjo de cedro.jpg'


const NAV_LINKS = ['Catálogo', 'Novidades', 'Sobre', 'Contato']

const PRODUCTS = [
  {
    id: 1,
    name: 'Nossa Senhora das Graças recuperada do século XVIII',
    price: 100000,
    tag: null,
    img: geminiAnjo,
    alt: 'Nossa Senhora das Graças recuperada do século XVIII',
    sold: false,
  },
  {
    id: 4,
    name: 'Anjo estilo Aleijadinho em policromia - relíquia encontrada',
    price: 85000,
    tag: null,
    img: anjoBarroco,
    alt: 'Anjo estilo Aleijadinho em policromia',
  },
  {
    id: 3,
    name: 'Cristo crucificado em marfim',
    price: 50000,
    tag: 'Raridade',
    img: photoRoom,
    alt: 'Cristo crucificado em marfim',
  },
  {
    id: 2,
    name: 'Anjo Barroco esculpido em cedro - estilo barroco',
    price: 30000,
    tag: null,
    img: anjoDeCedro,
    alt: 'Anjo Barroco esculpido em cedro',
  },
]

const TESTIMONIALS = [
  {
    name: 'Ana Rodrigues',
    role: 'Designer, São Paulo',
    text: 'A qualidade é impecável. Cada peça chega como uma obra de arte — da embalagem ao produto final.',
    avatar: 'AR',
  },
  {
    name: 'Carlos Mendes',
    role: 'Arquiteto, Rio de Janeiro',
    text: 'Finalmente uma loja que entende o que é cuidado com o cliente. Minha terceira compra e cada vez melhor.',
    avatar: 'CM',
  },
  {
    name: 'Luisa Ferreira',
    role: 'Diretora Criativa, Curitiba',
    text: 'Presenteei minha mãe e ela ligou chorando de emoção. A experiência de unboxing é única.',
    avatar: 'LF',
  },
]

export default function App() {
  const [cartCount, setCartCount] = useState(0)
  const [addedId, setAddedId] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [page, setPage] = useState<'home' | 'collection'>('home')

  const handleAdd = (id: number) => {
    setCartCount((c) => c + 1)
    setAddedId(id)
    setTimeout(() => setAddedId(null), 1400)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  if (page === 'collection') {
    return (
      <CollectionPage
        onAddToCart={(id) => { setCartCount((c) => c + 1); setAddedId(id); setTimeout(() => setAddedId(null), 1400) }}
        addedId={addedId}
        cartCount={cartCount}
        onBack={() => setPage('home')}
      />
    )
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Outfit', sans-serif", backgroundColor: '#faf7f2', color: '#2c2016' }}>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4" style={{ backgroundColor: 'rgba(250,247,242,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(44,32,22,0.08)' }}>
        <a href="#" className="flex items-center" aria-label="Antiques Logo">
          <img src={logoImage} alt="Antiques" style={{ height: '72px', objectFit: 'contain' }} />
        </a>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => setPage('home')} className="text-sm font-medium transition-colors bg-transparent border-none cursor-pointer" style={{ color: '#5a4a38' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#b85c38')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#5a4a38')}>
            Início
          </button>
          <button onClick={() => setPage('collection')} className="text-sm font-medium transition-colors bg-transparent border-none cursor-pointer" style={{ color: '#5a4a38' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#b85c38')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#5a4a38')}>
            Catálogo
          </button>
          <button onClick={() => setPage('collection')} className="text-sm font-medium transition-colors bg-transparent border-none cursor-pointer" style={{ color: '#5a4a38' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#b85c38')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#5a4a38')}>
            Novidades
          </button>
        </div>

        <div className="flex items-center gap-6">
          <button
            className="relative text-sm font-medium flex items-center gap-2 transition-all bg-transparent border-none cursor-pointer"
            style={{ color: '#2c2016' }}
            aria-label="Carrinho"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 rounded-full text-xs flex items-center justify-center" style={{ backgroundColor: '#b85c38', color: '#faf7f2', width: 18, height: 18, fontSize: 10, fontWeight: 600 }}>
                {cartCount}
              </span>
            )}
          </button>
          <a href="#" className="hidden md:inline-block px-5 py-1.5 text-sm font-medium transition-all"
            style={{ border: '1px solid #2c2016', borderRadius: '9999px', color: '#2c2016', textDecoration: 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#2c2016'; e.currentTarget.style.color = '#faf7f2' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#2c2016' }}>
            Contato
          </a>
          <button className="md:hidden bg-transparent border-none cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {menuOpen ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
            </svg>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col pt-20 px-6 gap-6 md:hidden" style={{ backgroundColor: '#faf7f2' }}>
          <button className="text-2xl font-display text-left bg-transparent border-none cursor-pointer" style={{ fontFamily: "'Fraunces', serif", color: '#2c2016' }} onClick={() => { setMenuOpen(false); setPage('home') }}>Início</button>
          <button className="text-2xl font-display text-left bg-transparent border-none cursor-pointer" style={{ fontFamily: "'Fraunces', serif", color: '#2c2016' }} onClick={() => { setMenuOpen(false); setPage('collection') }}>Catálogo</button>
          <button className="text-2xl font-display text-left bg-transparent border-none cursor-pointer" style={{ fontFamily: "'Fraunces', serif", color: '#2c2016' }} onClick={() => { setMenuOpen(false); setPage('collection') }}>Novidades</button>
        </div>
      )}

      {/* HERO */}
      <section className="relative grid md:grid-cols-2 min-h-screen pt-16">
        {/* Left — copy */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20" style={{ backgroundColor: '#f5f0e8' }}>
          <span className="text-xs uppercase tracking-[0.2em] mb-6" style={{ color: '#b85c38' }}>Acervo Exclusivo · Séculos XVIII e XIX</span>
          <h1 className="font-display leading-none mb-6" style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 400, color: '#2c2016', letterSpacing: '-0.03em' }}>
            Relíquias com<br /><em style={{ fontStyle: 'italic', color: '#b85c38' }}>alma.</em>
          </h1>
          <p className="max-w-sm mb-10 leading-relaxed" style={{ color: '#5a4a38', fontSize: '1.05rem', fontWeight: 300 }}>
            Peças barrocas originais e arte sacra antiga cuidadosamente restauradas, preservadas e autenticadas para colecionadores exigentes.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setPage('collection')} className="inline-flex items-center gap-3 px-8 py-4 text-sm font-medium transition-all border-none cursor-pointer" style={{ backgroundColor: '#2c2016', color: '#faf7f2', borderRadius: 2 }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b85c38')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2c2016')}>
              Ver Catálogo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </button>
            <a href="#" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium border transition-all" style={{ color: '#2c2016', borderColor: '#2c2016', borderRadius: 2, textDecoration: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#2c2016'; e.currentTarget.style.color = '#faf7f2' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#2c2016' }}>
              Sobre Nós
            </a>
          </div>

          <div className="flex gap-12 mt-16">
            {[['4.9★', 'Avaliação média'], ['12k+', 'Clientes satisfeitos'], ['48h', 'Entrega assegurada']].map(([val, label]) => (
              <div key={label}>
                <div className="font-display text-2xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, color: '#2c2016' }}>{val}</div>
                <div className="text-xs mt-1" style={{ color: '#8a7564' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — image */}
        <div className="relative min-h-[50vh] md:min-h-full overflow-hidden" style={{ backgroundColor: '#ede5d5' }}>
          <img
            src={anjoBarroco}
            alt="Anjo Barroco esculpido em cedro - estilo barroco"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.9 }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(237,229,213,0.3) 0%, transparent 60%)' }} />
          <div className="absolute bottom-8 left-8 right-8 p-6" style={{ backgroundColor: 'rgba(250,247,242,0.88)', backdropFilter: 'blur(10px)', borderRadius: 2 }}>
            <div className="text-xs uppercase tracking-widest mb-1" style={{ color: '#b85c38' }}>Destaque da semana</div>
            <div className="font-display text-lg" style={{ fontFamily: "'Fraunces', serif", color: '#2c2016' }}>Anjo Barroco esculpido em cedro</div>
            <div className="text-sm mt-1" style={{ color: '#5a4a38' }}>R$ 30.000 · Frete segurado grátis</div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 px-8 py-8" style={{ backgroundColor: '#2c2016', color: '#ede5d5' }}>
        {[
          ['🚚', 'Frete grátis acima de R$300'],
          ['🔄', 'Troca grátis em 30 dias'],
          ['🔒', 'Pagamento 100% seguro'],
          ['🌿', 'Materiais sustentáveis'],
        ].map(([icon, text]) => (
          <div key={text} className="flex items-center gap-2 text-sm" style={{ fontWeight: 300 }}>
            <span>{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>

      {/* PRODUCTS */}
      <section id="products" className="px-6 md:px-12 lg:px-20 py-24">
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="text-xs uppercase tracking-[0.2em]" style={{ color: '#b85c38' }}>Coleção Atual</span>
            <h2 className="font-display mt-2" style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, color: '#2c2016', letterSpacing: '-0.02em' }}>
              Peças em destaque
            </h2>
          </div>
          <button onClick={() => setPage('collection')} className="hidden md:flex items-center gap-2 text-sm font-medium transition-colors bg-transparent border-none cursor-pointer" style={{ color: '#5a4a38' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#b85c38')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#5a4a38')}>
            Ver tudo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} added={addedId === p.id} onAdd={() => handleAdd(p.id)} />
          ))}
        </div>
      </section>

      {/* ABOUT SPLIT */}
      <section className="grid md:grid-cols-2 min-h-[70vh]">
        <div className="relative overflow-hidden min-h-[350px]" style={{ backgroundColor: '#ede5d5' }}>
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=900&fit=crop&auto=format"
            alt="Interior de boutique com araras de roupas penduradas"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20" style={{ backgroundColor: '#f5f0e8' }}>
          <span className="text-xs uppercase tracking-[0.2em] mb-6" style={{ color: '#b85c38' }}>Nossa história</span>
          <h2 className="font-display mb-6" style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400, color: '#2c2016', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Artesanato que<br /><em style={{ fontStyle: 'italic' }}>respeita o tempo.</em>
          </h2>
          <p className="mb-6 leading-relaxed" style={{ color: '#5a4a38', fontWeight: 300, maxWidth: 440 }}>
            Fundada em São Paulo em 2018, a Atelier São Paulo nasceu da insatisfação com o fast fashion. Trabalhamos apenas com fornecedores certificados e peças produzidas em pequenos lotes — qualidade acima de quantidade.
          </p>
          <p className="mb-10 leading-relaxed" style={{ color: '#5a4a38', fontWeight: 300, maxWidth: 440 }}>
            Cada item passa por três etapas de controle de qualidade antes de chegar até você. Porque acreditamos que um produto bem feito é a melhor forma de cuidar do planeta — e de você.
          </p>
          <a href="#" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: '#b85c38' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
            Conhecer nossa filosofia
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 md:px-12 lg:px-20 py-24" style={{ backgroundColor: '#faf7f2' }}>
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.2em]" style={{ color: '#b85c38' }}>Depoimentos</span>
          <h2 className="font-display mt-2" style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: '#2c2016', letterSpacing: '-0.02em' }}>
            O que dizem nossos clientes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="p-8" style={{ backgroundColor: '#f5f0e8', borderRadius: 2 }}>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#b85c38', fontSize: 14 }}>★</span>
                ))}
              </div>
              <p className="mb-8 leading-relaxed" style={{ color: '#5a4a38', fontWeight: 300, fontStyle: 'italic' }}>"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center text-sm font-medium" style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#2c2016', color: '#f5f0e8', fontFamily: "'Fraunces', serif" }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ color: '#2c2016' }}>{t.name}</div>
                  <div className="text-xs" style={{ color: '#8a7564' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="px-6 md:px-12 py-24 text-center" style={{ backgroundColor: '#2c2016' }}>
        <span className="text-xs uppercase tracking-[0.2em]" style={{ color: '#b85c38' }}>Newsletter</span>
        <h2 className="font-display mt-3 mb-4" style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: '#f5f0e8', letterSpacing: '-0.02em' }}>
          Seja o primeiro a saber.
        </h2>
        <p className="mb-10 text-sm" style={{ color: '#8a7564', maxWidth: 380, margin: '0 auto 2.5rem' }}>
          Novidades, lançamentos exclusivos e descontos para assinantes. Sem spam — prometemos.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-2 px-8 py-4 text-sm" style={{ backgroundColor: '#b85c38', color: '#faf7f2', borderRadius: 2 }}>
            ✓ Inscrito! Bem-vindo(a) à nossa comunidade.
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="flex-1 px-5 py-4 text-sm outline-none"
              style={{ backgroundColor: 'rgba(255,255,255,0.07)', color: '#f5f0e8', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 2 }}
            />
            <button
              type="submit"
              className="px-7 py-4 text-sm font-medium transition-all whitespace-nowrap"
              style={{ backgroundColor: '#b85c38', color: '#faf7f2', borderRadius: 2 }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d4825e')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#b85c38')}
            >
              Inscrever-se
            </button>
          </form>
        )}
      </section>

      {/* FOOTER */}
      <footer className="px-8 md:px-16 py-16" style={{ backgroundColor: '#1a1209', color: '#8a7564' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="font-display text-lg mb-4" style={{ fontFamily: "'Fraunces', serif", color: '#f5f0e8' }}>
              Atelier <em style={{ fontStyle: 'italic', color: '#b85c38' }}>São Paulo</em>
            </div>
            <p className="text-sm leading-relaxed" style={{ fontWeight: 300 }}>
              Moda consciente, feita para durar. São Paulo, Brasil.
            </p>
          </div>
          {[
            ['Loja', ['Coleção', 'Novidades', 'Promoções', 'Lookbook']],
            ['Empresa', ['Sobre Nós', 'Sustentabilidade', 'Carreiras', 'Imprensa']],
            ['Suporte', ['Atendimento', 'Trocas e Devoluções', 'Rastrear Pedido', 'FAQ']],
          ].map(([title, links]) => (
            <div key={title as string}>
              <div className="text-xs uppercase tracking-widest mb-5" style={{ color: '#f5f0e8', fontWeight: 500 }}>{title}</div>
              <ul className="space-y-3">
                {(links as string[]).map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm transition-colors" style={{ color: '#8a7564' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#b85c38')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#8a7564')}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span>© 2026 Atelier São Paulo. Todos os direitos reservados.</span>
          <div className="flex gap-6">
            <a href="#" className="transition-colors" onMouseEnter={(e) => (e.currentTarget.style.color = '#b85c38')} onMouseLeave={(e) => (e.currentTarget.style.color = '#8a7564')}>Privacidade</a>
            <a href="#" className="transition-colors" onMouseEnter={(e) => (e.currentTarget.style.color = '#b85c38')} onMouseLeave={(e) => (e.currentTarget.style.color = '#8a7564')}>Termos</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProductCard({ product, added, onAdd }: {
  product: typeof PRODUCTS[0]
  added: boolean
  onAdd: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden mb-4" style={{ backgroundColor: '#ede5d5', borderRadius: 2, aspectRatio: '3/4' }}>
        <img
          src={product.img}
          alt={product.alt}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        {product.tag && (
          <span className="absolute top-3 left-3 text-xs uppercase tracking-widest px-3 py-1" style={{ backgroundColor: '#2c2016', color: '#f5f0e8', borderRadius: 1 }}>
            {product.tag}
          </span>
        )}
        <button
          onClick={onAdd}
          className="absolute bottom-3 left-3 right-3 py-3 text-sm font-medium transition-all duration-300"
          style={{
            backgroundColor: added ? '#7a8c6e' : '#2c2016',
            color: '#faf7f2',
            borderRadius: 1,
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          {added ? '✓ Adicionado' : 'Adicionar ao carrinho'}
        </button>
      </div>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-medium" style={{ color: '#2c2016' }}>{product.name}</div>
          <div className="text-sm mt-1" style={{ color: '#8a7564' }}>R$ {product.price.toLocaleString('pt-BR')}</div>
        </div>
        <button
          className="mt-0.5 transition-colors"
          aria-label="Favoritar"
          style={{ color: hovered ? '#b85c38' : '#c4b5a5' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
