declare module 'react-simple-maps' {
  import { ReactNode, CSSProperties } from 'react'

  export interface GeoShape { rsmKey: string; id: string | number; [key: string]: unknown }

  export interface ComposableMapProps {
    projection?: string
    projectionConfig?: { center?: [number, number]; scale?: number; rotate?: [number, number, number] }
    width?: number; height?: number; style?: CSSProperties; children?: ReactNode
  }
  export interface GeographiesProps {
    geography: string | object
    children: (args: { geographies: GeoShape[] }) => ReactNode
  }
  export interface GeographyProps {
    key?: string; geography: GeoShape; fill?: string; stroke?: string; strokeWidth?: number
    style?: { default?: CSSProperties & { outline?: string }; hover?: CSSProperties & { outline?: string }; pressed?: CSSProperties & { outline?: string } }
  }
  export function ComposableMap(props: ComposableMapProps): JSX.Element
  export function Geographies(props: GeographiesProps): JSX.Element
  export function Geography(props: GeographyProps): JSX.Element
}
