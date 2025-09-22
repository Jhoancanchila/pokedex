/* eslint-disable @typescript-eslint/no-explicit-any */
// Temporary type declarations for Redux until dependencies are properly installed
declare module 'react-redux' {
  export function useDispatch(): any;
  export function useSelector(selector: any): any;
  export interface TypedUseSelectorHook<TState> {
    (selector: (state: TState) => any): any;
  }
  export function Provider(props: { store: any; children: React.ReactNode }): React.ReactElement;
}

declare module '@reduxjs/toolkit' {
  export function configureStore(options: any): any;
  export function createSlice(options: any): any;
  export function createSelector(...args: any[]): any;
  export function createAsyncThunk(type: string, payloadCreator: any): any;
  export interface PayloadAction<T = any> {
    payload: T;
    type: string;
  }
}

