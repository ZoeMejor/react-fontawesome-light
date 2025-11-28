import React, { type SVGAttributes, type Ref } from 'react'

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export interface FontAwesomeIconProps extends SVGAttributes<SVGSVGElement> {
  icon: IconDefinition
  ref?: Ref<SVGSVGElement>
}

export const FontAwesomeIcon = ({
  icon,
  className,
  ref,
  ...rest
}: FontAwesomeIconProps) => {
  const iconData = icon.icon
  const width = iconData[0]
  const height = iconData[1]
  const path = iconData[4]

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="currentColor"
      {...rest}>
      {typeof path === 'string' ? (
        <path d={path} />
      ) : (
        path.map((d, i) => <path key={i} d={d} />)
      )}
    </svg>
  )
}

FontAwesomeIcon.displayName = 'FontAwesomeIcon'

// Version 2: forwardRef only (no memo)
// export const FontAwesomeIconNoMemo = forwardRef<SVGSVGElement, FontAwesomeIconProps>(
//   ({ icon, className, ...rest }, ref) => {
//     const iconData = icon.icon
//     const width = iconData[0]
//     const height = iconData[1]
//     const path = iconData[4]

//     return (
//       <svg
//         ref={ref}
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox={`0 0 ${width} ${height}`}
//         aria-hidden="true"
//         focusable="false"
//         className={className}
//         fill="currentColor"
//         {...rest}
//       >
//         {typeof path === 'string' ? (
//           <path d={path} />
//         ) : (
//           path.map((d, i) => <path key={i} d={d} />)
//         )}
//       </svg>
//     )
//   }
// )
// FontAwesomeIconNoMemo.displayName = 'FontAwesomeIconNoMemo'

// // Version 3: Bare minimum - no memo, no forwardRef, no rest spread
// export const FontAwesomeIconBare = ({ icon, className }: { icon: IconDefinition; className?: string }) => {
//   const iconData = icon.icon
//   const width = iconData[0]
//   const height = iconData[1]
//   const path = iconData[4]

//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox={`0 0 ${width} ${height}`}
//       aria-hidden="true"
//       focusable="false"
//       className={className}
//       fill="currentColor"
//     >
//       {typeof path === 'string' ? (
//         <path d={path} />
//       ) : (
//         path.map((d, i) => <path key={i} d={d} />)
//       )}
//     </svg>
//   )
// }
