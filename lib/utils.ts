import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetcher(url: string) {
  return fetch(url).then(r => r.json())
}

export const rgbToHex = (r: number, g: number, b: number): string => {
  const componentToHex = (c: number): string => {
    const hex = c.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}
