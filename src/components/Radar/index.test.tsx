import React from 'react'
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup'
import RadarChart from './index'

describe('RadarChart', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders all category labels', () => {
    const { container } = render(<RadarChart username='Software Engineer' />)

    const expectedCategories = [
      'Technology',
      'System',
      'People',
      'Process',
      'Influence',
    ]
    const svgTextElements = container.querySelectorAll('svg text')

    // Create an array of text content from all SVG text elements
    const textContents = Array.from(svgTextElements).map((el) => el.textContent)

    // Check if each category appears in the text elements
    expectedCategories.forEach((category) => {
      expect(textContents).toContain(category)
    })
  })

  it('renders controls for each category', () => {
    render(<RadarChart username='Software Engineer' />)

    const selects = screen.getAllByRole('combobox')
    expect(selects).toHaveLength(5)

    // Verify each select has the correct label
    expect(screen.getByLabelText('Technology')).toBeInTheDocument()
    expect(screen.getByLabelText('System')).toBeInTheDocument()
    expect(screen.getByLabelText('People')).toBeInTheDocument()
    expect(screen.getByLabelText('Process')).toBeInTheDocument()
    expect(screen.getByLabelText('Influence')).toBeInTheDocument()
  })

  it('displays appropriate options for each category', () => {
    render(<RadarChart username='Software Engineer' />)

    // Test a few key selections to ensure options are populated correctly
    const technologySelect = screen.getByLabelText('Technology')
    const technologyOptions = within(technologySelect).getAllByRole('option')
    expect(technologyOptions.map((opt) => opt.textContent)).toEqual([
      'Adopts',
      'Specializes',
      'Evangelizes',
      'Masters',
      'Creates',
    ])

    const systemSelect = screen.getByLabelText('System')
    const systemOptions = within(systemSelect).getAllByRole('option')
    expect(systemOptions.map((opt) => opt.textContent)).toEqual([
      'Enhances',
      'Designs',
      'Owns',
      'Evolves',
      'Leads',
    ])
  })

  it('allows changing levels via dropdowns', async () => {
    const user = userEvent.setup()
    render(<RadarChart username='Software Engineer' />)

    const technologySelect = screen.getByLabelText('Technology')
    await user.selectOptions(technologySelect, 'Masters')
    expect(technologySelect).toHaveValue('Masters')
  })

  it('renders the SVG radar chart', () => {
    render(<RadarChart username='Software Engineer' />)

    // Check for SVG presence
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()

    // Check for basic SVG elements that should always be present
    expect(svg?.querySelectorAll('polygon').length).toBeGreaterThan(0)
    expect(svg?.querySelectorAll('line').length).toBeGreaterThan(0)
    expect(svg?.querySelectorAll('text').length).toBeGreaterThan(0)
  })

  it('maintains accessibility features', () => {
    render(<RadarChart username='Software Engineer' />)

    // Check form structure
    const form = screen.getByRole('form')
    expect(form).toBeInTheDocument()

    // Check that all selects have accessible names
    const selects = screen.getAllByRole('combobox')
    selects.forEach((select) => {
      expect(select).toHaveAccessibleName()
    })

    // Check SVG accessibility
    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('viewBox')
  })
})
