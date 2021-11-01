## stackoverflow-parcel-preact

This repo demonstrates a bug with parcel 2.0.0 where it will fail to compile if you include a JSX pragma line in your file, e.g.:
```
/** @jsx h */
```
Running `parcel build` on such a file will produce this error:
```
$ parcel build src/index.tsx
⠹ Building index.tsx...
thread '<unnamed>' panicked at 'cannot access a scoped thread local variable without calling `set` first', /Users/runner/.cargo/registry/src/github.com-1ecc6299db9ec823/scoped-tls-1.0.0/src/lib.rs:168:9
🚨 Build failed.

@parcel/transformer-js: cannot access a scoped thread local variable without calling `set` first

  Error: cannot access a scoped thread local variable without calling `set` first
  at Object.transform (/Users/Andrew/Projects/stackoverflow-parcel-preact/node_modules/@parcel/transformer-js/lib/JSTransformer.js:365:31)
  at processTicksAndRejections (internal/process/task_queues.js:95:5)
  at async Transformation.runTransformer (/Users/Andrew/Projects/stackoverflow-parcel-preact/node_modules/@parcel/core/lib/Transformation.js:617:5)
  at async Transformation.runPipeline (/Users/Andrew/Projects/stackoverflow-parcel-preact/node_modules/@parcel/core/lib/Transformation.js:366:36)
  at async Transformation.runPipelines (/Users/Andrew/Projects/stackoverflow-parcel-preact/node_modules/@parcel/core/lib/Transformation.js:244:40)
  at async Transformation.run (/Users/Andrew/Projects/stackoverflow-parcel-preact/node_modules/@parcel/core/lib/Transformation.js:170:19)
  at async Child.handleRequest (/Users/Andrew/Projects/stackoverflow-parcel-preact/node_modules/@parcel/workers/lib/child.js:217:9)
```
If you remove the pragma, it will compile fine.

The issue was [reported on stackoverflow](https://stackoverflow.com/questions/69797352/building-error-at-parcel-transformer-js-cannot-access-a-scoped-thread-local-va), but was also noticed in [a comment related github issue](https://github.com/parcel-bundler/parcel/issues/6605#issuecomment-907637695).