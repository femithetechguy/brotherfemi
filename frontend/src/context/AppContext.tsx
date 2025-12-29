import React, { createContext, useContext, useReducer, ReactNode } from 'react'

interface AppState {
  loading: boolean
  error: string | null
  theme: 'light' | 'dark'
}

interface ContentState {
  pages: Record<string, any>
  currentPage: string
}

interface UserState {
  contact: any | null
  preferences: Record<string, any>
}

interface GlobalState {
  app: AppState
  content: ContentState
  user: UserState
}

type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_PAGE_CONTENT'; payload: { page: string; content: any } }
  | { type: 'SET_CURRENT_PAGE'; payload: string }
  | { type: 'CLEAR_ERROR' }

const initialState: GlobalState = {
  app: {
    loading: false,
    error: null,
    theme: 'light',
  },
  content: {
    pages: {},
    currentPage: 'home',
  },
  user: {
    contact: null,
    preferences: {},
  },
}

function reducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        app: { ...state.app, loading: action.payload },
      }
    case 'SET_ERROR':
      return {
        ...state,
        app: { ...state.app, error: action.payload },
      }
    case 'SET_THEME':
      return {
        ...state,
        app: { ...state.app, theme: action.payload },
      }
    case 'SET_PAGE_CONTENT':
      return {
        ...state,
        content: {
          ...state.content,
          pages: {
            ...state.content.pages,
            [action.payload.page]: action.payload.content,
          },
        },
      }
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        content: { ...state.content, currentPage: action.payload },
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        app: { ...state.app, error: null },
      }
    default:
      return state
  }
}

interface AppContextType {
  state: GlobalState
  dispatch: React.Dispatch<Action>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}
