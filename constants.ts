
import { Product, Collection, Occasion } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Gold Rim Glasses',
    price: 125.00,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?q=80&w=800&auto=format&fit=crop',
    category: 'Dining'
  },
  {
    id: '2',
    name: 'Carrara Marble Platter',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=800&auto=format&fit=crop',
    category: 'Serving'
  },
  {
    id: '3',
    name: 'Artisan Tea Set',
    price: 195.00,
    image: 'https://images.unsplash.com/photo-1544280598-a83a06764d26?q=80&w=800&auto=format&fit=crop',
    category: 'Dining'
  },
  {
    id: '4',
    name: 'Velvet Cushion Set',
    price: 110.00,
    image: 'https://images.unsplash.com/photo-1584144124614-01a16bcc4c28?q=80&w=800&auto=format&fit=crop',
    category: 'Home Decor'
  },
  {
    id: '5',
    name: 'Crystal Decanter',
    price: 145.00,
    image: 'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?q=80&w=800&auto=format&fit=crop',
    category: 'Barware'
  }
];

export const COLLECTIONS: Collection[] = [
  {
    id: 'c1',
    title: 'Luxury Crockery',
    subtitle: 'Fine Dining',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1200&auto=format&fit=crop',
    linkText: 'Explore Collection',
    size: 'large'
  },
  {
    id: 'c2',
    title: 'Curated Gift Sets',
    subtitle: 'Perfect for any occasion',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop',
    linkText: 'Shop Gifts',
    size: 'small'
  },
  {
    id: 'c3',
    title: 'Dining Accessories',
    subtitle: 'Table runners, napkins & more',
    image: 'https://images.unsplash.com/photo-1581674210501-c760093514e0?q=80&w=800&auto=format&fit=crop',
    linkText: 'Explore Accessories',
    size: 'small'
  }
];

export const OCCASIONS: Occasion[] = [
  { id: 'o1', name: 'Wedding', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop', icon: 'favorite' },
  { id: 'o2', name: 'Anniversary', image: 'https://images.unsplash.com/photo-1513273159383-c21888a71d22?q=80&w=400&auto=format&fit=crop', icon: 'celebration' },
  { id: 'o3', name: 'Corporate', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=400&auto=format&fit=crop', icon: 'business_center' },
  { id: 'o4', name: 'Home Decor', image: 'https://images.unsplash.com/photo-1616489953149-755174003058?q=80&w=400&auto=format&fit=crop', icon: 'home' }
];
