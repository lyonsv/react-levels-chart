// Radar/index.tsx
import React from 'react'
import useLocalStorageSync from './hooks'
import Controls from './Controls'

export type Category =
  | 'Technology'
  | 'System'
  | 'People'
  | 'Process'
  | 'Influence'

export type LevelMap = {
  [key in Category]: string[]
}

const defaultLevels: SelectedLevels = {
  Technology: 'Specializes',
  System: 'Owns',
  People: 'Mentors',
  Process: 'Challenges',
  Influence: 'Multiple Teams',
}

const categories: Category[] = [
  'Technology',
  'System',
  'People',
  'Process',
  'Influence',
]

const levelMap: LevelMap = {
  Technology: ['Adopts', 'Specializes', 'Evangelizes', 'Masters', 'Creates'],
  System: ['Enhances', 'Designs', 'Owns', 'Evolves', 'Leads'],
  People: ['Learns', 'Supports', 'Mentors', 'Coordinates', 'Manages'],
  Process: ['Follows', 'Enforces', 'Challenges', 'Adjusts', 'Defines'],
  Influence: ['Subsystem', 'Team', 'Multiple Teams', 'Company', 'Community'],
}

export type SelectedLevels = {
  [key in Category]: string
}

type Coordinates = {
  x: number
  y: number
}

interface RadarChartProps {
  username: string
  levels?: SelectedLevels
}

const RadarChart: React.FC<RadarChartProps> = ({
  username,
  levels = defaultLevels,
}) => {
  const [selectedLevels, setSelectedLevels] = useLocalStorageSync(
    username,
    levels
  )

  const handleLevelChange = (category: Category, level: string): void => {
    setSelectedLevels({ ...selectedLevels, [category]: level })
  }

  const getCoordinates = (index: number, level: number): Coordinates => {
    const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2
    const radius = ((level + 1) / 6) * 350
    return {
      x: 400 + radius * Math.cos(angle),
      y: 400 + radius * Math.sin(angle),
    }
  }

  const getLabelPosition = (index: number, level: number): Coordinates => {
    const { x, y } = getCoordinates(index, level)
    const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2
    const adjustedX = x + Math.cos(angle) * 20
    const adjustedY = y + Math.sin(angle) * 20
    return { x: adjustedX, y: adjustedY }
  }

  return (
    <div className='w-[800px] h-[800px] mx-auto flex flex-col items-center'>
      <svg style={{ maxWidth: '100%' }} viewBox='0 0 800 800'>
        {/* Draw pentagon levels */}
        {[0, 1, 2, 3, 4].map((levelIndex) => (
          <polygon
            key={levelIndex}
            points={categories
              .map((_, i) => {
                const { x, y } = getCoordinates(i, levelIndex)
                return `${x},${y}`
              })
              .join(' ')}
            fill='none'
            stroke='#ccc'
            strokeWidth='1'
          />
        ))}

        {/* Draw category lines */}
        {categories.map((_, index) => {
          const { x, y } = getCoordinates(index, 4)
          return (
            <line
              key={index}
              x1='400'
              y1='400'
              x2={x}
              y2={y}
              stroke='#ccc'
              strokeWidth='1'
            />
          )
        })}

        {/* Draw selected level line */}
        <polygon
          points={categories
            .map((category, index) => {
              const level = levelMap[category].indexOf(selectedLevels[category])
              const { x, y } = getCoordinates(index, level)
              return `${x},${y}`
            })
            .join(' ')}
          fill='rgba(255, 0, 0, 0.2)'
          stroke='red'
          strokeWidth='2'
        />

        {/* Draw category labels */}
        {categories.map((category, index) => {
          const { x, y } = getLabelPosition(index, 5)
          return (
            <text
              key={index}
              x={x}
              y={y}
              textAnchor='middle'
              dominantBaseline='middle'
              fontSize='16'
              fontWeight='bold'
            >
              {category}
            </text>
          )
        })}

        {/* Draw level labels */}
        {categories.map((category, categoryIndex) =>
          levelMap[category].map((level, levelIndex) => {
            const { x, y } = getLabelPosition(categoryIndex, levelIndex)
            return (
              <text
                key={`${category}-${level}`}
                x={x}
                y={y}
                textAnchor='middle'
                dominantBaseline='middle'
                fontSize='12'
                fill='#666'
              >
                {level}
              </text>
            )
          })
        )}
      </svg>
      <Controls
        categories={categories}
        selectedLevels={selectedLevels}
        handleLevelChange={handleLevelChange}
        levelMap={levelMap}
      />
    </div>
  )
}

export default RadarChart
