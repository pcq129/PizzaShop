export interface Modifier {
  modifierId: number;
  groupId: number;
  name: string;
  rate: number;
  quantity: number;
  unit: string;
  description: string;
}

export interface ModifierGroup {
  isSelected: [number];
  id: number;
  name: string;
  description: string;
}
