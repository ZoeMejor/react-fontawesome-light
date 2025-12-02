import React from 'react'

import type {
  IconDefinition,
  IconName,
} from '@fortawesome/fontawesome-svg-core'
import { faCoffee, fas } from '@fortawesome/free-solid-svg-icons'
import { render, screen } from '@testing-library/react'

import { FontAwesomeIcon } from '../FontAwesomeIcon'

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

describe('FontAwesomeIcon', () => {
  describe('direct icon definition', () => {
    test('renders svg with correct viewBox', () => {
      render(<FontAwesomeIcon data-testid="icon" icon={faCoffee} />)

      const svg = screen.getByTestId('icon')

      expect(svg).toBeInTheDocument()
      expect(svg).toHaveAttribute(
        'viewBox',
        `0 0 ${faCoffee.icon[0]} ${faCoffee.icon[1]}`,
      )
      expect(svg).toHaveAttribute('aria-hidden', 'true')
      expect(svg).toHaveAttribute('focusable', 'false')
    })

    test('applies className', () => {
      render(
        <FontAwesomeIcon
          data-testid="icon"
          icon={faCoffee}
          className="text-xl text-white"
        />,
      )

      const svg = screen.getByTestId('icon')

      expect(svg).toHaveClass('text-xl')
      expect(svg).toHaveClass('text-white')
    })

    test('passes through additional SVG attributes', () => {
      render(
        <FontAwesomeIcon
          data-testid="icon"
          icon={faCoffee}
          style={{ color: 'red' }}
        />,
      )

      const svg = screen.getByTestId('icon')

      expect(svg).toBeInTheDocument()
      expect(svg).toHaveStyle({ color: 'rgb(255, 0, 0)' })
    })

    test('renders path element with icon data', () => {
      const { container } = render(
        <FontAwesomeIcon data-testid="icon" icon={faCoffee} />,
      )

      const svg = screen.getByTestId('icon')
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const path = container.querySelector('path')

      expect(svg).toBeInTheDocument()
      expect(path).toBeInTheDocument()
    })
  })

  describe('icon lookup from bundle (LazyIcon pattern)', () => {
    test('renders icon looked up by name from fas bundle', () => {
      const iconName = 'coffee'
      const fullIconName = `fa${capitalizeFirst(iconName)}` as IconName
      const iconDefinition = fas[fullIconName]

      expect(iconDefinition).toBeDefined()

      render(
        <FontAwesomeIcon
          data-testid="icon"
          icon={iconDefinition}
          className="size-4"
        />,
      )

      const svg = screen.getByTestId('icon')

      expect(svg).toBeInTheDocument()
      expect(svg).toHaveAttribute(
        'viewBox',
        `0 0 ${iconDefinition.icon[0]} ${iconDefinition.icon[1]}`,
      )
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

      render(<FontAwesomeIcon icon={iconDefinition} data-testid="icon" />)

      const svg = screen.getByTestId('icon')

      expect(svg).toBeInTheDocument()
    })
  })

  describe('duotone icons (array paths)', () => {
    test('renders multiple paths for duotone icons', () => {
      const duotoneIcon: IconDefinition = {
        prefix: 'fad' as const,
        iconName: 'coffee' as const,
        icon: [640, 512, [], 'f0f4', ['M0 0 L10 10', 'M20 20 L30 30']],
      }

      const { container } = render(
        <FontAwesomeIcon icon={duotoneIcon} data-testid="icon" />,
      )

      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const paths = container.querySelectorAll('path')

      expect(paths).toHaveLength(2)
    })
  })
})
