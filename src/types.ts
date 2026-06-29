export interface Product {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  images: string[];
  description: string;
  price?: string;
  details?: string[];
}

export interface Category {
  id: string;
  label: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  avatar: string;
}

export interface ModelFeature {
  id: string;
  imageUrl: string;
  alt: string;
}
