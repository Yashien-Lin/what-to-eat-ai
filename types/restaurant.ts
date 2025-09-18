export interface Restaurant {
  name: string;
  address: string;
  mapUrl: string;
  place_id: string;
  photos?: {
    height: number;
    width: number;
    photo_reference: string;
    html_attributions: string[];
  }[];
}