export function cls(...args: unknown[]): string {
  return args.filter(Boolean).join(" ")
}

export function asNumber(value: unknown): number | null {
  const number = Number.parseFloat(String(value))
  return Number.isNaN(number) ? null : number
}

export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined
}

export function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(value, max))
}

export const percentFormatter = new Intl.NumberFormat("en-US", {
  style: 'percent',
  minimumFractionDigits: 0,
  maximumFractionDigits: 1
})
