import React from 'react'

import type { IconName } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faUser, fas } from '@fortawesome/free-solid-svg-icons'
import { render, screen } from '@testing-library/react'

import { FontAwesomeIcon } from '../FontAwesomeIcon'

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

describe('FontAwesomeIcon', () => {
  describe('direct icon definition', () => {
    test('renders svg with correct viewBox', () => {
      render(<FontAwesomeIcon icon={faCoffee} />)

      const svg = document.querySelector('svg')

      expect(svg).toBeInTheDocument()
      expect(svg).toHaveAttribute('viewBox', '0 0 640 512')
      expect(svg).toHaveAttribute('aria-hidden', 'true')
      expect(svg).toHaveAttribute('focusable', 'false')
    })

    test('applies className', () => {
      render(<FontAwesomeIcon icon={faCoffee} className="text-xl text-white" />)

      const svg = document.querySelector('svg')

      expect(svg).toHaveClass('text-xl')
      expect(svg).toHaveClass('text-white')
    })

    test('passes through additional SVG attributes', () => {
      render(
        <FontAwesomeIcon
          icon={faCoffee}
          data-testid="my-icon"
          style={{ color: 'red' }}
        />,
      )

      const svg = screen.getByTestId('my-icon')

      expect(svg).toBeInTheDocument()
      expect(svg).toHaveStyle({ color: 'red' })
    })

    test('forwards ref to SVG element', () => {
      const ref = React.createRef<SVGSVGElement>()

      render(<FontAwesomeIcon icon={faUser} ref={ref} />)

      expect(ref.current).toBeInstanceOf(SVGSVGElement)
    })

    test('renders path element with icon data', () => {
      render(<FontAwesomeIcon icon={faCoffee} />)

      const path = document.querySelector('path')

      expect(path).toBeInTheDocument()
      expect(path).toHaveAttribute('d')
      expect(path?.getAttribute('d')).toBeTruthy()
    })
  })

  describe('icon lookup from bundle (LazyIcon pattern)', () => {
    test('renders icon looked up by name from fas bundle', () => {
      const iconName = 'coffee'
      const fullIconName = `fa${capitalizeFirst(iconName)}` as IconName
      const iconDefinition = fas[fullIconName]

      expect(iconDefinition).toBeDefined()

      render(<FontAwesomeIcon icon={iconDefinition} className="size-4" />)

      const svg = document.querySelector('svg')

      expect(svg).toBeInTheDocument()
      expect(svg).toHaveAttribute('viewBox', '0 0 640 512')
      expect(svg).toHaveClass('size-4')
    })

    test('returns undefined for non-existent icon name', () => {
      const iconName = 'nonExistentIcon'
      const fullIconName = `fa${capitalizeFirst(iconName)}` as IconName
      const iconDefinition = fas[fullIconName]

      expect(iconDefinition).toBeUndefined()
    })

    test('handles user icon lookup', () => {
      const iconName = 'user'
      const fullIconName = `fa${capitalizeFirst(iconName)}` as IconName
      const iconDefinition = fas[fullIconName]

      render(<FontAwesomeIcon icon={iconDefinition} />)

      const svg = document.querySelector('svg')

      expect(svg).toBeInTheDocument()
    })
  })

  describe('duotone icons (array paths)', () => {
    test('renders multiple paths for duotone icons', () => {
      // Simulate a duotone icon structure
      const duotoneIcon = {
        prefix: 'fad' as const,
        iconName: 'coffee' as const,
        icon: [
          640,
          512,
          [],
          'f0f4',
          ['M0 0 L10 10', 'M20 20 L30 30'], // Array of paths
        ],
      } as const

      render(<FontAwesomeIcon icon={duotoneIcon as any} />)

      const paths = document.querySelectorAll('path')

      expect(paths).toHaveLength(2)
    })
  })
})
