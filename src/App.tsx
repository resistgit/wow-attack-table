import Field from "./components/field"
import Input from "./components/input"
import Checkbox from "./components/checkbox"
import { asNumber, cls, percentFormatter } from "./utils"
import { usePersistState } from "./hooks/use-persist-state"
import { baseSkill, calcAttackTable } from "./attack-table"

function App() {
  const [playerLvl, setLevel] = usePersistState("player-level", 60)
  const [extraSkill, setExtraSkill] = usePersistState("player-extra-skill", 0)
  const [hit, setHit] = usePersistState("player-hit", 0)
  const [isDW, setIsDW] = usePersistState("player-dw", true)
  const [canParry, setCanParry] = usePersistState("target-parry", false)
  const [canBlock, setCanBlock] = usePersistState("target-block", false)

  const targetLvls: number[] = []
  for (let i = playerLvl + 3; i >= playerLvl - 3; i--) {
    targetLvls.push(i)
  }

  return (
    <>
      <div className="mx-auto p-4 max-w-xl">
        <h1 className="my-8 text-4xl font-bold text-balance">Classic WoW Attack Table</h1>

        <div className="space-y-1.5 max-w-fit">
          <Field label="Level">
            <Input value={playerLvl} onChange={(v) => setLevel(asNumber(v) ?? 1)} type="number" step={1} min={1} max={60} />
          </Field>

          <Field label="Extra Weapon Skill" description={`Base: ${baseSkill(playerLvl)}`}>
            <div className="flex items-center gap-2">
              <Input
                placeholder="MH"
                value={extraSkill}
                onChange={(v) => setExtraSkill(asNumber(v) ?? 0)}
                className="w-auto"
                type="number"
                step={1}
                min={0}
                max={50} />
              <span className="whitespace-nowrap font-semibold">= {baseSkill(playerLvl) + extraSkill}</span>
            </div>
          </Field>

          <Field label="Hit Rating (%)">
            <Input value={hit} onChange={(v) => setHit(asNumber(v) ?? 0)} type="number" step={1} min={0} max={50} />
          </Field>

          <Field label="Dual Wielding" hiddenLabel>
            <Checkbox checked={isDW} onChange={(v) => setIsDW(v ?? false)} />
          </Field>

          <Field label="Target Can Parry" hiddenLabel>
            <Checkbox checked={canParry} onChange={(v) => setCanParry(v ?? false)} />
          </Field>

          <Field label="Target Can Block" hiddenLabel>
            <Checkbox checked={canBlock} onChange={(v) => setCanBlock(v ?? false)} />
          </Field>
        </div>
      </div>

      <div className="mx-auto p-4 max-w-6xl overflow-x-scroll md:overflow-x-hidden">
        <table className="w-full md:table-fixed">
          <thead>
            <tr className="[&>*]:px-2 [&>*]:py-0.5">
              <th className="text-right" rowSpan={2}>Target Level</th>
              <th className="text-center bg-yellow-600" colSpan={4}>Special Attacks</th>
              <th className="text-center bg-gray-500" colSpan={7}>Auto Attacks</th>
            </tr>
            <tr className="[&>*]:text-right [&>*]:px-2 [&>*]:py-0.5">
              <th className="bg-yellow-600">Miss</th>
              <th className="bg-yellow-600">Dodge</th>
              <th className="bg-yellow-600">Parry</th>
              <th className="bg-yellow-600">Block</th>
              <th className="bg-gray-500">Miss</th>
              <th className="bg-gray-500">Dodge</th>
              <th className="bg-gray-500">Parry</th>
              <th className="bg-gray-500">Block</th>
              <th className="bg-gray-500">Glance Chance</th>
              <th className="bg-gray-500">Glance Penalty</th>
              <th className="bg-gray-500">Crit. Cap</th>
            </tr>
          </thead>
          <tbody>
            {targetLvls.map(targetLvl => {
              const table = calcAttackTable({
                playerLvl,
                playerExtraSkill: extraSkill,
                playerHitRating: hit,
                playerIsDW: isDW,
                targetLvl,
                targetCanParry: canParry,
                targetCanBlock: canBlock,
              })
              return (
                <tr key={targetLvl} className="[&>*]:px-2 [&>*]:py-0.5">
                  <td className="text-right">{targetLvl == playerLvl + 3 && "💀"}{targetLvl}</td>
                  <td className={cls("text-right bg-yellow-600/30", !table.missSkill && "text-white/20")}>
                    {percentFormatter.format(table.missSkill / 100)}
                  </td>
                  <td className={cls("text-right bg-yellow-600/30", !table.dodge && "text-white/20")}>
                    {percentFormatter.format(table.dodge / 100)}
                  </td>
                  <td className={cls("text-right bg-yellow-600/30", !table.parry && "text-white/20")}>
                    {percentFormatter.format(table.parry / 100)}
                  </td>
                  <td className={cls("text-right bg-yellow-600/30", !table.block && "text-white/20")}>
                    {percentFormatter.format(table.block / 100)}
                  </td>
                  <td className={cls("text-right bg-gray-400/30", !table.missAuto && "text-white/20")}>
                    {percentFormatter.format(table.missAuto / 100)}
                  </td>
                  <td className={cls("text-right bg-gray-400/30", !table.dodge && "text-white/20")}>
                    {percentFormatter.format(table.dodge / 100)}
                  </td>
                  <td className={cls("text-right bg-gray-400/30", !table.parry && "text-white/20")}>
                    {percentFormatter.format(table.parry / 100)}
                  </td>
                  <td className={cls("text-right bg-gray-400/30", !table.block && "text-white/20")}>
                    {percentFormatter.format(table.block / 100)}
                  </td>
                  <td className={cls("text-right bg-gray-400/30", !table.glanceChance && "text-white/20")}>
                    {percentFormatter.format(table.glanceChance / 100)}
                  </td>
                  <td className={cls("text-right bg-gray-400/30", !table.glancePenalty && "text-white/20")}>
                    {percentFormatter.format(table.glancePenalty / 100)}
                  </td>
                  <td className={cls("text-right bg-gray-400/30", !table.critCap && "text-white/20")}>
                    {percentFormatter.format(table.critCap / 100)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mx-auto my-10 p-4 max-w-xl">
        <h2 className="text-xl font-bold">References</h2>
        <ul>
          <li>
            <a href="https://github.com/magey/classic-warrior/wiki/Attack-table" target="_blank" className="text-accent">
              https://github.com/magey/classic-warrior/wiki/Attack-table
            </a>
          </li>
          <li>
            <a href="https://vanilla-wow-archive.fandom.com/wiki/Attack_table" target="_blank" className="text-accent">
              https://vanilla-wow-archive.fandom.com/wiki/Attack_table
            </a>
          </li>
        </ul>

        <hr className="border-zinc-700 my-6" />
        <p>Resist-Nightslayer <a href="https://github.com/resistgit/wow-attack-table" target="_blank" className="text-accent">[source]</a></p>
      </div>
    </>
  )
}

export default App
