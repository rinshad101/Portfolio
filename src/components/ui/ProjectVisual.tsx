import type { ProjectVisualKind } from '@/types'

/** Illustrative product mockups — pure markup, no images to download. */
function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-bg/90 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)]">
      <div className="flex items-center gap-3 border-b border-line px-3 py-2">
        <div className="flex gap-1" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
        </div>
        <div className="flex-1 truncate rounded-md bg-surface px-2 py-0.5 font-mono text-[10px] text-muted">{url}</div>
      </div>
      <div className="relative flex-1 overflow-hidden p-3">{children}</div>
    </div>
  )
}

function Dashboard() {
  const bars = [42, 68, 54, 80, 62, 92, 74, 58, 86, 70]
  return (
    <BrowserFrame url="app.example.com/dashboard">
      <div className="grid h-full grid-cols-[3.5rem_1fr] gap-3">
        <div className="space-y-2 rounded-lg bg-surface p-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`h-2 rounded ${i === 1 ? 'bg-accent/70' : 'bg-line'}`} />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-2">
            {['Users', 'Teams', 'Audits'].map((l) => (
              <div key={l} className="rounded-lg border border-line bg-surface p-2">
                <div className="font-mono text-[9px] text-muted">{l}</div>
                <div className="mt-1.5 h-2 w-2/3 rounded bg-fg/70" />
              </div>
            ))}
          </div>
          <div className="flex flex-1 items-end gap-1.5 rounded-lg border border-line bg-surface p-3">
            {bars.map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="flex-1 origin-bottom rounded-sm bg-gradient-to-t from-accent/30 to-accent-2/80 transition-transform duration-700 group-hover:scale-y-110"
              />
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}

function Api() {
  const rows: Array<[string, string, string]> = [
    ['GET', '/api/v1/orders', '200'],
    ['POST', '/api/v1/orders', '201'],
    ['GET', '/api/v1/orders/{id}', '200'],
    ['PATCH', '/api/v1/orders/{id}', '200'],
    ['DELETE', '/api/v1/orders/{id}', '204'],
  ]
  const color: Record<string, string> = { GET: 'text-blue', POST: 'text-green', PATCH: 'text-accent', DELETE: 'text-[#f87171]' }
  return (
    <BrowserFrame url="api.example.com/docs">
      <div className="space-y-1.5 font-mono text-[10px] sm:text-[11px]">
        {rows.map(([m, p, s], i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-md border border-line bg-surface px-2.5 py-2 transition-transform duration-500 group-hover:translate-x-1"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <span className={`w-12 font-semibold ${color[m]}`}>{m}</span>
            <span className="flex-1 truncate text-fg-2">{p}</span>
            <span className="text-muted">{s}</span>
          </div>
        ))}
      </div>
    </BrowserFrame>
  )
}

function Auth() {
  return (
    <BrowserFrame url="auth.example.com/token">
      <div className="flex h-full flex-col justify-center gap-3 font-mono text-[10px] sm:text-[11px]">
        <div className="flex items-center justify-between gap-2">
          {['Client', 'Auth', 'API'].map((n, i) => (
            <div key={n} className="flex flex-1 items-center gap-2">
              <div className="flex-1 rounded-lg border border-line bg-surface py-2 text-center text-fg-2">{n}</div>
              {i < 2 && <span className="text-accent">→</span>}
            </div>
          ))}
        </div>
        <div className="break-all rounded-lg border border-line bg-surface p-2.5 leading-relaxed">
          <span className="text-[#f87171]">eyJhbGciOiJIUzI1NiJ9</span>
          <span className="text-muted">.</span>
          <span className="text-accent">eyJzdWIiOiJ1c2VyIiwicm9sZSI6IkFETUlOIn0</span>
          <span className="text-muted">.</span>
          <span className="text-blue">SflKxwRJSMeKKF2QT4fw</span>
        </div>
        <div className="flex gap-2">
          {['ROLE_USER', 'ROLE_ADMIN', 'orders:write'].map((r) => (
            <span key={r} className="rounded-full border border-line px-2 py-0.5 text-green">
              {r}
            </span>
          ))}
        </div>
      </div>
    </BrowserFrame>
  )
}

function DatabaseViz() {
  return (
    <BrowserFrame url="db.example.com/query">
      <div className="space-y-2 font-mono text-[10px] sm:text-[11px]">
        <p className="leading-relaxed text-fg-2">
          <span className="text-accent">SELECT</span> c.name, <span className="text-blue">COUNT</span>(o.id)
          <br />
          <span className="text-accent">FROM</span> customers c <span className="text-accent">JOIN</span> orders o
          <br />
          <span className="text-accent">GROUP BY</span> c.name;
        </p>
        <div className="overflow-hidden rounded-lg border border-line">
          {['customer_a', 'customer_b', 'customer_c', 'customer_d'].map((n, i) => (
            <div
              key={n}
              className="flex justify-between border-b border-line px-2.5 py-1.5 last:border-0"
              style={{ animation: `row-scan 4s ${i * 0.6}s infinite` }}
            >
              <span className="text-fg-2">{n}</span>
              <span className="text-muted">···</span>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  )
}

function FullStack() {
  return (
    <BrowserFrame url="example.com">
      <div className="grid h-full grid-cols-2 gap-3">
        <div className="flex flex-col gap-2 rounded-lg border border-line bg-surface p-3">
          <div className="h-2.5 w-3/4 rounded bg-fg/80" />
          <div className="h-2 w-full rounded bg-line" />
          <div className="h-2 w-5/6 rounded bg-line" />
          <div className="mt-auto h-6 w-20 rounded-full bg-accent/80" />
        </div>
        <div className="space-y-1.5 rounded-lg border border-line bg-bg p-2.5 font-mono text-[9px] leading-relaxed sm:text-[10px]">
          <p><span className="text-accent">export default</span> <span className="text-blue">async function</span></p>
          <p className="pl-2 text-fg-2">Page() {'{'}</p>
          <p className="pl-4 text-fg-2"><span className="text-accent">const</span> data =</p>
          <p className="pl-6 text-green">await api.get()</p>
          <p className="pl-4 text-fg-2">return &lt;View /&gt;</p>
          <p className="pl-2 text-fg-2">{'}'}</p>
        </div>
      </div>
    </BrowserFrame>
  )
}

const visuals: Record<ProjectVisualKind, () => React.JSX.Element> = {
  dashboard: Dashboard,
  api: Api,
  auth: Auth,
  database: DatabaseViz,
  fullstack: FullStack,
}

export function ProjectVisual({ kind }: { kind: ProjectVisualKind }) {
  const Visual = visuals[kind]
  return (
    <div aria-hidden="true" className="relative h-full w-full">
      <Visual />
    </div>
  )
}
