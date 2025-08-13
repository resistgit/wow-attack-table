import { expect, test } from 'vitest'
import { calcAttackTable } from "./attack-table"

test("no skill, no hit, no dw, backstab vs boss", () => {
  const r = calcAttackTable({
    playerLvl: 60,
    playerExtraSkill: 0,
    playerHitRating: 0,
    playerIsDW: false,
    targetLvl: 63,
    targetCanParry: false,
    targetCanBlock: false,
  })
  expect(r.missSkill).toBeCloseTo(9)
  expect(r.missAuto).toBeCloseTo(9)
  expect(r.dodge).toBeCloseTo(6.5)
  expect(r.parry).toBeCloseTo(0)
  expect(r.block).toBeCloseTo(0)
  expect(r.glanceChance).toBeCloseTo(40)
  expect(r.glancePenalty).toBeCloseTo(35)
  expect(r.critCap).toBeCloseTo(49.3)
})

test("no skill, no hit, dw, backstab vs same level", () => {
  const r = calcAttackTable({
    playerLvl: 60,
    playerExtraSkill: 0,
    playerHitRating: 0,
    playerIsDW: true,
    targetLvl: 60,
    targetCanParry: false,
    targetCanBlock: false,
  })
  expect(r.missSkill).toBeCloseTo(5)
  expect(r.missAuto).toBeCloseTo(24)
  expect(r.dodge).toBeCloseTo(5)
  expect(r.parry).toBeCloseTo(0)
  expect(r.block).toBeCloseTo(0)
  expect(r.glanceChance).toBeCloseTo(10)
  expect(r.glancePenalty).toBeCloseTo(5)
  expect(r.critCap).toBeCloseTo(61)
})

test("5 skill, no hit, no dw, backstab vs boss", () => {
  const r = calcAttackTable({
    playerLvl: 60,
    playerExtraSkill: 5,
    playerHitRating: 0,
    playerIsDW: false,
    targetLvl: 63,
    targetCanParry: false,
    targetCanBlock: false,
  })
  expect(r.missSkill).toBeCloseTo(6)
  expect(r.missAuto).toBeCloseTo(6)
  expect(r.dodge).toBeCloseTo(6)
  expect(r.parry).toBeCloseTo(0)
  expect(r.block).toBeCloseTo(0)
  expect(r.glanceChance).toBeCloseTo(40)
  expect(r.glancePenalty).toBeCloseTo(15)
  expect(r.critCap).toBeCloseTo(53)
})

test("5 skill, 6 hit, no dw, backstab vs boss", () => {
  const r = calcAttackTable({
    playerLvl: 60,
    playerExtraSkill: 5,
    playerHitRating: 6,
    playerIsDW: false,
    targetLvl: 63,
    targetCanParry: false,
    targetCanBlock: false,
  })
  expect(r.missSkill).toBeCloseTo(0)
  expect(r.missAuto).toBeCloseTo(0)
  expect(r.dodge).toBeCloseTo(6)
  expect(r.parry).toBeCloseTo(0)
  expect(r.block).toBeCloseTo(0)
  expect(r.glanceChance).toBeCloseTo(40)
  expect(r.glancePenalty).toBeCloseTo(15)
  expect(r.critCap).toBeCloseTo(59)
})

test("5 skill, 6 hit, dw, backstab vs boss", () => {
  const r = calcAttackTable({
    playerLvl: 60,
    playerExtraSkill: 5,
    playerHitRating: 6,
    playerIsDW: true,
    targetLvl: 63,
    targetCanParry: false,
    targetCanBlock: false,
  })
  expect(r.missSkill).toBeCloseTo(0)
  expect(r.missAuto).toBeCloseTo(19)
  expect(r.dodge).toBeCloseTo(6)
  expect(r.parry).toBeCloseTo(0)
  expect(r.block).toBeCloseTo(0)
  expect(r.glanceChance).toBeCloseTo(40)
  expect(r.glancePenalty).toBeCloseTo(15)
  expect(r.critCap).toBeCloseTo(40)
})

test("8 skill, 5 hit, dw, tanking vs boss with shield", () => {
  const r = calcAttackTable({
    playerLvl: 60,
    playerExtraSkill: 8,
    playerHitRating: 5,
    playerIsDW: true,
    targetLvl: 63,
    targetCanParry: true,
    targetCanBlock: true,
  })
  expect(r.missSkill).toBeCloseTo(0.7)
  expect(r.missAuto).toBeCloseTo(19.7)
  expect(r.dodge).toBeCloseTo(5.7)
  expect(r.parry).toBeCloseTo(14)
  expect(r.block).toBeCloseTo(5)
  expect(r.glanceChance).toBeCloseTo(40)
  expect(r.glancePenalty).toBeCloseTo(5)
  expect(r.critCap).toBeCloseTo(20.72)
})

test("8 skill, 9 hit, dw, tanking vs boss with shield", () => {
  const r = calcAttackTable({
    playerLvl: 60,
    playerExtraSkill: 8,
    playerHitRating: 9,
    playerIsDW: true,
    targetLvl: 63,
    targetCanParry: true,
    targetCanBlock: true,
  })
  expect(r.missSkill).toBeCloseTo(0)
  expect(r.missAuto).toBeCloseTo(15.7)
  expect(r.dodge).toBeCloseTo(5.7)
  expect(r.parry).toBeCloseTo(14)
  expect(r.block).toBeCloseTo(5)
  expect(r.glanceChance).toBeCloseTo(40)
  expect(r.glancePenalty).toBeCloseTo(5)
  expect(r.critCap).toBeCloseTo(24.72)
})
