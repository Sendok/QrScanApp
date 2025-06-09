export interface ScannedItem {
  id: string;
  data: string;
  scannedAt: string; // Store as ISO string for easier serialization
}
