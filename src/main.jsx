import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './context/ThemeContext'
import { RecipeProvider } from './context/RecipeContext'
import { SettingsProvider } from './hooks/useSettings'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <SettingsProvider>
        <RecipeProvider>
          <App />
        </RecipeProvider>
      </SettingsProvider>
    </ThemeProvider>
  </StrictMode>,
)
