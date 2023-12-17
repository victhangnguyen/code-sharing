import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date()
  const millisecondsDiff = Math.floor(now.getTime() - createdAt.getTime())
  const secondsDiff = Math.floor(millisecondsDiff / 1000)

  // Handle different time units
  if (secondsDiff < 60) {
    return `${secondsDiff} second${secondsDiff === 1 ? '' : 's'} ago`
  } else if (secondsDiff < 3600) {
    const minutesDiff = Math.floor(secondsDiff / 60)
    return `${minutesDiff} minute${minutesDiff === 1 ? '' : 's'} ago`
  } else if (secondsDiff < 86400) {
    const hoursDiff = Math.floor(secondsDiff / 3600)
    return `${hoursDiff} hour${hoursDiff === 1 ? '' : 's'} ago`
  } else if (secondsDiff < 604800) {
    const daysDiff = Math.floor(secondsDiff / 86400)
    return `${daysDiff} day${daysDiff === 1 ? '' : 's'} ago`
  } else if (secondsDiff < 2629800) {
    // 30 days
    const weeksDiff = Math.floor(secondsDiff / 604800)
    return `${weeksDiff} week${weeksDiff === 1 ? '' : 's'} ago`
  } else if (secondsDiff < 31556926) {
    // 365 days
    const monthsDiff = Math.floor(secondsDiff / 2629800)
    return `${monthsDiff} month${monthsDiff === 1 ? '' : 's'} ago`
  } else {
    const yearsDiff = Math.floor(secondsDiff / 31556926)
    return `${yearsDiff} year${yearsDiff === 1 ? '' : 's'} ago`
  }
}

export const formatAndDivideNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`
  } else {
    return `${num}`
  }
}
