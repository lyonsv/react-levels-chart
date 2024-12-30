import React from 'react'
import Radar from './components/Radar'

export interface RadarChartProps {
  data: number[]
  labels: string[]
  size?: number
}

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  labels,
  size = 300,
}) => {
  return (
    <div>
      <Radar username="test" />
    </div>
  )
}
