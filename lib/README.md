# lib
Lib holds all source files for `fax`. `index.js` acts as the entry point
for all the code. `fax` has `es6ify` specified in its package.json so we can
run generators in the browsers without a problem.

## Architecture
```
╔════╗         ╔═════════╗          ╔════════════╗         ╔═════╗
║ Go ║<────────║ Respond ║<─────────║ Middleware ║<────────║ XHR ║
╚════╝         ╚═════════╝          ╚════════════╝         ╚═════╝
  │                ^ │     ╔═══════╗     ^ │     ╔═══════╗    ^
  └────────────────┘ └────>║ Yield ║─────┘ └────>║ Yield ║────┘
                           ╚═══════╝             ╚═══════╝
```

Within `fax` all calls are initiated by calling `.go` which then
starts the propagation of data through the middleware stack. Unless
returned early all requests have their turning point at `xhr` which
issues requests to the server. There are helper methods available
within `ctx` to ease the transfer of data between chained middleware.
