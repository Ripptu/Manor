import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDown, MapPin } from 'lucide-react';

// --- Types ---

interface Property {
  id: string;
  name: string;
  location: string;
  sqft: string;
  type: string;
  image: string;
}

// --- Constants ---

const PROPERTIES: Property[] = [
  {
    id: '01',
    name: 'The Kensington Residence',
    location: 'London, UK',
    sqft: '8,500 SQFT',
    type: 'Private Estate',
    image: 'https://picsum.photos/seed/kensington/1000/1200'
  },
  {
    id: '02',
    name: 'Villa Como',
    location: 'Lombardy, Italy',
    sqft: '12,000 SQFT',
    type: 'Lakefront Villa',
    image: 'https://picsum.photos/seed/como/1000/1200'
  },
  {
    id: '03',
    name: 'Estate No. 4',
    location: 'Kyoto, Japan',
    sqft: '6,200 SQFT',
    type: 'Modern Sanctuary',
    image: 'https://picsum.photos/seed/kyoto/1000/1200'
  },
  {
    id: '04',
    name: 'Penthouse 88',
    location: 'New York, USA',
    sqft: '5,100 SQFT',
    type: 'Urban Sky Villa',
    image: 'https://picsum.photos/seed/nyc/1000/1200'
  },
  {
    id: '05',
    name: 'Domaine de Provence',
    location: 'Aix-en-Provence, France',
    sqft: '15,000 SQFT',
    type: 'Historic Renovation',
    image: 'https://picsum.photos/seed/provence/1000/1200'
  }
];

// --- Animation Variants ---

const ANIMATION_OPTS = {
  duration: 1.2,
  ease: [0.22, 1, 0.36, 1]
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: ANIMATION_OPTS
  }
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const menuVariants = {
  closed: { 
    opacity: 0,
    y: "-100%",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
  open: { 
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

// --- Sub-Components ---

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full px-6 md:px-8 py-6 md:py-8 flex justify-between items-center z-50 mix-blend-difference text-manor-bg">
        <div className="text-xs tracking-[0.2em] font-sans uppercase z-50">Manor & Co.</div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-xs tracking-[0.2em] font-sans uppercase cursor-pointer">
          <span className="hover:opacity-60 transition-opacity">Philosophy</span>
          <span className="hover:opacity-60 transition-opacity">Collection</span>
          <span className="hover:opacity-60 transition-opacity">Contact</span>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-xs tracking-[0.2em] font-sans uppercase z-50 hover:opacity-60 transition-opacity"
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>
      </nav>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-manor-green z-40 flex flex-col justify-center items-center text-manor-bg"
          >
            <div className="flex flex-col gap-12 text-center">
              {['Philosophy', 'Collection', 'Services', 'Contact'].map((item, i) => (
                <motion.span 
                  key={item}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1), duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif text-4xl md:text-5xl italic cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </motion.span>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute bottom-12 text-[10px] tracking-[0.2em] uppercase"
            >
              Est. 1988 — London
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between px-6 pt-24 pb-12 md:px-16 md:pt-48 md:pb-20 overflow-hidden">
      
      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 h-full">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="lg:col-span-7 flex flex-col justify-center z-10 order-2 lg:order-1"
        >
          <div className="overflow-hidden">
            <motion.h1 variants={fadeInUp} className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.95] md:leading-[0.9] text-manor-text tracking-tight break-words">
              The <span className="italic font-light">Art</span> <br />
              of Living.
            </motion.h1>
          </div>
          
          <div className="overflow-hidden mt-8 md:mt-12 max-w-md">
            <motion.p variants={fadeInUp} className="font-sans text-sm md:text-base leading-relaxed text-manor-text/80 font-light">
              Curating exceptional spaces for the discerning few. 
              We bridge the gap between historic grandeur and contemporary silence.
            </motion.p>
          </div>

          <motion.div variants={fadeInUp} className="mt-12 md:mt-16">
             <button className="group flex items-center gap-4 text-xs tracking-[0.2em] uppercase border-b border-manor-text pb-2 transition-all duration-700 hover:pr-4">
                Explore The Estate
                <ArrowRight strokeWidth={1} className="w-4 h-4 transition-transform duration-700 group-hover:translate-x-2" />
             </button>
          </motion.div>
        </motion.div>

        {/* Image */}
        <div className="lg:col-span-5 relative h-[50vh] md:h-[60vh] lg:h-auto mt-8 md:mt-12 lg:mt-0 order-1 lg:order-2">
            <motion.div 
              style={{ y }}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full overflow-hidden"
            >
              <img 
                src="https://picsum.photos/seed/arch1/800/1200" 
                alt="Architecture" 
                className="w-full h-full object-cover grayscale-[20%] contrast-[0.95]"
              />
            </motion.div>
            
            {/* Architectural caption */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute -left-12 bottom-12 -rotate-90 origin-bottom-left text-[10px] tracking-[0.3em] uppercase text-manor-text/60 whitespace-nowrap hidden md:block"
            >
              Plate 01 — The Beginning
            </motion.div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <ArrowDown strokeWidth={0.5} className="w-6 h-6 animate-bounce opacity-40" />
      </motion.div>
    </section>
  );
};

const Philosophy: React.FC = () => {
  return (
    <section className="w-full py-24 md:py-32 px-6 md:px-16 border-t border-manor-text/10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        <div className="md:col-span-4">
          <span className="font-serif italic text-3xl text-manor-green">01.</span>
          <h2 className="mt-4 text-xs font-sans uppercase tracking-[0.2em] text-manor-text/50">Our Philosophy</h2>
        </div>
        <div className="md:col-span-8">
          <p className="font-serif text-3xl md:text-5xl leading-tight text-manor-text">
            True luxury is <span className="italic">quiet</span>. It is found in the integrity of materials, the precision of light, and the silence of space.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-12 md:mt-16">
            <p className="font-sans text-sm leading-7 text-manor-text/70 font-light">
              We reject the noise of modern excess. MANOR was founded on the belief that a home should be a sanctuary—a piece of livable art that stands entirely outside of time. We work with artisans who still believe in the hand, and architects who understand the soul.
            </p>
            <p className="font-sans text-sm leading-7 text-manor-text/70 font-light">
              From the sourcing of ancient stone to the planting of mature gardens, our process is unhurried. We build not for the season, but for the century. Each property is a unique narrative, written in stone, wood, and light.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Portfolio: React.FC = () => {
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null);

  // Default to first image if none hovered
  const activeImage = hoveredProperty 
    ? PROPERTIES.find(p => p.id === hoveredProperty)?.image 
    : PROPERTIES[0].image;

  return (
    <section className="w-full py-20 md:py-24 px-6 md:px-16 border-t border-manor-text/10 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        
        {/* List View */}
        <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="mb-12 md:mb-16">
                <span className="font-serif italic text-3xl text-manor-green">02.</span>
                <h2 className="mt-4 text-xs font-sans uppercase tracking-[0.2em] text-manor-text/50">The Collection</h2>
            </div>

            <div className="flex flex-col">
              {PROPERTIES.map((property) => (
                <motion.div 
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  onMouseEnter={() => setHoveredProperty(property.id)}
                  onMouseLeave={() => setHoveredProperty(null)}
                  className="group relative flex flex-col py-8 md:py-12 border-b border-manor-text/10 cursor-pointer transition-colors duration-500 hover:border-manor-text/40"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between w-full">
                    <div className="flex items-baseline gap-6">
                      <span className="font-sans text-[10px] text-manor-text/40">{property.id}</span>
                      <h3 className="font-serif text-3xl md:text-4xl text-manor-text transition-all duration-500 group-hover:italic group-hover:pl-4">
                        {property.name}
                      </h3>
                    </div>
                    
                    {/* Mobile Image - Shown inline */}
                    <div className="lg:hidden w-full mt-6 mb-4 overflow-hidden">
                      <img 
                        src={property.image} 
                        alt={property.name} 
                        className="w-full aspect-[4/3] object-cover grayscale-[20%] contrast-[0.95]" 
                      />
                    </div>
                    
                    {/* Desktop Details */}
                    <div className="flex items-center gap-4 md:gap-8 mt-2 md:mt-0 font-sans text-xs tracking-widest text-manor-text/60">
                      <span>{property.location}</span>
                      <span className="hidden md:block w-px h-3 bg-manor-text/20"></span>
                      <span className="block md:hidden text-manor-text/20">|</span>
                      <span>{property.sqft}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
        </div>

        {/* Sticky Image Preview (Desktop Only) */}
        <div className="hidden lg:block lg:col-span-5 relative">
          <div className="sticky top-32 w-full aspect-[3/4] overflow-hidden bg-manor-text/5">
             <AnimatePresence mode="wait">
                <motion.img
                    key={activeImage}
                    src={activeImage}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 grayscale-[20%]"
                    alt="Property Preview"
                />
             </AnimatePresence>
             
             {/* Overlay Details */}
             <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-manor-text/10 to-transparent">
                <div className="flex items-center gap-2 text-white/90 font-sans text-[10px] uppercase tracking-[0.2em]">
                    <MapPin className="w-3 h-3" />
                    {hoveredProperty 
                        ? PROPERTIES.find(p => p.id === hoveredProperty)?.location 
                        : "Select a Residence"}
                </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-16 md:py-24 px-6 md:px-16 border-t border-manor-text/10 flex flex-col items-center justify-center text-center">
      <h2 className="font-serif text-5xl md:text-7xl italic text-manor-text mb-8">Manor.</h2>
      
      <div className="flex flex-col md:flex-row gap-6 md:gap-16 font-sans text-xs tracking-[0.2em] uppercase text-manor-text/60 mb-12 md:mb-16">
        <a href="#" className="hover:text-manor-text transition-colors">Instagram</a>
        <a href="#" className="hover:text-manor-text transition-colors">Enquiries</a>
        <a href="#" className="hover:text-manor-text transition-colors">Press</a>
      </div>

      <div className="font-sans text-[10px] text-manor-text/30 leading-relaxed">
        &copy; {new Date().getFullYear()} MANOR Real Estate Development. <br className="md:hidden" />
        All rights reserved. Est. 1988.
      </div>
    </footer>
  );
};

// --- Main Application ---

const App: React.FC = () => {
  return (
    <main className="w-full min-h-screen bg-manor-bg selection:bg-manor-green selection:text-white">
      <Nav />
      <Hero />
      <Philosophy />
      <Portfolio />
      <Footer />
    </main>
  );
};

export default App;