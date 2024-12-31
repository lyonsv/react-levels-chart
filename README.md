[![NPM version](https://img.shields.io/npm/v/react-levels-chart.svg)](https://www.npmjs.com/package/react-levels-chart)
[![Downloads](https://img.shields.io/npm/dm/react-levels-chart.svg)](https://www.npmjs.com/package/react-levels-chart)
[![License](https://img.shields.io/npm/l/react-levels-chart.svg)](https://github.com/lyonsv/react-levels-chart/blob/main/LICENSE)
[![Tests](https://github.com/lyonsv/react-levels-chart/actions/workflows/test.yml/badge.svg)](https://github.com/username/repo/actions/workflows/test.yml)
[![CodeQL](https://github.com/lyonsv/react-levels-chart/actions/workflows/codeql.yml/badge.svg)](https://github.com/username/repo/actions/workflows/codeql.yml)
[![codecov](https://codecov.io/gh/lyonsv/react-levels-chart/branch/main/graph/badge.svg)](https://codecov.io/gh/lyonsv/react-levels-chart)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=lyonsv_react-levels-chart&metric=bugs)](https://sonarcloud.io/summary/new_code?id=lyonsv_react-levels-chart)

# React Levels Chart

A React component for visualizing engineering career progression using radar charts. This tool helps engineering managers facilitate meaningful discussions about career development and expectations across different engineering levels. You can see the chart in use on the [Radarz site](https://radarz.built.ie). 

The idea for these charts comes from the [engineering ladders](https://github.com/jorgef/engineeringladders) framework.

<img width="546" alt="image" src="https://github.com/user-attachments/assets/e88dee25-132e-4b11-80a0-bd769a6e889f" />

## Features

- 📊 Interactive radar chart visualization of engineering levels
- 🎯 Five key dimensions: Technology, System, People, Process, and Influence
- 📏 Customizable progression levels with built-in defaults
- 🎨 Flexible styling system
- 💾 Local storage sync for persistence
- ♿ Accessible form controls
- 📱 Responsive design with scrollable controls option

## Installation

```bash
npm install react-levels-chart
# or
yarn add react-levels-chart
```

## Quick Start

```tsx
import { Radar } from 'react-levels-chart';

const MyComponent = () => {
  return (
    <Radar 
      username="engineer.name"
      levels={{
        Technology: 'Specializes',
        System: 'Owns',
        People: 'Mentors',
        Process: 'Challenges',
        Influence: 'Multiple Teams'
      }}
    />
  );
};
```

## API Reference

### Radar Props

```typescript
interface RadarProps {
  username: string;
  levels?: SelectedLevels;
}

type Category = 'Technology' | 'System' | 'People' | 'Process' | 'Influence';

type SelectedLevels = {
  [key in Category]: string;
}
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| username | string | Yes | Unique identifier for local storage sync |
| levels | SelectedLevels | No | Initial levels for each category |

### Default Levels

The component comes with predefined progression levels for each category:

```typescript
const levelMap = {
  Technology: ['Adopts', 'Specializes', 'Evangelizes', 'Masters', 'Creates'],
  System: ['Enhances', 'Designs', 'Owns', 'Evolves', 'Leads'],
  People: ['Learns', 'Supports', 'Mentors', 'Coordinates', 'Manages'],
  Process: ['Follows', 'Enforces', 'Challenges', 'Adjusts', 'Defines'],
  Influence: ['Subsystem', 'Team', 'Multiple Teams', 'Company', 'Community']
}
```

## Styling

The component supports comprehensive style customization through the Controls component:

```typescript
interface StyleConfig {
  form?: React.CSSProperties;
  fieldset?: React.CSSProperties;
  controlsContainer?: React.CSSProperties;
  controlWrapper?: React.CSSProperties;
  label?: React.CSSProperties;
  selectWrapper?: React.CSSProperties;
  select?: React.CSSProperties;
  customDropdownArrow?: {
    url: string;
    width?: number;
    height?: number;
    position?: {
      right?: number | string;
      top?: number | string;
    };
  };
}
```

### Example Style Customization

```tsx
const customStyles: StyleConfig = {
  controlsContainer: {
    gap: '24px',
    marginTop: '32px'
  },
  select: {
    borderColor: '#0066cc',
    borderRadius: '8px',
    padding: '12px'
  },
  customDropdownArrow: {
    url: '/custom-arrow.svg',
    width: 12,
    height: 8
  }
};

<Controls
  categories={categories}
  selectedLevels={selectedLevels}
  handleLevelChange={handleLevelChange}
  levelMap={levelMap}
  styles={customStyles}
  scrollable={true}
/>
```

## Development

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build the package
npm run build

# Run tests
npm test

# Generate coverage report
npm run coverage
```

### Testing

The project uses Vitest for testing. Tests can be run with:

```bash
npm test
```

For coverage reports:

```bash
npm run coverage
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the [engineering ladders](https://github.com/jorgef/engineeringladders) framework.
