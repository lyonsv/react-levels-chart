import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { RadarChart } from '../src'

const App = () => {
  const data = [80, 90, 70, 85, 75]
  const labels = ['A', 'B', 'C', 'D', 'E']

  return (
    <div style={{ padding: '2rem' }}>
      <h1>React Simple Radar Example</h1>
      <RadarChart data={data} labels={labels} />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
