import { clamp } from "./utils"

export function baseSkill(level: number): number {
  return level * 5
}

export function calcAttackTable({
  playerLvl,
  playerWeaponSkill,
  playerHitRating,
  playerIsDW,
  targetLvl,
  targetCanParry,
  targetCanBlock,
}: {
  playerLvl: number,
  playerWeaponSkill: number,
  playerHitRating: number,
  playerIsDW: boolean,
  targetLvl: number,
  targetCanParry: boolean,
  targetCanBlock: boolean,
}) {
  function parry(): number {
    if (!targetCanParry) return 0
    if (targetLvl - playerLvl > 2) return 14
    return clamp(5 + skillDiff * 0.1)
  }

  function block(): number {
    if (!targetCanBlock) return 0
    return clamp(Math.min(5, 5 + skillDiff * 0.1))
  }

  function glancePenalty(): number {
    const lowEnd = clamp(130 - 5 * skillDiff, 10, 91)
    const highEnd = clamp(120 - 3 * skillDiff, 20, 99)
    return 100 - (lowEnd + highEnd) / 2
  }

  function critSupp(): number {
    function baseCritSupp(): number {
      if (playerLvl < targetLvl) return playerLvl - targetLvl
      return (playerLvl - targetLvl) * 0.2
    }
    const auraCritSupp = targetLvl - playerLvl > 2 ? -1.8 : 0
    return baseCritSupp() + auraCritSupp
  }

  const targetDefense = baseSkill(targetLvl)
  const skillDiff = targetDefense - playerWeaponSkill
  const hitRating = playerHitRating - (skillDiff > 10 ? 1 : 0)
  const baseMiss = 5 + skillDiff * (skillDiff > 10 ? 0.2 : 0.1)
  const dodge = clamp(5 + skillDiff * 0.1)
  const missSkill = clamp(baseMiss - hitRating)
  const missAuto = clamp(baseMiss - hitRating + (playerIsDW ? 19 : 0))
  const glanceChance = clamp(10 + (targetDefense - baseSkill(playerLvl)) * 2)
  const extraWeaponSkill = playerWeaponSkill - baseSkill(playerLvl)
  const critCap = clamp(100 - missAuto - dodge - parry() - block() - glanceChance - critSupp() + extraWeaponSkill * 0.04)

  return {
    missSkill,
    missAuto,
    dodge,
    parry: parry(),
    block: block(),
    glanceChance,
    glancePenalty: glancePenalty(),
    critCap,
  }
}
