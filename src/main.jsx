import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './context/ThemeContext'
import { RecipeProvider } from './context/RecipeContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RecipeProvider>
        <App />
      </RecipeProvider>
    </ThemeProvider>
  </StrictMode>,
)
