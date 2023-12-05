export interface ITechnicalDataState {
  listEmail: string[];
  loading: boolean;
  error: string;
  message: string;
  optionMenu: { value: string; label: string }[];
  searchPage: number;
  weekPage: number;
}