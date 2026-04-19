import { Project, QuoteKind, Node, SyntaxKind } from 'ts-morph';
import * as fs from 'node:fs';
import * as path from 'node:path';

const name = process.argv[2];

if (!name) {
  console.error('❌ Provide route name');
  process.exit(1);
}

const project = new Project({
  tsConfigFilePath: 'tsconfig.json',
  manipulationSettings: {
    quoteKind: QuoteKind.Single,
  },
});

const routerDir = path.resolve('src/router');
const routeDir = path.join(routerDir, name);
const filePath = path.join(routeDir, 'index.ts');

fs.mkdirSync(routeDir, { recursive: true });

// --------------------
// 1. SIMPLE ROUTE FILE
// --------------------
const routeContent = `
import { trpcBackend } from '@backend/lib/trpc';

export const ${name}TrpcRoute = trpcBackend.procedure.query(() => {
  return {};
});
`;

fs.writeFileSync(filePath, routeContent.trim());

// --------------------
// 2. UPDATE router/index.ts
// --------------------
const routerFile = project.addSourceFileAtPath(path.join(routerDir, 'index.ts'));

// import
routerFile.addImportDeclaration({
  moduleSpecifier: `./${name}`,
  namedImports: [`${name}TrpcRoute`],
});

// find router object
const routerVar = routerFile.getVariableDeclaration('trpcRouter');

if (!routerVar) {
  throw new Error('trpcRouter not found');
}

const callExpr = routerVar.getInitializerIfKindOrThrow(SyntaxKind.CallExpression);

const obj = callExpr.getArguments()[0];

if (Node.isObjectLiteralExpression(obj)) {
  obj.addPropertyAssignment({
    name,
    initializer: `${name}TrpcRoute`,
  });
}

routerFile.saveSync();

console.log(`✅ Route ${name} created`);
