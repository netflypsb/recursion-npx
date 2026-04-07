# Recursion MCP V2

[![npm version](https://img.shields.io/npm/v/recursion-mcp-v2)](https://www.npmjs.com/package/recursion-mcp-v2)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## What It Does

Recursion MCP V2 is a **document analysis server** that enables AI agents to perform **complete, systematic analysis** of documents. Unlike traditional RAG systems that miss content through chunking, this server converts documents to structured markdown and lets AI agents navigate hierarchically through any section, chapter, or line range.

## How It Works

1. **Document Ingestion**: Converts PDF, DOCX, XLSX, TXT, MD files to structured markdown with hierarchical navigation
2. **Structure Extraction**: Automatically identifies chapters, sections, and subsections
3. **Agent Navigation**: AI agents can read any specific section, search for content, and save analysis results
4. **Persistent Storage**: All analyses are saved incrementally for building complete document understanding

## Use Cases

- **Complete Book Reviews**: Systematic chapter-by-chapter analysis
- **Legal Document Analysis**: Thorough contract and policy review
- **Research Paper Processing**: Deep analysis of academic papers
- **Technical Documentation Review**: Comprehensive API and manual analysis
- **Business Document Processing**: Complete analysis of reports and proposals
- **Code Documentation Analysis**: Systematic review of code documentation

**Key Advantage**: Works completely offline with no external APIs - perfect for sensitive documents and secure environments.

---

An NPX-installable MCP (Model Context Protocol) server for **navigation-enabled recursive document analysis**. Works entirely offline with no external APIs required.

## Features

- **No External APIs**: Pure file-system based, works completely offline
- **Complete Document Analysis**: No missed content like brittle RAG chunking
- **Hierarchical Navigation**: Read any section, any line range
- **Persistent Analysis**: Save and retrieve agent-generated insights
- **Markdown Conversion**: PDF/DOCX → structured markdown
- **Recursive Reading**: Agent-controlled systematic analysis

## Quick Start

**NPM Package:** [recursion-mcp-v2](https://www.npmjs.com/package/recursion-mcp-v2)

```bash
# Run via NPX (no install needed)
npx recursion-mcp-v2

# Or install globally
npm install -g recursion-mcp-v2

# Run V2
recursion-mcp-v2
```

## Install from GitHub (Local Clone)

For users who prefer to install directly from GitHub or want to modify the source:

### One-Line Auto-Install (Recommended for GitHub)

Copy and paste this entire block to your AI agent - it handles everything:

```bash
# Clone, build, and auto-configure Recursion MCP V2
curl -fsSL https://raw.githubusercontent.com/netflypsb/recursion-npx-v2/main/install-github.js | node
```

Or download and run manually:

```bash
# Download the install script
curl -fsSL -o install-github.js https://raw.githubusercontent.com/netflypsb/recursion-npx-v2/main/install-github.js
node install-github.js
```

**What this does:**
1. Clones the repo to `~/.local/share/recursion-mcp-v2`
2. Installs npm dependencies
3. Builds the TypeScript
4. Auto-detects your IDE (Windsurf, Claude, Cursor, VSCode) and configures MCP

**Windows PowerShell:**
```powershell
# Download and run
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/netflypsb/recursion-npx-v2/main/install-github.js" -OutFile "install-github.js"
node install-github.js
```

### Manual One-Liner Script

If you prefer manual control over each step:

```bash
# Clone and install Recursion MCP V2 from GitHub
REPO_URL="https://github.com/netflypsb/recursion-npx-v2.git" \
INSTALL_DIR="$HOME/.local/share/recursion-mcp-v2" \
&& rm -rf "$INSTALL_DIR" \
&& git clone "$REPO_URL" "$INSTALL_DIR" \
&& cd "$INSTALL_DIR" \
&& npm install \
&& npm run build \
&& echo "✅ Recursion MCP V2 installed to $INSTALL_DIR"
```

Then add to your MCP config:

**Windsurf:** `~/.codeium/windsurf/mcp_config.json`
**Claude Desktop:** `~/AppData/Roaming/Claude/settings.json` (Windows) or `~/Library/Application Support/Claude/settings.json` (Mac)
**Cursor:** `~/.cursor/mcp.json` (Mac) or `~/AppData/Roaming/Cursor/mcp.json` (Windows)

```json
{
  "mcpServers": {
    "recursion-v2": {
      "command": "node",
      "args": ["C:/Users/YOUR_USERNAME/.local/share/recursion-mcp-v2/dist/cli-v2.js"]
    }
  }
}
```

**Windows users:** Replace `$HOME` with your user path and forward slashes with backslashes in the config.

### Manual GitHub Install Steps

```bash
# 1. Clone the repository
git clone https://github.com/netflypsb/recursion-npx-v2.git recursion-mcp-v2
cd recursion-mcp-v2

# 2. Install dependencies
npm install

# 3. Build the TypeScript
npm run build

# 4. Get the absolute path to the built CLI
node -e "console.log(require('path').resolve('dist/cli-v2.js'))"
```

Then manually add the output path to your IDE's MCP configuration.

### Package Management

```bash
# Install globally
npm install -g recursion-mcp-v2

# Uninstall globally
npm uninstall -g recursion-mcp-v2

# Check if installed globally
npm list -g recursion-mcp-v2

# Check local project installation
npm list recursion-mcp-v2

# View package info (version, dependencies, etc.)
npm info recursion-mcp-v2

# View latest version available
npm view recursion-mcp-v2 version

# Update to latest version
npm update -g recursion-mcp-v2

# Check for outdated packages
npm outdated -g recursion-mcp-v2
```

### MCP Configuration Cleanup

After uninstalling, remove the MCP server entry from your IDE config:

**Windsurf:** `~/.codeium/windsurf/mcp_config.json`  
**Claude Desktop:** `~/AppData/Roaming/Claude/config.json`  
**Cursor:** `~/.cursor/mcp.json`

Remove the `recursion-v2` entry under `mcpServers`.

## Installation Verification

After installation, verify it's working:

```bash
# Check if package is installed
npm view recursion-mcp-v2 version

# Test V2 server
npx recursion-mcp-v2 --help
recursion-mcp-v2 --help
```

## Manual MCP Configuration

If automatic IDE configuration doesn't work, copy this prompt for your AI assistant:

> **Please add the Recursion V2 MCP server to my IDE's MCP configuration file.**
> 
> **For Windsurf:** Add this to `~/.codeium/windsurf/mcp_config.json`:
> ```json
> {
>   "mcpServers": {
>     "recursion-v2": {
>       "command": "npx",
>       "args": ["recursion-mcp-v2"]
>     }
>   }
> }
> ```

Or with absolute paths for global install:
> ```json
> {
>   "mcpServers": {
>     "recursion-v2": {
>       "command": "node",
>       "args": ["C:/Users/YOUR_USERNAME/AppData/Roaming/npm/node_modules/recursion-mcp-v2/dist/cli-v2.js"]
>     }
>   }
> }
> ```

## Installation

### Via NPX (recommended)

```bash
npx recursion-mcp-v2
```

### Global Install

```bash
npm install -g recursion-mcp-v2

# Run V2
recursion-mcp-v2
```

### Automatic IDE Configuration

When you install globally, the package automatically configures MCP for detected IDEs:

| IDE | Auto-Configured |
|-----|----------------|
| **Windsurf** | ✅ Yes |
| **Claude Desktop** | ✅ Yes |
| **Cursor** | ✅ Yes |
| **VSCode** | ✅ Yes (with MCP extension) |

**Restart your IDE** after installation to see the MCP tools.

### Manual Setup (if auto-config fails)

```bash
# Run setup manually
npm run setup --prefix $(npm root -g)/recursion-mcp-v2
```

Or manually add to your IDE's MCP settings (see MCP Configuration section above).

### Prerequisites

- Node.js 18+ only (no other dependencies!)

## MCP Configuration

### V2 Configuration (Navigation)

```json
{
  "mcpServers": {
    "recursion-v2": {
      "command": "npx",
      "args": ["recursion-mcp-v2"]
    }
  }
}
```

## Available Tools

### `ingest_document_v2`
Convert and store document with navigable structure.

```json
{
  "filePath": "/path/to/document.pdf",
  "title": "Optional Title"
}
```

### `get_document_structure`
Get hierarchical outline (chapters, sections, subsections).

```json
{
  "docId": "document-id",
  "depth": 2
}
```

### `read_section`
Read a specific section by ID.

```json
{
  "docId": "document-id",
  "sectionId": "section-id",
  "maxLines": 100
}
```

### `search_document`
Search for text with context lines.

```json
{
  "docId": "document-id",
  "query": "search term",
  "contextLines": 3
}
```

### `save_analysis` / `get_analysis`
Save and retrieve agent-generated analysis.

```json
{
  "docId": "document-id",
  "sectionId": "full",
  "analysisType": "summary",
  "content": "Analysis text..."
}
```

## Agent Analysis Pattern

```typescript
// 1. Ingest document
const docId = await ingest_document_v2({
  filePath: "/path/to/book.pdf"
});

// 2. Get structure
const structure = await get_document_structure({ docId });

// 3. Systematic analysis
for (const chapter of structure.sections) {
  const content = await read_section({ docId, sectionId: chapter.id });
  const analysis = agentAnalyze(content);
  await save_analysis({ docId, sectionId: chapter.id, analysisType: "summary", content: analysis });
}

// 4. Synthesize complete understanding
const fullAnalysis = await get_analysis({ docId, sectionId: "full", analysisType: "complete" });
```

## Storage

Documents are stored at `~/.kw-os/v2/documents/{doc-id}/`:
- `document.md` - Full markdown
- `structure.json` - Hierarchical outline
- `analysis/` - Saved analyses

## Architecture

- **File System Storage**: Markdown + JSON structure
- **Hierarchical Navigation**: Section-level granularity
- **Agent-Driven**: AI controls reading, no brittle retrieval
- **Analysis Persistence**: Incremental understanding building
- **Zero Dependencies**: Only requires Node.js 18+

## Documentation

- [V2 Implementation Plan](version2/V2-Implementation-Plan.md)
- [V2 Summary](version2/V2-Summary.md)

## License

MIT © netflypsb

## Links

- [GitHub Repository](https://github.com/netflypsb/recursion-npx-v2)
- [NPM Package](https://www.npmjs.com/package/recursion-mcp-v2)
- [Issues](https://github.com/netflypsb/recursion-npx-v2/issues)

