import { useState, useMemo } from 'react'
import anjoBarroco from '@/imports/Anjo-Barroco-4_5000x.jpg'
import geminiAnjo from '@/imports/Gemini_Generated_Image_qwpf18qwpf18qwpf.jpg'
import photoRoom from '@/imports/photoroom_20260727_185419-590e834e077850f9fa17851943765528-1024-1024.jpg'
import geminiK1ad5x from '@/imports/Gemini_Generated_Image_k1ad5xk1ad5xk1ad.jpg'
import gemini2yxctk from '@/imports/Gemini_Generated_Image_m41gftm41gftm41g__1_-3.png'
import img31c0m7new from '@/imports/Gemini_Generated_Image_31c0m731c0m731c0-1.jpg'
import img2yxctkNew from '@/imports/Gemini_Generated_Image_2yxctk2yxctk2yxc-1.jpg'
import photoRoomNew from '@/imports/photoroom_20260727_185419-590e834e077850f9fa17851943765528-1024-1024-1.jpg'
import logoImage from '@/imports/Prancheta 1antiques.png'
import anjoDeCedro from '@/imports/anjo de cedro.jpg'

export const ALL_PRODUCTS = [
  {
    id: 1,
    name: 'Nossa Senhora das Graças recuperada do século XVIII',
    price: 100000,
    originalPrice: null,
    category: 'Santos',
    tag: null,
    sizes: ['Único'],
    colors: [],
    img: geminiAnjo,
    alt: 'Nossa Senhora das Graças recuperada do século XVIII',
    sold: false,
  },
  {
    id: 4,
    name: 'Anjo estilo Aleijadinho em policromia - relíquia encontrada',
    price: 85000,
    originalPrice: null,
    category: 'Anjos',
    tag: null,
    sizes: ['Único'],
    colors: [],
    img: anjoBarroco,
    alt: 'Anjo estilo Aleijadinho em policromia',
  },
  {
    id: 3,
    name: 'Cristo crucificado em marfim',
    price: 50000,
    originalPrice: null,
    category: 'Santos',
    tag: 'Raridade',
    sizes: ['Único'],
    colors: [],
    img: photoRoom,
    alt: 'Cristo crucificado em marfim',
  },
  {
    id: 2,
    name: 'Anjo Barroco esculpido em cedro - estilo barroco',
    price: 30000,
    originalPrice: null,
    category: 'Anjos',
    tag: null,
    sizes: ['Único'],
    colors: [],
    img: anjoDeCedro,
    alt: 'Anjo Barroco esculpido em cedro',
  },
  {
    id: 5,
    name: 'São Sebastião em madeira',
    price: 600,
    originalPrice: 800,
    category: 'Santos',
    tag: 'Desconto',
    sizes: ['Único'],
    colors: [],
    img: gemini2yxctk,
    alt: 'São Sebastião em madeira',
  },
  {
    id: 6,
    name: 'Anjo Barroco',
    price: 400,
    originalPrice: null,
    category: 'Anjos',
    tag: null,
    sizes: ['Único'],
    colors: [],
    img: img2yxctkNew,
    alt: 'Anjo Barroco',
  },
  {
    id: 7,
    name: 'Santa',
    price: 800,
    originalPrice: null,
    category: 'Santos',
    tag: null,
    sizes: ['Único'],
    colors: [],
    img: photoRoomNew,
    alt: 'Santa',
  },
  {
    id: 8,
    name: 'Cristo crucificado em marfim',
    price: 350,
    originalPrice: null,
    category: 'Santos',
    tag: null,
    sizes: ['Único'],
    colors: [],
    img: img31c0m7new,
    alt: 'Cristo crucificado em marfim',
  },
]

const CATEGORIES = ['Todos', 'Santos', 'Anjos']
const SORT_OPTIONS = [
  { label: 'Relevância', value: 'relevance' },
  { label: 'Menor preço', value: 'price-asc' },
  { label: 'Maior preço', value: 'price-desc' },
  { label: 'Novidades', value: 'new' },
]

type Product = typeof ALL_PRODUCTS[0]

interface CollectionPageProps {
  onAddToCart: (id: number) => void
  addedId: number | null
  cartCount: number
  onBack: () => void
}

export default function CollectionPage({ onAddToCart, addedId, cartCount, onBack }: CollectionPageProps) {
  const [category, setCategory] = useState('Todos')
  const [sort, setSort] = useState('relevance')
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [nossaSenhoraSold, setNossaSenhoraSold] = useState(false)

  const toggleFav = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const filtered = useMemo(() => {
    let list = category === 'Todos' ? ALL_PRODUCTS : ALL_PRODUCTS.filter((p) => p.category === category)
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'new') list = [...list].filter((p) => p.tag === 'Novo').concat(list.filter((p) => p.tag !== 'Novo'))
    return list.map((p) => p.id === 1 ? { ...p, sold: nossaSenhoraSold } : p)
  }, [category, sort, nossaSenhoraSold])

  const openProduct = (p: Product) => {
    setSelectedProduct(p)
    setSelectedSize(p.sizes[0] ?? '')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeProduct = () => setSelectedProduct(null)

  const isSelectedProductSold = selectedProduct ? (selectedProduct.id === 1 ? nossaSenhoraSold : (selectedProduct as any).sold) : false


  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf7f2', color: '#2c2016' }}>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ backgroundColor: 'rgba(250,247,242,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(44,32,22,0.08)' }}>
        <button onClick={onBack} className="flex items-center gap-2 bg-transparent border-none cursor-pointer" aria-label="Antiques Logo">
          <img src={logoImage} alt="Antiques" style={{ height: '72px', objectFit: 'contain' }} />
        </button>
        <div className="hidden md:flex items-center gap-8">
          <button onClick={onBack} className="text-sm font-medium transition-colors bg-transparent border-none cursor-pointer" style={{ color: '#5a4a38' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#b85c38')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#5a4a38')}>
            Início
          </button>
          <span className="text-sm font-medium" style={{ color: '#b85c38', borderBottom: '1px solid #b85c38', paddingBottom: 2 }}>Catálogo</span>
          {['Novidades', 'Contato'].map((l) => (
            <a key={l} href="#" className="text-sm font-medium transition-colors" style={{ color: '#5a4a38' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#b85c38')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#5a4a38')}>
              {l}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <button className="relative flex items-center bg-transparent border-none cursor-pointer" style={{ color: '#2c2016' }} aria-label="Carrinho">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 rounded-full text-xs flex items-center justify-center"
                style={{ backgroundColor: '#b85c38', color: '#faf7f2', width: 18, height: 18, fontSize: 10, fontWeight: 600 }}>
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
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col pt-20 px-6 gap-6 md:hidden" style={{ backgroundColor: '#faf7f2' }}>
          <button onClick={() => { onBack(); setMenuOpen(false) }} className="text-2xl font-display text-left bg-transparent border-none cursor-pointer" style={{ fontFamily: "'Fraunces', serif", color: '#2c2016' }}>Início</button>
          <span className="text-2xl font-display" style={{ fontFamily: "'Fraunces', serif", color: '#b85c38' }}>Catálogo</span>
          {['Novidades', 'Contato'].map((l) => (
            <a key={l} href="#" className="text-2xl font-display" style={{ fontFamily: "'Fraunces', serif", color: '#2c2016' }} onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
        </div>
      )}

      {/* PRODUCT DETAIL OVERLAY */}
      {selectedProduct && (
        <div className="fixed inset-0 z-40 flex items-start justify-center pt-20 px-4 pb-8 overflow-y-auto"
          style={{ backgroundColor: 'rgba(44,32,22,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={closeProduct}>
          <div className="relative w-full max-w-3xl grid md:grid-cols-2 overflow-hidden"
            style={{ backgroundColor: '#faf7f2', borderRadius: 2, marginTop: 8 }}
            onClick={(e) => e.stopPropagation()}>
            <button onClick={closeProduct} className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 transition-colors"
              style={{ backgroundColor: 'rgba(44,32,22,0.08)', borderRadius: '50%', color: '#2c2016' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(44,32,22,0.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(44,32,22,0.08)')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>

            <div className="relative min-h-[320px] md:min-h-[480px]" style={{ backgroundColor: '#ede5d5' }}>
              <img src={selectedProduct.img} alt={selectedProduct.alt} className="absolute inset-0 w-full h-full object-cover" />
              {selectedProduct.tag && (
                <span className="absolute top-3 left-3 text-xs uppercase tracking-widest px-3 py-1"
                  style={{ backgroundColor: '#2c2016', color: '#f5f0e8', borderRadius: 1 }}>
                  {selectedProduct.tag}
                </span>
              )}
            </div>

            <div className="flex flex-col justify-between p-8">
              <div>
                <div className="text-xs uppercase tracking-widest mb-2" style={{ color: '#8a7564' }}>{selectedProduct.category}</div>
                <h2 className="font-display mb-3" style={{ fontFamily: "'Fraunces', serif", fontSize: '1.7rem', fontWeight: 400, letterSpacing: '-0.02em', color: '#2c2016', lineHeight: 1.15 }}>
                  {selectedProduct.name}
                </h2>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xl font-medium" style={{ color: '#2c2016' }}>
                    R$ {selectedProduct.price.toLocaleString('pt-BR')}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm line-through" style={{ color: '#a89880' }}>
                      R$ {selectedProduct.originalPrice.toLocaleString('pt-BR')}
                    </span>
                  )}
                </div>

                <p className="text-sm leading-relaxed mb-6" style={{ color: '#5a4a38', fontWeight: 300 }}>
                  Peça artesanal confeccionada com materiais selecionados. Cada detalhe é pensado para garantir durabilidade e elegância ao longo dos anos.
                </p>

                {selectedProduct.sizes.length > 0 && (
                  <div className="mb-6">
                    <div className="text-xs uppercase tracking-widest mb-3" style={{ color: '#8a7564' }}>
                      {selectedProduct.category === 'Acessórios' && selectedProduct.sizes[0]?.includes('ml') ? 'Volume' : 'Tamanho'}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((s) => (
                        <button key={s} onClick={() => setSelectedSize(s)}
                          className="px-4 py-2 text-sm transition-all"
                          style={{
                            borderRadius: 1,
                            border: `1px solid ${selectedSize === s ? '#2c2016' : '#d4c9bc'}`,
                            backgroundColor: selectedSize === s ? '#2c2016' : 'transparent',
                            color: selectedSize === s ? '#faf7f2' : '#5a4a38',
                          }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProduct.colors.length > 0 && (
                  <div className="mb-6">
                    <div className="text-xs uppercase tracking-widest mb-2" style={{ color: '#8a7564' }}>Cores disponíveis</div>
                    <div className="text-sm" style={{ color: '#5a4a38' }}>{selectedProduct.colors.join(', ')}</div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => { if (!isSelectedProductSold) { onAddToCart(selectedProduct.id); closeProduct() } }}
                  disabled={isSelectedProductSold}
                  className="w-full py-4 text-sm font-medium transition-all"
                  style={{ backgroundColor: isSelectedProductSold ? '#a89880' : '#2c2016', color: '#faf7f2', borderRadius: 1, cursor: isSelectedProductSold ? 'not-allowed' : 'pointer' }}
                  onMouseEnter={(e) => { if (!isSelectedProductSold) e.currentTarget.style.backgroundColor = '#b85c38' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = isSelectedProductSold ? '#a89880' : '#2c2016' }}>
                  {isSelectedProductSold ? 'VENDIDO!' : `Adicionar ao carrinho — R$ ${selectedProduct.price.toLocaleString('pt-BR')}`}
                </button>
                <button
                  onClick={() => toggleFav(selectedProduct.id)}
                  className="w-full py-3 text-sm font-medium border transition-all"
                  style={{
                    borderColor: favorites.has(selectedProduct.id) ? '#b85c38' : '#d4c9bc',
                    color: favorites.has(selectedProduct.id) ? '#b85c38' : '#5a4a38',
                    borderRadius: 1,
                  }}>
                  {favorites.has(selectedProduct.id) ? '♥ Salvo nos favoritos' : '♡ Salvar nos favoritos'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="pt-28 pb-10 px-6 md:px-12 lg:px-20" style={{ borderBottom: '1px solid rgba(44,32,22,0.08)' }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em]" style={{ color: '#b85c38' }}>Catálogo</span>
            <h1 className="font-display mt-1 uppercase" style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 400, letterSpacing: '-0.03em', color: '#2c2016', lineHeight: 1 }}>
              Peças Barrocas
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm" style={{ color: '#8a7564' }}>{filtered.length} peças</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none text-sm px-4 py-2 pr-8 cursor-pointer outline-none"
                style={{ backgroundColor: '#f5f0e8', color: '#2c2016', border: '1px solid rgba(44,32,22,0.12)', borderRadius: 1 }}>
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <svg className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5a4a38" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
            </div>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 mt-8 overflow-x-auto pb-1">
          {CATEGORIES.map((c, i) => (
            <button key={i} onClick={() => setCategory(c)}
              className="whitespace-nowrap px-5 py-2 text-sm font-medium transition-all"
              style={{
                borderRadius: 1,
                border: `1px solid ${category === c ? '#2c2016' : 'rgba(44,32,22,0.15)'}`,
                backgroundColor: category === c ? '#2c2016' : 'transparent',
                color: category === c ? '#faf7f2' : '#5a4a38',
              }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className="px-6 md:px-12 lg:px-20 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-24" style={{ color: '#8a7564' }}>
            <div className="font-display text-2xl mb-2" style={{ fontFamily: "'Fraunces', serif" }}>Nenhuma peça encontrada</div>
            <div className="text-sm">Tente outra categoria</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((p) => (
              <CollectionCard
                key={p.id}
                product={p}
                added={addedId === p.id}
                isFav={favorites.has(p.id)}
                onAdd={() => onAddToCart(p.id)}
                onFav={() => toggleFav(p.id)}
                onOpen={() => openProduct(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Botão secreto para acionar o estado de vendido para o filme */}
      <button
        onClick={() => setNossaSenhoraSold(!nossaSenhoraSold)}
        style={{
          position: 'fixed',
          top: '4px',
          right: '4px',
          zIndex: 999999,
          opacity: 0.15,
          backgroundColor: '#333',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          padding: '4px 10px',
          fontSize: '18px',
          cursor: 'pointer',
        }}
        title="Simular Venda (Nossa Senhora)"
      >
        {nossaSenhoraSold ? 'Disponibilizar' : 'Vender'}
      </button>
    </div>
  )
}

function CollectionCard({
  product, added, isFav, onAdd, onFav, onOpen,
}: {
  product: Product
  added: boolean
  isFav: boolean
  onAdd: () => void
  onFav: () => void
  onOpen: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <div className="group" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div
        className="relative overflow-hidden cursor-pointer"
        style={{ backgroundColor: '#ede5d5', borderRadius: 2, aspectRatio: '3/4' }}
        onClick={onOpen}>
        <img
          src={product.img}
          alt={product.alt}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />

        {/* Sold overlay */}
        {(product as any).sold && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(44,32,22,0.45)' }}>
            <span className="text-sm font-medium tracking-widest uppercase px-4 py-2" style={{ backgroundColor: '#2c2016', color: '#faf7f2', borderRadius: 1 }}>VENDIDO</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.tag && (
            <span className="text-xs uppercase tracking-wider px-2 py-0.5"
              style={{
                backgroundColor: product.tag === 'Promoção' ? '#b85c38' : '#2c2016',
                color: '#f5f0e8',
                borderRadius: 1,
              }}>
              {product.tag}
            </span>
          )}
          {discount && (
            <span className="text-xs font-medium px-2 py-0.5"
              style={{ backgroundColor: '#7a8c6e', color: '#faf7f2', borderRadius: 1 }}>
              -{discount}%
            </span>
          )}
        </div>

        {/* Fav button */}
        <button
          onClick={(e) => { e.stopPropagation(); onFav() }}
          className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 transition-all"
          style={{
            backgroundColor: 'rgba(250,247,242,0.85)',
            borderRadius: '50%',
            opacity: hovered || isFav ? 1 : 0,
            color: isFav ? '#b85c38' : '#2c2016',
          }}
          aria-label="Favoritar">
          <svg width="15" height="15" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>

        {/* Add to cart */}
        <button
          onClick={(e) => { e.stopPropagation(); onAdd() }}
          className="absolute bottom-3 left-3 right-3 py-2.5 text-xs font-medium transition-all duration-300"
          style={{
            backgroundColor: added ? '#7a8c6e' : '#2c2016',
            color: '#faf7f2',
            borderRadius: 1,
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          }}>
          {added ? '✓ Adicionado' : 'Adicionar ao carrinho'}
        </button>
      </div>

      <div className="mt-3 flex items-start justify-between gap-2" onClick={onOpen} style={{ cursor: 'pointer' }}>
        <div className="min-w-0">
          <div className="text-sm font-medium truncate" style={{ color: '#2c2016' }}>{product.name}</div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-sm" style={{ color: '#5a4a38' }}>R$ {product.price.toLocaleString('pt-BR')}</span>
            {product.originalPrice && (
              <span className="text-xs line-through" style={{ color: '#a89880' }}>R$ {product.originalPrice.toLocaleString('pt-BR')}</span>
            )}
          </div>
          <div className="text-xs mt-0.5" style={{ color: '#a89880' }}>{product.category}</div>
        </div>
      </div>
    </div>
  )
}
