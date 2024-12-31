// Radar/hooks.ts
import { useEffect, useState } from 'react'
import { SelectedLevels } from '.'

const defaultLevelsByRole: Record<string, SelectedLevels> = {
  'Software Engineer': {
    Technology: 'Adopts',
    System: 'Designs',
    People: 'Supports',
    Process: 'Enforces',
    Influence: 'Team',
  },
  'Senior Software Engineer': {
    Technology: 'Specializes',
    System: 'Owns',
    People: 'Mentors',
    Process: 'Challenges',
    Influence: 'Multiple Teams',
  },
  'Tech Lead': {
    Technology: 'Specializes',
    System: 'Owns',
    People: 'Mentors',
    Process: 'Adjusts',
    Influence: 'Team',
  },
  'Principal Engineer': {
    Technology: 'Masters',
    System: 'Evolves',
    People: 'Mentors',
    Process: 'Adjusts',
    Influence: 'Multiple Teams',
  },
}

const useLocalStorageSync = (
  username: string,
  defaultLevels: SelectedLevels
): [SelectedLevels, (newLevels: SelectedLevels) => void] => {
  const [isClient, setIsClient] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [selectedLevels, setSelectedLevels] =
    useState<SelectedLevels>(defaultLevels)

  // Initialize on mount
  useEffect(() => {
    setIsClient(true)

    // Initialize all roles with their default values if they don't exist
    if (!localStorage.getItem('hasVisitedBefore')) {
      Object.entries(defaultLevelsByRole).forEach(([role, levels]) => {
        const key = `radarLevels_${role}`
        if (!localStorage.getItem(key)) {
          localStorage.setItem(key, JSON.stringify(levels))
        }
      })
      localStorage.setItem('hasVisitedBefore', 'true')
    }

    // Set initial levels for current role
    const storedLevels = localStorage.getItem(`radarLevels_${username}`)
    if (storedLevels) {
      setSelectedLevels(JSON.parse(storedLevels))
    } else {
      // If no stored levels exist for this role, use the default
      const defaultForRole = defaultLevelsByRole[username] || defaultLevels
      setSelectedLevels(defaultForRole)
      localStorage.setItem(
        `radarLevels_${username}`,
        JSON.stringify(defaultForRole)
      )
    }

    setInitialized(true)
  }, [username, defaultLevels])

  // Handle updates
  useEffect(() => {
    if (isClient && initialized) {
      localStorage.setItem(
        `radarLevels_${username}`,
        JSON.stringify(selectedLevels)
      )
    }
  }, [isClient, initialized, username, selectedLevels])

  const updateSelectedLevels = (newLevels: SelectedLevels) => {
    setSelectedLevels(newLevels)
  }

  return [selectedLevels, updateSelectedLevels]
}

export default useLocalStorageSync
