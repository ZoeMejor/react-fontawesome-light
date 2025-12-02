import React, { type SVGAttributes, CSSProperties } from 'react'

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export interface FontAwesomeIconProps extends SVGAttributes<SVGSVGElement> {
  icon: IconDefinition
}

/**
 * Minimal, fast Font Awesome React wrapper.
 * - Uses 1em sizing so font-size (e.g. Tailwind text-xs) controls icon size
 * - Uses currentColor for fill so text color controls icon color
 * - No forwardRef, no special ref prop
 */
export const FontAwesomeIcon = ({
  icon,
  className,
  style,
  ...restProps
}: FontAwesomeIconProps) => {
  const iconData = icon.icon
  const viewBoxWidth = iconData[0]
  const viewBoxHeight = iconData[1]
  const svgPathData = iconData[4]

  const mergedStyle: CSSProperties = {
    boxSizing: 'content-box',
    display: 'inline-block',
    verticalAlign: '-0.125em',
    height: '1em',
    overflow: 'visible',
    ...style,
  }

  const pathDefinitions =
    typeof svgPathData === 'string' ? [svgPathData] : svgPathData

  const ariaLabel = (restProps as SVGAttributes<SVGSVGElement>)['aria-label']
  const hasAriaLabel = Boolean(ariaLabel)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      aria-hidden={hasAriaLabel ? undefined : 'true'}
      role={hasAriaLabel ? 'img' : undefined}
      focusable="false"
      className={className}
      style={mergedStyle}
      fill="currentColor"
      {...restProps}>
      {pathDefinitions.map((pathDefinition, index) => (
        <path key={index} d={pathDefinition} />
      ))}
    </svg>
  )
}
