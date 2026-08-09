import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

export type BlogLabel = { name: string; color: string };
export type BlogIssue = {
  number: number;
  title: string;
  body: string;
  htmlUrl: string;
  state: "open" | "closed";
  createdAt: string;
  updatedAt: string;
  labels: BlogLabel[];
  excerpt: string;
};

const repository = process.env.GITHUB_REPOSITORY ?? "e-gui-egg/til";
const apiUrl = `https://api.github.com/repos/${repository}/issues?state=all&per_page=100&sort=created&direction=desc`;
let issuePromise: Promise<BlogIssue[]> | undefined;

function plainText(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[>#*_~-]/g, " ")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getRepository() {
  return repository;
}

export function issuePath(number: number) {
  return `issues/${number}/`;
}

export function tagPath(tag: string) {
  return `tags/${encodeURIComponent(tag)}/`;
}

export function getIssues(): Promise<BlogIssue[]> {
  issuePromise ??= fetch(apiUrl, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "issue-journal-astro",
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    },
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error(`GitHub Issues API returned ${response.status}: ${await response.text()}`);
    }
    const rows = (await response.json()) as Array<Record<string, unknown>>;
    return rows
      .filter((row) => !row.pull_request)
      .map((row) => {
        const body = typeof row.body === "string" ? row.body : "";
        return {
          number: row.number as number,
          title: row.title as string,
          body,
          htmlUrl: row.html_url as string,
          state: row.state as "open" | "closed",
          createdAt: row.created_at as string,
          updatedAt: row.updated_at as string,
          labels: (row.labels as Array<{ name: string; color: string }>).map(({ name, color }) => ({
            name,
            color,
          })),
          excerpt: plainText(body).slice(0, 180),
        };
      });
  });
  return issuePromise;
}

export async function renderIssueBody(body: string) {
  const html = await marked.parse(body, { gfm: true });
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "details", "summary"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      code: ["class"],
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "nofollow noreferrer", target: "_blank" }),
      img: sanitizeHtml.simpleTransform("img", { loading: "lazy" }),
    },
  });
}

export function getTagCounts(issues: BlogIssue[]) {
  const counts = new Map<string, number>();
  for (const issue of issues) {
    for (const label of issue.labels) counts.set(label.name, (counts.get(label.name) ?? 0) + 1);
  }
  return [...counts.entries()].toSorted((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}
