import Link from "next/link";
import { redirect } from "next/navigation";
import { Download, LockKeyhole, LogOut } from "lucide-react";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAdminStats } from "@/lib/db";

type AdminProps = {
  searchParams: Promise<{ error?: string }>;
};

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: AdminProps) {
  const params = await searchParams;
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return (
      <main className="grid min-h-screen place-items-center bg-zinc-950 px-4 text-white">
        <form action="/api/admin/login" method="post" className="w-full max-w-sm rounded-md bg-white p-6 text-zinc-950">
          <div className="mb-5 flex size-12 items-center justify-center rounded-md bg-yellow-400">
            <LockKeyhole className="size-5" />
          </div>
          <h1 className="text-2xl font-black">spectehnika admin</h1>
          <p className="mt-2 text-sm text-zinc-600">Enter the admin password from Vercel env.</p>
          <input
            name="password"
            type="password"
            required
            autoFocus
            className="mt-5 h-12 w-full rounded-md border border-zinc-200 px-4 outline-none ring-yellow-400 focus:ring-2"
            placeholder="ADMIN_PASSWORD"
          />
          {params.error && <p className="mt-3 text-sm font-semibold text-red-700">Wrong or missing password.</p>}
          <button className="mt-4 h-12 w-full rounded-md bg-yellow-400 text-sm font-black text-black hover:bg-yellow-300">
            Sign in
          </button>
        </form>
      </main>
    );
  }

  const stats = await getAdminStats();

  if (!process.env.ADMIN_PASSWORD) {
    redirect("/admin?error=1");
  }

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-8 text-zinc-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-black">Admin dashboard</h1>
            <p className="mt-1 text-zinc-600">Contact clicks, lead requests, and export.</p>
          </div>
          <form action="/api/admin/logout" method="post">
            <button className="inline-flex h-10 items-center gap-2 rounded-md border border-zinc-300 bg-white px-4 text-sm font-bold hover:bg-zinc-50">
              <LogOut className="size-4" />
              Log out
            </button>
          </form>
        </div>

        {!stats.configured && (
          <div className="mt-6 rounded-md border border-yellow-300 bg-yellow-50 p-4 text-sm font-semibold text-yellow-900">
            DATABASE_URL is not configured. The site still builds and works, but click tracking and leads will not be stored until Neon is connected.
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-md bg-white p-5">
            <p className="text-sm font-bold text-zinc-500">Total clicks</p>
            <p className="mt-2 text-4xl font-black">{stats.totals.clicks}</p>
          </div>
          <div className="rounded-md bg-white p-5">
            <p className="text-sm font-bold text-zinc-500">Leads</p>
            <p className="mt-2 text-4xl font-black">{stats.totals.leads}</p>
          </div>
          <div className="rounded-md bg-white p-5">
            <p className="text-sm font-bold text-zinc-500">Top channel</p>
            <p className="mt-2 text-4xl font-black">{stats.byChannel[0]?.channel || "-"}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/api/admin/export?kind=clicks" className="inline-flex h-10 items-center gap-2 rounded-md bg-black px-4 text-sm font-bold text-white">
            <Download className="size-4" />
            Export clicks
          </Link>
          <Link href="/api/admin/export?kind=leads" className="inline-flex h-10 items-center gap-2 rounded-md bg-black px-4 text-sm font-bold text-white">
            <Download className="size-4" />
            Export leads
          </Link>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-md bg-white p-5">
            <h2 className="mb-4 text-xl font-black">Clicks by channel</h2>
            <div className="space-y-3">
              {stats.byChannel.map((row) => (
                <div key={row.channel} className="flex items-center justify-between border-b border-zinc-100 pb-2">
                  <span className="font-bold">{row.channel}</span>
                  <span>{row.count}</span>
                </div>
              ))}
              {!stats.byChannel.length && <p className="text-sm text-zinc-500">No clicks yet.</p>}
            </div>
          </div>
          <div className="rounded-md bg-white p-5">
            <h2 className="mb-4 text-xl font-black">Recent leads</h2>
            <div className="space-y-4">
              {stats.recentLeads.map((lead) => (
                <div key={`${lead.phone}-${lead.created_at}`} className="border-b border-zinc-100 pb-3">
                  <p className="font-black">{lead.name || "No name"} · {lead.phone}</p>
                  <p className="mt-1 text-sm text-zinc-600">{lead.message}</p>
                  <p className="mt-1 text-xs text-zinc-400">{new Date(lead.created_at).toLocaleString()}</p>
                </div>
              ))}
              {!stats.recentLeads.length && <p className="text-sm text-zinc-500">No leads yet.</p>}
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-md bg-white p-5">
          <h2 className="mb-4 text-xl font-black">Recent clicks</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-zinc-200 text-zinc-500">
                <tr>
                  <th className="py-2">Channel</th>
                  <th className="py-2">Locale</th>
                  <th className="py-2">Path</th>
                  <th className="py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentClicks.map((click) => (
                  <tr key={`${click.channel}-${click.created_at}`} className="border-b border-zinc-100">
                    <td className="py-2 font-bold">{click.channel}</td>
                    <td className="py-2">{click.locale}</td>
                    <td className="py-2">{click.path}</td>
                    <td className="py-2">{new Date(click.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!stats.recentClicks.length && <p className="py-4 text-sm text-zinc-500">No clicks yet.</p>}
          </div>
        </section>
      </div>
    </main>
  );
}
