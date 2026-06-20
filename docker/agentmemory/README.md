# agentmemory (Docker iii-engine + host worker)

Alternate ports so native `iii` on `:3111` can stay running.

## Start engine (Docker)

```bash
cd docker/agentmemory
docker compose up -d
```

- REST: `http://127.0.0.1:3120`
- Streams: `ws://127.0.0.1:3121`
- Engine WS: `ws://127.0.0.1:49135` (host maps container `49134`)

## Start agentmemory worker (host, required for viewer + `/agentmemory/*`)

Viewer is **not** in the iii image alone; run the CLI with `--no-engine`:

```bash
export PATH="/Applications/Cursor.app/Contents/Resources/app/resources/helpers:$PATH"
export III_ENGINE_URL=ws://127.0.0.1:49135
export AGENTMEMORY_URL=http://127.0.0.1:3120
export III_REST_PORT=3120
export III_STREAMS_PORT=3121
npx -y @agentmemory/agentmemory --no-engine
```

Viewer URL is printed at startup (default `REST+2`, e.g. `http://127.0.0.1:3122` or `3123` if busy).

## Cursor MCP (`~/.cursor/mcp.json`)

```json
"AGENTMEMORY_URL": "http://127.0.0.1:3120"
```

Restart MCP after changing.

## Stop

```bash
cd docker/agentmemory && docker compose down
pkill -f "@agentmemory/agentmemory --no-engine"
```
