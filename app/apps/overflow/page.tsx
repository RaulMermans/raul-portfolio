import type { Metadata } from 'next'
import OverflowLanding from './OverflowLanding'

export const metadata: Metadata = {
  title: 'Overflow — A calm training journal for iPhone | Raul M.',
  description:
    'Track workouts, build routines, and measure progress without the noise. Overflow is a calm performance journal for iPhone.',
}

export default function OverflowPage() {
  return <OverflowLanding />
}
