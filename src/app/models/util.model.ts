export interface DataList<T> {
  first: number | null;
  prev: number | null;
  next: number | null;
  last: number | null;
  pages: number | null;
  items: number | null;
  data: T[];
}
