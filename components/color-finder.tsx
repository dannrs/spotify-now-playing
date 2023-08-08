import { ReactNode, useEffect, useState } from 'react'
import ColorThief from 'colorthief'

interface ColorFinderProps {
  imageUrl: string
  children: (dominantColor: string[]) => ReactNode
}

export default function ColorFinder({
  imageUrl,
  children
}: ColorFinderProps): JSX.Element {
  const [gradientColors, setGradientColors] = useState<string[]>(['', ''])

  useEffect(() => {
    const img = new Image()
    img.src = imageUrl
    img.crossOrigin = 'Anonymous'

    img.onload = () => {
      const colorThief = new ColorThief()
      const color = colorThief.getColor(img)

      const gradientColor = [
        `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
        `rgb(${color[0] - 50}, ${color[1] - 50}, ${color[2] - 50})`
      ]
      setGradientColors(gradientColor)
    }

    img.onerror = () => {
      return
    }
  }, [imageUrl])

  return <>{children(gradientColors)}</>
}
