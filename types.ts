
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface Collection {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  linkText: string;
  size: 'large' | 'small';
}

export interface Occasion {
  id: string;
  name: string;
  image: string;
  icon: string;
}
