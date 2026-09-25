import ts from "typescript";
import { writeFileSync } from "node:fs";
const file = ts.readConfigFile("tsconfig.json", ts.sys.readFile);
const config = ts.parseJsonConfigFileContent(file.config, ts.sys, ".");
const program = ts.createProgram(config.fileNames, config.options),
  checker = program.getTypeChecker();
const source = program.getSourceFile("src/index.ts"),
  symbol = checker.getSymbolAtLocation(source);
const out = {};
for (const exported of checker.getExportsOfModule(symbol)) {
  const s =
    exported.flags & ts.SymbolFlags.Alias
      ? checker.getAliasedSymbol(exported)
      : exported;
  const dec = s.valueDeclaration;
  if (!dec || !ts.isFunctionDeclaration(dec) || !/^[A-Z]/.test(s.name))
    continue;
  const signature = checker.getTypeAtLocation(dec).getCallSignatures()[0];
  const param = signature?.parameters[0];
  if (!param) continue;
  const type = checker.getTypeOfSymbolAtLocation(param, dec);
  const defaults = {};
  const binding = dec.parameters[0]?.name;
  if (binding && ts.isObjectBindingPattern(binding))
    for (const e of binding.elements) {
      if (e.initializer)
        defaults[e.propertyName?.getText() ?? e.name.getText()] =
          e.initializer.getText();
    }
  out[s.name] = {
    source: dec.getSourceFile().fileName,
    props: type
      .getProperties()
      .filter((p) => !p.name.startsWith("aria-") && !p.name.startsWith("data-"))
      .map((p) => ({
        name: p.name,
        type: checker
          .typeToString(checker.getTypeOfSymbolAtLocation(p, dec))
          .slice(0, 220),
        required: !(p.flags & ts.SymbolFlags.Optional),
        default: defaults[p.name] ?? "",
        description: ts.displayPartsToString(
          p.getDocumentationComment(checker),
        ),
      }))
      .sort(
        (a, b) =>
          Number(b.required) - Number(a.required) ||
          a.name.localeCompare(b.name),
      ),
  };
}
writeFileSync("showcase/api.json", JSON.stringify(out, null, 2) + "\n");
console.log(`Generated API for ${Object.keys(out).length} components`);
