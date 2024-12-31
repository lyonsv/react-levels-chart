import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { Radar } from '../src'

const App = () => {
  const username = "vincent"

  return (
    <div style={{ padding: '2rem' }}>
      <h1>React Simple Radar Example</h1>
      <Radar username={username} />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
