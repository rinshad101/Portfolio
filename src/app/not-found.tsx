import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col items-start justify-center pt-24">
      <p className="font-mono text-sm text-fg-2">
        <span className="text-green">portfolio@developer</span>:<span className="text-accent-2">~</span>$ cd /this-page
      </p>
      <p className="mt-2 font-mono text-sm text-[#f87171]">bash: cd: no such file or directory</p>
      <h1 className="display-title mt-8">
        404 — <span className="text-gradient">Lost in the stack.</span>
      </h1>
      <p className="mt-5 max-w-md text-fg-2">The page you’re looking for doesn’t exist or has moved.</p>
      <Link href="/" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-fg px-6 text-sm font-medium text-bg">
        cd ~ (back home)
      </Link>
    </section>
  )
}
