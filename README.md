# Recursion MCP

[![npm version](https://img.shields.io/npm/v/recursion-mcp)](https://www.npmjs.com/package/recursion-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An NPX-installable MCP (Model Context Protocol) server for comprehensive document analysis with **two powerful approaches**:

- **V1**: RAG + RLM with local Ollama (retrieval-based Q&A and deep analysis)
- **V2**: Navigation-enabled recursive analysis (file-system based, no external APIs)

## Quick Start

```bash
# Run directly without installing
npx @recursion-mcp/npx

# Or install globally
npm install -g @recursion-mcp/npx
recursion-mcp
```

## Features

### V1: RAG + RLM (Local AI)
- **Document Ingestion**: PDF, DOCX, XLSX, TXT, MD support
- **Smart Chunking**: Overlapping chunks preserving structure
- **Local Embeddings**: Via Ollama (nomic-embed-text) for semantic search
- **SQLite + FTS5**: Zero-infrastructure storage
- **Local RAG**: Answer generation with Ollama (llama3, mistral, etc.)
- **RLM Engine**: Recursive Language Model for unlimited context via Python
- **Hybrid Search**: Vector + keyword with reciprocal rank fusion

### V2: Navigation Analysis (Agent-Driven)
- **No External APIs**: Pure file-system based, works offline
- **Complete Document Analysis**: No missed content like brittle RAG
- **Hierarchical Navigation**: Read any section, any line range
- **Persistent Analysis**: Save and retrieve agent-generated insights
- **Markdown Conversion**: PDF/DOCX → structured markdown
- **Recursive Reading**: Agent-controlled systematic analysis

## Installation

### Via NPX (recommended)

```bash
# Default: Run V1 (RAG/RLM)
npx recursion-mcp

# Run V2 (Navigation Analysis)
npx recursion-mcp recursion-mcp-v2
```

### Global Install

```bash
npm install -g recursion-mcp

# Run V1
recursion-mcp

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
npm run setup --prefix $(npm root -g)/recursion-mcp
```

Or manually add to your IDE's MCP settings (see MCP Configuration section below).

### Prerequisites

**For V1 (RAG/RLM):**
- Node.js 18+
- Ollama (for embeddings and LLM)
  ```bash
  ollama pull nomic-embed-text
  ollama pull llama3
  ```
- Python 3 (for RLM REPL)

**For V2 (Navigation):**
- Node.js 18+ only (no other dependencies!)

## MCP Configuration

### V1 Configuration (RAG/RLM)

```json
{
  "mcpServers": {
    "recursion": {
      "command": "npx",
      "args": ["recursion-mcp"]
    }
  }
}
```

### V2 Configuration (Navigation)

```json
{
  "mcpServers": {
    "recursion-v2": {
      "command": "npx",
      "args": ["recursion-mcp", "recursion-mcp-v2"]
    }
  }
}
```

## Which Version to Use?

| Use Case | Recommended |
|----------|-------------|
| Quick Q&A on documents | **V1** - RAG with Ollama |
| Deep analysis of large docs | **V2** - Navigation (complete coverage) |
| No internet/external APIs | **V2** - Pure file system |
| Code/math analysis | **V1** - RLM with Python REPL |
| Complete book review | **V2** - Systematic section analysis |

## V1 Tools (RAG/RLM)

### `ingest_document`
Ingest a document into the knowledge base.

```json
{
  "filePath": "/path/to/document.pdf",
  "title": "Optional Title"
}
```

### `search_documents`
Search across all ingested documents using hybrid search.

```json
{
  "query": "search query",
  "topK": 10,
  "docId": "optional-doc-id"
}
```

### `ask_documents`
Ask a question and get an answer using RAG with Ollama.

```json
{
  "question": "What is the main topic?",
  "topK": 5,
  "docId": "doc-id"
}
```

### `rlm_analyze`
Use Recursive Language Model for unlimited context analysis.

```json
{
  "query": "Analyze the contract terms",
  "docId": "doc-id",
  "maxDepth": 1,
  "maxIterations": 20
}
```

### `list_documents`
List all ingested documents.

### `delete_document`
Delete a document and all its data.

## V2 Tools (Navigation)

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

## V2 Agent Analysis Pattern

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

- **V1**: `~/.kw-os/documents.db` (SQLite with embeddings)
- **V2**: `~/.kw-os/v2/documents/{doc-id}/` (file system)
  - `document.md` - Full markdown
  - `structure.json` - Hierarchical outline
  - `analysis/` - Saved analyses

## Architecture

### V1: RAG + RLM
- **RAG**: Retrieval Augmented Generation with local Ollama
- **RLM**: Recursive Language Model via Python REPL for unlimited context
- **Hybrid Search**: Vector similarity + BM25 keyword search

### V2: Navigation Analysis
- **File System Storage**: Markdown + JSON structure
- **Hierarchical Navigation**: Section-level granularity
- **Agent-Driven**: AI controls reading, no brittle retrieval
- **Analysis Persistence**: Incremental understanding building

## Comparison

| Feature | V1 (RAG/RLM) | V2 (Navigation) |
|---------|--------------|-----------------|
| Coverage | Partial chunks | Complete document |
| Dependencies | Ollama, Python | Node.js only |
| Speed | Fast retrieval | Thorough analysis |
| Depth | Surface | Deep, recursive |
| Best For | Q&A | Complete reviews |
| External APIs | Required (Ollama) | None |

## Environment Variables

### V1 Only
- `OLLAMA_BASE_URL`: Ollama server (default: `http://localhost:11434`)
- `OLLAMA_MODEL`: Chat model for RAG (default: `llama3`)

## Documentation

- [V2 Implementation Plan](version2/V2-Implementation-Plan.md)
- [V2 Summary](version2/V2-Summary.md)
- [V2 README](version2/README.md)

## License

MIT © netflypsb

## Links

- [GitHub Repository](https://github.com/netflypsb/recursion-npx)
- [NPM Package](https://www.npmjs.com/package/recursion-mcp)
- [Issues](https://github.com/netflypsb/recursion-npx/issues)
