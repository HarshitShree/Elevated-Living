
import React, { useState, useEffect, useMemo } from 'react';
import { PRODUCTS, COLLECTIONS, OCCASIONS } from './constants';
import { getGiftRecommendations } from './geminiService';

// --- Types ---
type View = 'home' | 'collections' | 'shop' | 'story' | 'contact';

// --- Shared Components ---

const Logo: React.FC<{ className?: string, textColorClass?: string, align?: 'center' | 'start', onClick?: () => void }> = ({ 
  className = "w-12", 
  textColorClass = "text-white", 
  align = 'center',
  onClick
}) => (
  <div className={`flex flex-col ${align === 'center' ? 'items-center' : 'items-start'} group cursor-pointer ${className}`} onClick={onClick}>
    <svg viewBox="0 0 400 360" className="w-full h-auto mb-1" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
      <g className="text-primary">
        <path d="M80 180 L200 60 L320 180 V320 H80 Z" />
        <path d="M65 320 H335" strokeWidth="18" />
        <rect x="160" y="100" width="80" height="55" strokeWidth="10" />
        <circle cx="200" cy="115" r="5" fill="currentColor" />
        <path d="M165 145 L185 125 L200 135 L220 120 L235 145" strokeWidth="6" />
        <path d="M105 185 L135 185 L120 155 Z" fill="currentColor" strokeWidth="0" />
        <path d="M120 185 V260" strokeWidth="10" />
        <rect x="175" y="235" width="50" height="30" rx="4" strokeWidth="10" />
        <path d="M165 220 V255 A10 10 0 0 0 175 275 H225 A10 10 0 0 0 235 255 V220" strokeWidth="10" />
        <path d="M265 300 L285 300 L280 265 L270 265 Z" strokeWidth="10" />
        <path d="M275 265 Q250 235 265 210" strokeWidth="8" />
        <path d="M275 265 Q300 235 285 210" strokeWidth="8" />
      </g>
    </svg>
    <div className={`flex flex-col ${align === 'center' ? 'items-center' : 'items-start'} -space-y-1`}>
      <span className={`font-body font-bold text-[0.6rem] sm:text-[0.7rem] tracking-[0.3em] uppercase transition-colors ${textColorClass}`}>ELEVATED</span>
      <span className={`font-body font-bold text-[0.6rem] sm:text-[0.7rem] tracking-[0.3em] uppercase transition-colors ${textColorClass}`}>LIVING</span>
    </div>
  </div>
);

const Navbar: React.FC<{ currentView: View, setView: (v: View) => void }> = ({ currentView, setView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const navLinks: { label: string, view: View }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Collections', view: 'collections' },
    { label: 'Shop', view: 'shop' },
    { label: 'Story', view: 'story' },
    { label: 'Contact', view: 'contact' },
  ];

  const textColor = (!isScrolled && currentView === 'home') ? 'text-white' : 'text-text-light dark:text-text-dark';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 h-24 flex items-center ${isScrolled || currentView !== 'home' ? 'bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-900' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
        <div className="flex-shrink-0">
          <Logo 
            className="w-14 sm:w-16" 
            textColorClass={textColor}
            onClick={() => setView('home')}
          />
        </div>

        <div className={`hidden md:flex space-x-10 items-center font-body text-[10px] uppercase tracking-[0.25em] font-medium ${textColor}`}>
          {navLinks.map((link) => (
            <button 
              key={link.view}
              onClick={() => setView(link.view)}
              className={`hover:text-primary transition-colors pb-1 border-b-2 ${currentView === link.view ? 'border-primary text-primary' : 'border-transparent'}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className={`flex items-center space-x-6 ${textColor}`}>
          <button className="hover:text-primary transition-colors"><span className="material-symbols-outlined text-xl">search</span></button>
          <button className="hover:text-primary transition-colors relative">
            <span className="material-symbols-outlined text-xl">shopping_bag</span>
            <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
          </button>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-xl">{isDark ? 'light_mode' : 'dark_mode'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

// --- Page Components ---

const HomeView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => (
  <div className="animate-in fade-in duration-700">
    {/* Hero */}
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" alt="Hero" className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
        <h2 className="text-primary font-body tracking-[0.4em] uppercase text-xs sm:text-sm">Curated Luxury</h2>
        <h1 className="font-display text-5xl md:text-8xl text-white leading-tight">Timeless Gifts <br/> <span className="italic font-light">for Every</span> Celebration</h1>
        <p className="text-gray-200 font-body text-lg md:text-xl font-light max-w-2xl mx-auto">Discover the art of gifting with our exclusive collection of luxury home decor and dining essentials.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <button onClick={() => setView('shop')} className="px-10 py-4 bg-primary text-white font-medium uppercase tracking-widest text-xs hover:bg-primary-dark transition-all transform hover:-translate-y-1">Shop Collection</button>
          <button onClick={() => setView('contact')} className="px-10 py-4 bg-transparent text-white border border-white/50 font-medium uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all transform hover:-translate-y-1">Contact Us</button>
        </div>
      </div>
    </section>

    {/* Quick Story */}
    <section className="py-24 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
         <span className="text-primary font-bold tracking-widest uppercase text-xs">Since 2018</span>
         <h2 className="font-display text-4xl md:text-6xl max-w-3xl mx-auto leading-tight">Crafting spaces that resonate with <span className="italic">soul and sophistication</span>.</h2>
         <button onClick={() => setView('story')} className="text-primary border-b border-primary pb-1 uppercase tracking-widest text-[10px] font-bold hover:text-primary-dark transition-colors">Our Full Story</button>
      </div>
    </section>

    {/* Featured Collections Grid */}
    <section className="py-12 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative group overflow-hidden h-[600px] cursor-pointer" onClick={() => setView('collections')}>
          <img src={COLLECTIONS[0].image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors"></div>
          <div className="absolute bottom-0 left-0 p-12 space-y-2">
            <h3 className="font-display text-4xl text-white">{COLLECTIONS[0].title}</h3>
            <p className="text-white/80 uppercase tracking-widest text-xs">{COLLECTIONS[0].subtitle}</p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="relative group overflow-hidden flex-1 h-[300px] cursor-pointer" onClick={() => setView('collections')}>
            <img src={COLLECTIONS[1].image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
            <div className="absolute bottom-0 left-0 p-8 space-y-1">
              <h3 className="font-display text-3xl text-white">{COLLECTIONS[1].title}</h3>
              <p className="text-white/80 uppercase tracking-widest text-[10px]">{COLLECTIONS[1].subtitle}</p>
            </div>
          </div>
          <div className="relative group overflow-hidden flex-1 h-[300px] cursor-pointer" onClick={() => setView('collections')}>
            <img src={COLLECTIONS[2].image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
            <div className="absolute bottom-0 left-0 p-8 space-y-1">
              <h3 className="font-display text-3xl text-white">{COLLECTIONS[2].title}</h3>
              <p className="text-white/80 uppercase tracking-widest text-[10px]">{COLLECTIONS[2].subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* AI Concierge Section */}
    <GiftConcierge />
  </div>
);

const CollectionsView: React.FC = () => (
  <div className="pt-32 pb-24 bg-background-light dark:bg-background-dark animate-in slide-in-from-bottom-4 duration-500">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <h1 className="font-display text-5xl md:text-7xl mb-4">The Collections</h1>
        <p className="text-text-muted-light dark:text-text-muted-dark uppercase tracking-[0.3em] text-[10px]">A Curation of Exquisite Taste</p>
      </div>
      <div className="grid grid-cols-1 gap-12">
        {COLLECTIONS.map((col, idx) => (
          <div key={col.id} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
            <div className="w-full lg:w-1/2 aspect-[4/3] overflow-hidden group">
              <img src={col.image} alt={col.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <span className="text-primary uppercase tracking-widest text-xs font-bold">{col.subtitle}</span>
              <h2 className="font-display text-4xl md:text-5xl">{col.title}</h2>
              <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed font-light">
                Discover the meticulous craftsmanship behind our {col.title.toLowerCase()}. Each piece is sourced from heritage artisans and designed to elevate your living experience to new heights of luxury and comfort.
              </p>
              <button className="px-8 py-3 border border-text-light dark:border-text-dark uppercase tracking-widest text-[10px] font-bold hover:bg-text-light hover:text-background-light dark:hover:bg-text-dark dark:hover:text-background-dark transition-all">
                Explore Items
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ShopView: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Dining', 'Serving', 'Home Decor', 'Barware'];
  
  const filteredProducts = useMemo(() => {
    if (filter === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === filter);
  }, [filter]);

  return (
    <div className="pt-32 pb-24 bg-background-light dark:bg-background-dark animate-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <h1 className="font-display text-5xl md:text-7xl">Shop All</h1>
            <p className="text-text-muted-light dark:text-text-muted-dark font-light max-w-md">Our complete range of signature home essentials and luxury gift sets.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-[10px] uppercase tracking-widest font-bold transition-all border ${filter === cat ? 'bg-primary border-primary text-white' : 'bg-transparent border-gray-200 dark:border-gray-800'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredProducts.map(prod => (
            <div key={prod.id} className="group">
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-gray-50 dark:bg-surface-dark">
                <img src={prod.image} alt={prod.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <button className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-background-dark text-text-light dark:text-text-dark px-8 py-4 shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white uppercase tracking-widest text-[10px] font-bold">
                  Quick Add
                </button>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-primary uppercase tracking-[0.2em]">{prod.category}</p>
                <h3 className="font-display text-2xl">{prod.name}</h3>
                <p className="text-text-muted-light dark:text-text-muted-dark font-light text-lg">${prod.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StoryView: React.FC = () => (
  <div className="animate-in fade-in duration-700">
    <section className="relative h-[60vh] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-50" />
        <div className="absolute inset-0 bg-background-light/80 dark:bg-background-dark/80"></div>
      </div>
      <div className="relative z-10 text-center space-y-4 pt-20">
        <h1 className="font-display text-6xl md:text-8xl">Our Story</h1>
        <p className="text-primary uppercase tracking-[0.4em] text-[10px] font-bold">Heritage • Passion • Craft</p>
      </div>
    </section>
    
    <section className="py-24 max-w-4xl mx-auto px-6 space-y-16">
      <div className="space-y-8 text-center">
        <h2 className="font-display text-4xl italic">"True luxury is found in the quiet moments of everyday life."</h2>
        <div className="w-16 h-px bg-primary mx-auto"></div>
      </div>
      
      <div className="prose prose-lg dark:prose-invert font-light leading-relaxed mx-auto text-text-muted-light dark:text-text-muted-dark">
        <p>Elevated Living was born out of a desire to redefine the luxury home experience. Founded in 2018 by Monika Srivastava, the brand began as a small boutique catering to private collectors looking for unique, heritage-quality dining pieces.</p>
        <p>Today, we have grown into a globally recognized name, yet our core philosophy remains unchanged: luxury is not about excess, but about the thoughtful selection of materials, the precision of craftsmanship, and the beauty of functional art.</p>
        <p>Every item in our collection is curated through extensive travel and deep relationships with artisans who carry centuries of tradition in their hands. From the glassblowers of Murano to the linen weavers of Northern India, our partners are chosen for their dedication to perfection.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
        <img src="https://images.unsplash.com/photo-1551651056-2cb4d5c104be?q=80&w=800&auto=format&fit=crop" className="w-full aspect-square object-cover" />
        <img src="https://images.unsplash.com/photo-1541604193435-2258a3a96184?q=80&w=800&auto=format&fit=crop" className="w-full aspect-square object-cover" />
      </div>
    </section>
  </div>
);

const ContactView: React.FC = () => (
  <div className="pt-40 pb-24 bg-background-light dark:bg-background-dark animate-in slide-in-from-bottom-4 duration-500">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="font-display text-6xl">Get in Touch</h1>
            <p className="text-text-muted-light dark:text-text-muted-dark font-light text-lg">Whether you're looking for a bespoke gift curation or have questions about our collections, our team is here to assist.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="font-display text-xl border-b border-primary w-fit pb-1">Our Offices</h3>
              <p className="text-sm font-light text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                123 Luxury Avenue<br/>New York, NY 10001<br/>United States
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-xl border-b border-primary w-fit pb-1">Client Care</h3>
              <p className="text-sm font-light text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                hello@elevatedliving.com<br/>+1 (555) 123-4567<br/>Mon-Fri: 9am - 6pm EST
              </p>
            </div>
          </div>

          <div className="pt-12">
            <h3 className="font-display text-xl mb-6">Follow Our Journey</h3>
            <div className="flex gap-8 text-xs uppercase tracking-widest font-bold">
              <a href="#" className="hover:text-primary transition-colors">Instagram</a>
              <a href="#" className="hover:text-primary transition-colors">Pinterest</a>
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="bg-surface-light dark:bg-surface-dark p-12 border border-gray-100 dark:border-gray-800 shadow-2xl">
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">Name</label>
                <input type="text" className="w-full bg-transparent border-0 border-b border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-primary px-0 py-2 font-light" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">Email</label>
                <input type="email" className="w-full bg-transparent border-0 border-b border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-primary px-0 py-2 font-light" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Subject</label>
              <select className="w-full bg-transparent border-0 border-b border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-primary px-0 py-2 font-light">
                <option>General Inquiry</option>
                <option>Bespoke Gifting</option>
                <option>Wedding Registry</option>
                <option>Corporate Orders</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Message</label>
              <textarea rows={4} className="w-full bg-transparent border-0 border-b border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-primary px-0 py-2 font-light resize-none" />
            </div>
            <button className="w-full bg-primary text-white uppercase tracking-widest text-[10px] font-bold py-5 hover:bg-primary-dark transition-all shadow-xl">
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

// --- Sub-sections ---

const GiftConcierge: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query) return;
    setLoading(true);
    const recommendation = await getGiftRecommendations(query);
    setResult(recommendation || null);
    setLoading(false);
  };

  return (
    <section className="py-24 bg-[#FAF7F2] dark:bg-[#111111] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-primary font-bold tracking-widest uppercase text-xs">AI Concierge</span>
              <h2 className="font-display text-4xl md:text-5xl leading-tight">Finding the Perfect <span className="italic">Gift</span></h2>
              <p className="text-text-muted-light dark:text-text-muted-dark font-light max-w-md">
                Tell our AI Concierge about the occasion and recipient, and we'll suggest the most elegant options from our catalog.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <textarea 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. A wedding gift for a couple who loves minimalist design and hosting dinner parties..."
                className="w-full bg-white dark:bg-surface-dark border-gray-200 dark:border-gray-800 p-4 h-32 focus:ring-primary focus:border-primary transition-all text-sm font-light resize-none"
              />
              <button 
                onClick={handleAsk}
                disabled={loading || !query}
                className="bg-primary text-white py-4 px-8 uppercase tracking-widest text-xs font-bold hover:bg-primary-dark disabled:opacity-50 transition-all shadow-lg"
              >
                {loading ? 'Consulting Experts...' : 'Ask Concierge'}
              </button>
            </div>
          </div>
          <div className="relative min-h-[400px] flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl scale-75"></div>
            <div className={`w-full p-8 md:p-12 bg-white dark:bg-surface-dark shadow-2xl border border-primary/10 transition-all duration-500 transform ${result ? 'scale-100 opacity-100' : 'scale-95 opacity-50'}`}>
              <div className="flex items-center space-x-4 mb-6 border-b border-gray-50 dark:border-gray-800 pb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">face</span>
                </div>
                <div>
                  <p className="font-display text-lg">Concierge Recommendation</p>
                  <p className="text-[10px] text-primary uppercase tracking-widest">Powered by Gemini</p>
                </div>
              </div>
              <div className="prose prose-sm dark:prose-invert font-light italic leading-relaxed text-text-muted-light dark:text-text-muted-dark">
                {result ? (
                  <p className="whitespace-pre-line">{result}</p>
                ) : (
                  <p className="text-center py-10 opacity-50">"Luxury is personal. Tell me what you're looking for..."</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC<{ setView: (v: View) => void }> = ({ setView }) => (
  <footer id="contact" className="bg-[#0A0A0A] text-white pt-24 pb-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 border-b border-white/5 pb-20">
        <div className="space-y-8">
          <Logo className="w-20 sm:w-24" textColorClass="text-white" align="start" onClick={() => setView('home')} />
          <p className="text-gray-500 text-sm leading-relaxed font-light mt-6">
            Curating timeless elegance for your home and lifestyle. Discover the art of luxury gifting through our globally sourced collections.
          </p>
          <div className="flex space-x-6 text-gray-400 pt-2">
            {['Instagram', 'Facebook', 'Pinterest'].map(s => (
              <a key={s} href="#" className="text-xs uppercase tracking-widest hover:text-primary transition-colors">{s}</a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-xl mb-8 text-primary">Explore</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-light">
            <li><button onClick={() => setView('story')} className="hover:text-white transition-colors text-left">Our Story</button></li>
            <li><button onClick={() => setView('collections')} className="hover:text-white transition-colors text-left">Collections</button></li>
            <li><button onClick={() => setView('home')} className="hover:text-white transition-colors text-left">Gifting Concierge</button></li>
            <li><button onClick={() => setView('shop')} className="hover:text-white transition-colors text-left">Shop All</button></li>
            <li><button onClick={() => setView('contact')} className="hover:text-white transition-colors text-left">Careers</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl mb-8 text-primary">Contact</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-light">
            <li className="flex items-center"><span className="material-symbols-outlined text-lg mr-3 text-primary/50">mail</span> hello@elevatedliving.com</li>
            <li className="flex items-center"><span className="material-symbols-outlined text-lg mr-3 text-primary/50">call</span> +1 (555) 123-4567</li>
            <li className="flex items-center"><span className="material-symbols-outlined text-lg mr-3 text-primary/50">location_on</span> 123 Luxury Ave, Manhattan</li>
          </ul>
          <a href="#" className="mt-8 inline-flex items-center px-6 py-3 border border-primary/30 text-primary text-[10px] uppercase tracking-widest font-bold hover:bg-primary hover:text-white transition-all">
            <span className="material-symbols-outlined text-sm mr-2">chat</span> WhatsApp Order
          </a>
        </div>

        <div>
          <h4 className="font-display text-xl mb-8 text-primary">Newsletter</h4>
          <p className="text-gray-500 text-sm mb-6 font-light">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form className="space-y-3">
            <input type="email" placeholder="Enter your email" className="w-full bg-white/5 border-white/10 text-white px-5 py-4 focus:ring-primary focus:border-primary text-sm font-light placeholder:text-gray-700" />
            <button className="w-full bg-primary text-white uppercase tracking-widest text-[10px] font-bold py-4 hover:bg-primary-dark transition-all transform hover:-translate-y-1">Subscribe</button>
          </form>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest font-medium">
        <p>© 2024 Elevated Living. All rights reserved.</p>
        <div className="flex space-x-8 mt-6 md:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-grow">
        {currentView === 'home' && <HomeView setView={setCurrentView} />}
        {currentView === 'collections' && <CollectionsView />}
        {currentView === 'shop' && <ShopView />}
        {currentView === 'story' && <StoryView />}
        {currentView === 'contact' && <ContactView />}
      </main>

      <Footer setView={setCurrentView} />
    </div>
  );
}
