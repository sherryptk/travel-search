interface ImageData {
  url: string;
  width: number;
  height: number;
  mimeType: string;
  orientation: string;
  aspectRatio: number;
  type: string;
}

interface Detail {
  type: string;
  value: number;
}

interface HomeInfo {
  type: string;
  images: {
    type: string;
    data: ImageData[];
    count: number;
  };
  details: {
    type: string;
    data: Detail[];
    count: number;
  };
  description: string;
  mainImage: ImageData;
  maxGuestCapacity: number;
  host: {
    name: string;
    avatar: string | null;
    isSuperhost: boolean;
  };
  amenities: {
    type: string;
    data: any[];
    count: number;
  };
  title: string;
  id: string;
  location: {
    lat: number;
    long: number;
    address: string;
    city: string;
    country: string | null;
    zip: string;
  };
  ratings: {
    accuracy: number;
    checkin: number;
    cleanliness: number;
    communication: number;
    location: number;
    value: number;
    guestSatisfactionOverall: number;
  };
  visibleReviewCount: number;
  available: boolean;
  price: number;
  currency: {
    code: string;
    symbol: string;
    name: string;
  };
  sleepingArrangements: {
    type: string;
    data: any[];
    count: number;
  };
}

interface HomeData {
  ref: string;
  category?: string;
  info: HomeInfo;
}

interface Category {
  id: string;
  type: string;
  title: string;
}

interface ListingData {
  source: string;
  type: string;
  categories: Category[];
  data: HomeData[];
}

export { ImageData, Detail, HomeInfo, HomeData, Category, ListingData };
