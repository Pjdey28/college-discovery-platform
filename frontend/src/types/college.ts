export interface Placement {
  id: string;
  averagePackage: number;
  highestPackage: number;
  placementRate: number;
  recruiters: string[];
}

export interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  fees: number;
  rating: number;
  description: string;
  image?: string;
  placements?: Placement[];
}