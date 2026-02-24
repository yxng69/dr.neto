export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: "prod-1",
    name: "EXO-JACKET V1",
    price: 299.00,
    stock: 15,
    imageUrl: "https://picsum.photos/seed/exo/600/800"
  },
  {
    id: "prod-2",
    name: "NEURAL-PANTS 0X",
    price: 185.00,
    stock: 8,
    imageUrl: "https://picsum.photos/seed/neural/600/800"
  },
  {
    id: "prod-3",
    name: "CYBER-BOOTS MK-II",
    price: 350.00,
    stock: 3,
    imageUrl: "https://picsum.photos/seed/boots/600/800"
  },
  {
    id: "prod-4",
    name: "VOID-VISOR",
    price: 120.00,
    stock: 24,
    imageUrl: "https://picsum.photos/seed/visor/600/800"
  }
];
