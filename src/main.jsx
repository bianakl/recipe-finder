import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { RecipeProvider } from './context/RecipeContext'
import { SettingsProvider } from './hooks/useSettings.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <SettingsProvider>
          <RecipeProvider>
            <App />
          </RecipeProvider>
        </SettingsProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
