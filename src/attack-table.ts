import { clamp } from "./utils"

export function baseSkill(level: number): number {
  return level * 5
}

export function calcAttackTable({
  playerLvl,
  playerExtraSkill,
  playerHitRating,
  playerIsDW,
  targetLvl,
  targetCanParry,
  targetCanBlock,
}: {
  playerLvl: number,
  playerExtraSkill: number,
  playerHitRating: number,
  playerIsDW: boolean,
  targetLvl: number,
  targetCanParry: boolean,
  targetCanBlock: boolean,
}) {
  function parry(): number {
    if (!targetCanParry) return 0
    if (targetLvl - playerLvl > 2) return 14
    return 5 + skillDiff * 0.1
  }

  function block(): number {
    if (!targetCanBlock) return 0
    return Math.min(5, 5 + skillDiff * 0.1)
  }

  function glancePenalty(): number {
    const glancePenaltyLow = clamp(1.3 - 0.05 * skillDiff, 0.1, 0.91)
    const glancePenaltyHigh = clamp(1.2 - 0.03 * skillDiff, 0.2, 0.99)
    const glancePenalty = (glancePenaltyLow + glancePenaltyHigh) / 2
    return (1 - glancePenalty) * 100
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
  const weaponSkill = baseSkill(playerLvl) + playerExtraSkill
  const skillDiff = targetDefense - weaponSkill
  const hitRating = playerHitRating - (skillDiff > 10 ? 1 : 0)
  const baseMiss = 5 + skillDiff * (skillDiff > 10 ? 0.2 : 0.1)
  const dodge = 5 + skillDiff * 0.1
  const missSkill = clamp(baseMiss - hitRating)
  const missAuto = clamp(baseMiss - hitRating + (playerIsDW ? 19 : 0))
  const glanceChance = clamp(10 + (targetDefense - baseSkill(playerLvl)) * 2)
  const critCap = clamp(100 - missAuto - dodge - parry() - block() - glanceChance - critSupp() + playerExtraSkill * 0.04)

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
