export interface Product {
  id: string;
  name: string;
  price: string;
  status: "AVAILABLE" | "SOLD OUT" | "FEW LEFT";
  description: string;
  sizes: string[];
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "01",
    name: "EXO-TRENCH V2",
    price: "0.08 ETH",
    status: "AVAILABLE",
    description:
      "SYNTHETIC POLYMER SHELL. NANOTUBE REINFORCED STITCHING. DESIGNED FOR ACID RAIN AND URBAN DECAY. WATERPROOF RATING: ABSOLUTE.",
    sizes: ["S", "M", "L", "VOID"],
  },
  {
    id: "02",
    name: "VOID-RUNNERS",
    price: "0.05 ETH",
    status: "FEW LEFT",
    description:
      "ANTI-GRAVITY SOLE. KINETIC ENERGY ABSORPTION. LEAVES NO DIGITAL FOOTPRINT. STEALTH MODE ENABLED BY DEFAULT.",
    sizes: ["US 8", "US 9", "US 10", "US 11"],
  },
  {
    id: "03",
    name: "NEURAL HOODIE",
    price: "0.03 ETH",
    status: "SOLD OUT",
    description:
      "EMF SHIELDING FABRIC. BUILT-IN BIOMETRIC SENSORS. KEEPS YOUR THOUGHTS PRIVATE IN HIGH-SURVEILLANCE ZONES.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "04",
    name: "TACTICAL VEST // 00",
    price: "0.12 ETH",
    status: "AVAILABLE",
    description:
      "MODULAR ATTACHMENT SYSTEM. KEVLAR WEAVE. HOLDS UP TO 4 DATA DRIVES AND 2 ENERGY CELLS. HEAVY DUTY HARDWARE.",
    sizes: ["ONE SIZE"],
  },
];
