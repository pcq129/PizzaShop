export interface Section {
  id: number;
  name: string;
  description: string;
}

export interface Table {
  id: number;
  name: string;
  status: Status;
  capacity: number;
  section_id: number;
}

declare enum Status {
  'Occupied',
  'Available',
}
