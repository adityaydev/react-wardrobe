import ts from "typescript";
import { format } from "prettier";
import { readFileSync, writeFileSync } from "node:fs";
const src = ts.createSourceFile(
  "catalogue.tsx",
  readFileSync("showcase/catalogue.tsx", "utf8"),
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX,
);
const functions = new Map(),
  vars = new Map();
for (const n of src.statements) {
  if (ts.isFunctionDeclaration(n) && n.name)
    functions.set(n.name.text, n.getText(src));
  if (ts.isVariableStatement(n))
    for (const d of n.declarationList.declarations)
      vars.set(d.name.getText(src), n.getText(src));
}
const snippets = {};
for (const [name, fn] of functions) {
  if (!name.startsWith("Example")) continue;
  const key = name.slice(7);
  let body = fn
    .replace(name, "Example")
    .replace(
      "const {notify}=W.useNotifications();",
      "const {notify}=W.useNotifications();",
    );
  let setup = "";
  if (/\bpeople\b/.test(fn) || /\bcolumns\b/.test(fn))
    setup += vars.get("people") + "\n" + vars.get("columns") + "\n";
  for (const helper of ["PaginationExample", "TagsExample"])
    if (fn.includes(helper)) setup += functions.get(helper) + "\n";
  if (!body.match(/notify\(/))
    body = body.replace(
      /const\s*\{\s*notify\s*\}\s*=\s*W.useNotifications\(\);?\s*/,
      "",
    );
  snippets[key] =
    'import { useState } from "react";\nimport * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n' +
    setup +
    "\nexport default " +
    body;
}
snippets.AppShell =
  'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\nexport default function Example() { return <W.WardrobeProvider><W.AppShell navigation={<W.Navbar brand="Acme" items={[{id:"home",label:"Home",href:"/"}]} />} topbar={<span>Workspace</span>}><W.PageHeader title="Projects"/><W.Card>Your content</W.Card></W.AppShell></W.WardrobeProvider>; }';
snippets.NotificationProvider =
  'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\nfunction Content(){ const {notify}=W.useNotifications(); return <W.Inline><W.Button onPress={()=>notify({title:"New update"})}>Notify</W.Button><W.NotificationCenter/></W.Inline>; }\nexport default function Example(){ return <W.WardrobeProvider><W.NotificationProvider><Content/></W.NotificationProvider></W.WardrobeProvider>; }';
for (const key of Object.keys(snippets))
  snippets[key] = await format(snippets[key], { parser: "typescript" });
writeFileSync(
  "showcase/examples.json",
  JSON.stringify(snippets, null, 2) + "\n",
);
console.log(`Generated ${Object.keys(snippets).length} copyable examples`);
