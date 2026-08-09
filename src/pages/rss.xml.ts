import { getIssues, issuePath } from "../lib/github";

const escape = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

export async function GET({ site }: { site: URL }) {
  const issues = await getIssues();
  const base = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/`;
  const items = issues
    .map(
      (issue) =>
        `<item><title>${escape(issue.title)}</title><link>${new URL(`${base}${issuePath(issue.number)}`, site)}</link><guid>${issue.htmlUrl}</guid><pubDate>${new Date(issue.createdAt).toUTCString()}</pubDate><description>${escape(issue.excerpt)}</description></item>`,
    )
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>TIL</title><link>${site}</link><description>GitHub Issues から生成する技術ノート</description>${items}</channel></rss>`,
    { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } },
  );
}
