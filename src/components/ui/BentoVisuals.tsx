import type { SkillVisualKind } from '@/types'

/* Each visual is decorative, CSS-animated (auto-disabled for reduced motion). */

function ApiFlow() {
  const nodes = ['Client', 'Gateway', 'Service', 'DB']
  return (
    <div className="flex h-full flex-col justify-center gap-5 font-mono text-[10px] sm:text-xs">
      <div className="relative flex items-center justify-between">
        <div className="absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-line via-accent/50 to-line" />
        {[0, 1.1, 2.2].map((d) => (
          <span
            key={d}
            className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent-2 shadow-[0_0_12px_2px_var(--accent-2)]"
            style={{ animation: `packet 3.3s ${d}s linear infinite` }}
          />
        ))}
        {nodes.map((n) => (
          <span key={n} className="relative rounded-lg border border-line bg-bg px-2.5 py-1.5 text-fg-2 sm:px-3">
            {n}
          </span>
        ))}
      </div>
      <div className="space-y-1 rounded-lg border border-line bg-bg/70 p-3 text-muted">
        <p>
          <span className="text-blue">GET</span> <span className="text-fg-2">/api/v1/orders?page=0</span>
        </p>
        <p>
          <span className="text-green">200 OK</span> · application/json
        </p>
      </div>
    </div>
  )
}

function Query() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 font-mono text-[10px] sm:text-[11px]">
      <p className="leading-relaxed text-fg-2">
        <span className="text-accent">SELECT</span> * <span className="text-accent">FROM</span> orders
        <br />
        <span className="text-accent">WHERE</span> status = <span className="text-green">&apos;OPEN&apos;</span>
      </p>
      <div className="overflow-hidden rounded-lg border border-line bg-bg/70">
        {['#1024', '#1025', '#1026'].map((id, i) => (
          <div
            key={id}
            className="flex justify-between border-b border-line px-3 py-1.5 last:border-0"
            style={{ animation: `row-scan 3.6s ${i * 0.5}s infinite` }}
          >
            <span className="text-fg-2">{id}</span>
            <span className="text-green">OPEN</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Token() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 font-mono text-[10px] sm:text-[11px]">
      <div className="relative overflow-hidden rounded-lg border border-line bg-bg/70 p-3 leading-relaxed">
        <span className="text-[#f87171]">header</span>
        <span className="text-muted">.</span>
        <span className="text-accent">payload</span>
        <span className="text-muted">.</span>
        <span className="text-blue">signature</span>
        <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent [animation:shimmer_3s_ease-in-out_infinite]" />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {['authenticated', 'ROLE_ADMIN', 'exp: 15m'].map((c) => (
          <span key={c} className="rounded-full border border-line px-2 py-0.5 text-green">
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}

function Editor() {
  const lines = [
    <><span className="text-accent">export function</span> <span className="text-blue">Card</span>() {'{'}</>,
    <>  <span className="text-accent">return</span> (</>,
    <>    &lt;<span className="text-accent-2">article</span> <span className="text-blue">className</span>=<span className="text-green">&quot;card&quot;</span>&gt;</>,
    <>      {'{'}children{'}'}</>,
    <>    &lt;/<span className="text-accent-2">article</span>&gt;</>,
    <>  )</>,
    <>{'}'}</>,
  ]
  return (
    <div className="flex h-full items-center">
      <pre className="w-full overflow-hidden rounded-lg border border-line bg-bg/70 p-3 font-mono text-[10px] leading-5 text-fg-2 sm:text-[11px]">
        {lines.map((l, i) => (
          <span
            key={i}
            className="block whitespace-pre"
            style={{ animation: `type-line 0.6s ${0.2 + i * 0.18}s both steps(18)` }}
          >
            {l}
            {i === lines.length - 1 && <span className="animate-blink ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-accent-2" />}
          </span>
        ))}
      </pre>
    </div>
  )
}

function Orbit() {
  const tools: Array<[string, string, string]> = [
    ['Git', '0s', '4.2rem'],
    ['Docker', '-5s', '4.2rem'],
    ['K8s', '-10s', '4.2rem'],
    ['AWS', '-15s', '4.2rem'],
  ]
  return (
    <div className="relative grid h-full min-h-40 place-items-center">
      <div className="absolute h-[8.4rem] w-[8.4rem] rounded-full border border-dashed border-line" />
      <span className="grid h-12 w-12 place-items-center rounded-xl border border-accent/50 bg-accent/10 font-mono text-[10px] text-fg shadow-[0_0_30px_-6px_var(--accent)]">
        CI
      </span>
      {tools.map(([name, delay, r]) => (
        <span
          key={name}
          className="absolute rounded-md border border-line bg-bg px-2 py-1 font-mono text-[10px] text-fg-2"
          style={{ ['--r' as string]: r, animation: `orbit 20s ${delay} linear infinite` }}
        >
          {name}
        </span>
      ))}
    </div>
  )
}

function Layers() {
  const layers = ['Controller', 'Service', 'Repository', 'Database']
  return (
    <div className="grid h-full items-center gap-4 font-mono text-[10px] sm:grid-cols-[1fr_auto] sm:text-xs">
      <div className="space-y-2">
        {layers.map((l, i) => (
          <div
            key={l}
            className="flex items-center justify-between rounded-lg border border-line bg-bg/70 px-3 py-2"
            style={{ animation: `layer-pulse 4s ${i * 0.45}s infinite`, marginLeft: `${i * 6}%`, marginRight: `${(3 - i) * 2}%` }}
          >
            <span className="text-fg-2">{l}</span>
            <span className="text-muted">{['@RestController', '@Service', '@Repository', 'Oracle'][i]}</span>
          </div>
        ))}
      </div>
      <div className="hidden flex-col gap-2 sm:flex">
        <span className="rounded-lg border border-dashed border-accent-2/40 px-3 py-2 text-accent-2">Cache</span>
        <span className="rounded-lg border border-dashed border-line px-3 py-2 text-muted">Tests</span>
        <span className="rounded-lg border border-dashed border-line px-3 py-2 text-muted">DTO ⇄ MapStruct</span>
      </div>
    </div>
  )
}

const visuals: Record<SkillVisualKind, () => React.JSX.Element> = {
  'api-flow': ApiFlow,
  query: Query,
  token: Token,
  editor: Editor,
  orbit: Orbit,
  layers: Layers,
}

export function BentoVisual({ kind }: { kind: SkillVisualKind }) {
  const V = visuals[kind]
  return (
    <div aria-hidden="true" className="h-full">
      <V />
    </div>
  )
}
