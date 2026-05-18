declare module 'react-simple-maps' {
  import type { ReactNode, CSSProperties } from 'react'

  export interface GeographyType {
    rsmKey: string
    [key: string]: unknown
  }

  export function ComposableMap(props: {
    projection?: string
    projectionConfig?: Record<string, unknown>
    width?: number
    height?: number
    style?: CSSProperties
    className?: string
    'aria-hidden'?: boolean | 'true' | 'false'
    children?: ReactNode
  }): JSX.Element

  export function Geographies(props: {
    geography: string | object
    children: (args: { geographies: GeographyType[] }) => ReactNode
  }): JSX.Element

  export function Geography(props: {
    geography: GeographyType
    style?: {
      default?: CSSProperties
      hover?: CSSProperties
      pressed?: CSSProperties
    }
    [key: string]: unknown
  }): JSX.Element

  export function Marker(props: {
    coordinates: [number, number]
    className?: string
    style?: CSSProperties
    children?: ReactNode
    [key: string]: unknown
  }): JSX.Element

  export function Line(props: {
    from: [number, number]
    to: [number, number]
    className?: string
    style?: CSSProperties
    [key: string]: unknown
  }): JSX.Element
}
