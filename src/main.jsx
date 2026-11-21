import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Desktop scale: lay the page out at 1280px wide (how it looks at 150% browser
// zoom on a 1920px screen) and zoom it to fill the window, up to 1.5x.
// Below 1280px nothing changes, so phones and the mobile layout are untouched.
const setZoom = () => {
  const z = Math.min(1.5, Math.max(1, window.innerWidth / 1280))
  document.documentElement.style.setProperty('--z', z.toFixed(3))
}
setZoom()
window.addEventListener('resize', setZoom)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
