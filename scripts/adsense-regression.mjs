import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const publisherId = "ca-pub-1935059419471624"
const oldPublisherId = "ca-pub-7255361396746700"
const loaderPrefix = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client="

const sourceExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".html"])
const ignoredDirs = new Set(["node_modules", ".next", ".git"])

function walk(dir) {
  const files = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walk(full))
    else if (sourceExtensions.has(path.extname(entry.name))) files.push(full)
  }
  return files
}

const files = walk(root)
const occurrences = []
let staleIdFound = false
for (const file of files) {
  const text = fs.readFileSync(file, "utf8")
  if (path.relative(root, file) !== "scripts/adsense-regression.mjs" && text.includes(oldPublisherId)) staleIdFound = true
  let index = text.indexOf(`${loaderPrefix}${publisherId}`)
  while (index !== -1) {
    occurrences.push(path.relative(root, file))
    index = text.indexOf(`${loaderPrefix}${publisherId}`, index + 1)
  }
}

const layoutPath = path.join(root, "app", "layout.tsx")
const layout = fs.readFileSync(layoutPath, "utf8")
const checks = [
  [occurrences.length === 1, `expected one AdSense loader, found ${occurrences.length}: ${occurrences.join(", ")}`],
  [occurrences[0] === "app/layout.tsx", `AdSense loader must be in app/layout.tsx, found ${occurrences[0] ?? "none"}`],
  [layout.includes("<head>"), "root layout must render an explicit head element"],
  [layout.includes("async"), "AdSense loader must remain async"],
  [layout.includes('crossOrigin="anonymous"'), "AdSense loader must use anonymous cross-origin loading"],
  [!staleIdFound, `stale publisher ID ${oldPublisherId} remains in source`],
  [!fs.existsSync(path.join(root, "components", "deferred-adsense.tsx")), "unused deferred AdSense loader should not remain"],
]

const failures = checks.filter(([ok]) => !ok).map(([, message]) => message)
if (failures.length) {
  console.error("AdSense regression failed:")
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`AdSense regression passed: publisher ${publisherId} loaded once in app/layout.tsx.`)
