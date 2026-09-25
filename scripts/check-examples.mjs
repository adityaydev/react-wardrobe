import ts from "typescript";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
const examples = JSON.parse(readFileSync("showcase/examples.json", "utf8"));
const files = new Map(
  Object.entries(examples).map(([name, code]) => [
    resolve(`showcase/__examples__/${name}.tsx`),
    code,
  ]),
);
const configFile = ts.readConfigFile("tsconfig.json", ts.sys.readFile);
const config = ts.parseJsonConfigFileContent(configFile.config, ts.sys, ".");
const options = {
  ...config.options,
  paths: { "react-wardrobe": [resolve("src/index.ts")] },
};
const host = ts.createCompilerHost(options),
  original = host.getSourceFile.bind(host);
host.getSourceFile = (name, languageVersion, ...rest) =>
  files.has(name)
    ? ts.createSourceFile(
        name,
        files.get(name),
        languageVersion,
        true,
        ts.ScriptKind.TSX,
      )
    : original(name, languageVersion, ...rest);
const program = ts.createProgram([...files.keys()], options, host);
const errors = ts.getPreEmitDiagnostics(program);
if (errors.length) {
  console.error(
    ts.formatDiagnosticsWithColorAndContext(errors, {
      getCanonicalFileName: (n) => n,
      getCurrentDirectory: () => process.cwd(),
      getNewLine: () => "\n",
    }),
  );
  process.exitCode = 1;
} else console.log(`All ${files.size} published usage examples type-check.`);
