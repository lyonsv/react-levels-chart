// Radar/.tsx
import React from 'react'

// Type Definitions
export type Category = 'Technology' | 'System' | 'People' | 'Process' | 'Influence'
export type SelectedLevels = {
  [key in Category]: string
}
export type LevelMap = {
  [key in Category]: string[]
}

// Style configuration types
export interface StyleConfig {
  form?: React.CSSProperties
  fieldset?: React.CSSProperties
  controlsContainer?: React.CSSProperties
  controlWrapper?: React.CSSProperties
  label?: React.CSSProperties
  selectWrapper?: React.CSSProperties
  select?: React.CSSProperties
  // Optional custom dropdown arrow
  customDropdownArrow?: {
    url: string
    width?: number
    height?: number
    position?: {
      right?: number | string
      top?: number | string
    }
  }
}

// Default styles
const defaultStyles: StyleConfig = {
  form: {
    margin: '48px 0',
    width: '100%'
  },
  fieldset: {
    border: 'none',
    padding: 0,
    margin: 0
  },
  controlsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '32px'
  },
  controlWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    color: '#333',
    fontSize: '16px',
    marginBottom: '8px',
    fontWeight: 'normal'
  },
  selectWrapper: {
    position: 'relative'
  },
  select: {
    appearance: 'none',
    width: '100%',
    padding: '8px 32px 8px 12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: 'white',
    cursor: 'pointer',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23666666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center'
  }
}

interface ControlsProps {
  categories: Category[]
  selectedLevels: SelectedLevels
  handleLevelChange: (category: Category, value: string) => void
  levelMap: LevelMap
  scrollable?: boolean
  styles?: StyleConfig
}

const Controls: React.FC<ControlsProps> = ({
  categories,
  selectedLevels,
  handleLevelChange,
  levelMap,
  scrollable = false,
  styles = {}
}) => {
  // Merge default styles with custom styles
  const mergedStyles: StyleConfig = {
    form: { ...defaultStyles.form, ...styles.form },
    fieldset: { ...defaultStyles.fieldset, ...styles.fieldset },
    controlsContainer: {
      ...defaultStyles.controlsContainer,
      ...(scrollable && {
        justifyContent: 'flex-start',
        overflowX: 'auto',
        paddingBottom: '16px'
      }),
      ...styles.controlsContainer
    },
    controlWrapper: {
      ...defaultStyles.controlWrapper,
      ...(scrollable && { minWidth: '180px' }),
      ...styles.controlWrapper
    },
    label: { ...defaultStyles.label, ...styles.label },
    selectWrapper: { ...defaultStyles.selectWrapper, ...styles.selectWrapper },
    select: { ...defaultStyles.select, ...styles.select }
  }

  // If custom dropdown arrow is provided, update select background properties
  if (styles.customDropdownArrow) {
    const { url, width = 10, height = 6, position = { right: 12, top: '50%' } } = styles.customDropdownArrow
    mergedStyles.select = {
      ...mergedStyles.select,
      backgroundImage: `url("${url}")`,
      backgroundSize: `${width}px ${height}px`,
      backgroundPosition: 'right 12px center'
    }
  }

  return (
    <form role="form" style={mergedStyles.form}>
      <fieldset style={mergedStyles.fieldset}>
        <div style={mergedStyles.controlsContainer}>
          {categories.map((category) => (
            <div key={category} style={mergedStyles.controlWrapper}>
              <label
                htmlFor={`select-${category.toLowerCase()}`}
                style={mergedStyles.label}
              >
                {category}
              </label>
              <div style={mergedStyles.selectWrapper}>
                <select
                  id={`select-${category.toLowerCase()}`}
                  value={selectedLevels[category]}
                  onChange={(e) => handleLevelChange(category, e.target.value)}
                  style={mergedStyles.select}
                >
                  {levelMap[category].map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </fieldset>
    </form>
  )
}

export default Controls
