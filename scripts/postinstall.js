#!/usr/bin/env node
/**
 * Post-install script to automatically configure MCP for common IDEs
 * Runs after npm install -g recursion-mcp
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const isWindows = os.platform() === 'win32';

// Detect package installation path
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const cliPath = path.join(__dirname, '..', 'dist', 'cli.js');
const cliV2Path = path.join(__dirname, '..', 'dist', 'cli-v2.js');

console.log('🔧 Recursion MCP Post-Install Setup\n');

// Check if running as global install
const isGlobalInstall = !__dirname.includes('node_modules') || process.env.NODE_ENV === 'production';

if (!isGlobalInstall) {
  console.log('ℹ️  Local install detected - skipping global MCP configuration');
  console.log('   Run "npm install -g recursion-mcp" to enable auto-configuration\n');
  process.exit(0);
}

console.log('📦 Global install detected - configuring MCP servers...\n');

// Configuration templates
const v1Config = {
  mcpServers: {
    recursion: {
      command: 'node',
      args: [cliPath]
    }
  }
};

const v2Config = {
  mcpServers: {
    'recursion-v2': {
      command: 'node',
      args: [cliV2Path]
    }
  }
};

const combinedConfig = {
  mcpServers: {
    ...v1Config.mcpServers,
    ...v2Config.mcpServers
  }
};

// Helper to merge configs
function mergeConfig(existing, newConfig) {
  return {
    mcpServers: {
      ...existing.mcpServers,
      ...newConfig.mcpServers
    }
  };
}

// Setup Windsurf
function setupWindsurf() {
  try {
    const windsurfDir = path.join(os.homedir(), '.codeium', 'windsurf');
    const configPath = path.join(windsurfDir, 'mcp_config.json');
    
    if (!fs.existsSync(windsurfDir)) {
      console.log('ℹ️  Windsurf not detected - skipping');
      return;
    }

    let existingConfig = { mcpServers: {} };
    if (fs.existsSync(configPath)) {
      existingConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    }

    const newConfig = mergeConfig(existingConfig, combinedConfig);
    fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2));
    console.log('✅ Windsurf MCP configured');
    console.log(`   Config: ${configPath}`);
  } catch (error) {
    console.log(`❌ Windsurf setup failed: ${error.message}`);
  }
}

// Setup Claude Desktop
function setupClaudeDesktop() {
  try {
    const configDir = isWindows 
      ? path.join(os.homedir(), 'AppData', 'Roaming', 'Claude')
      : path.join(os.homedir(), 'Library', 'Application Support', 'Claude');
    
    const configPath = path.join(configDir, 'settings.json');
    
    if (!fs.existsSync(configDir)) {
      console.log('ℹ️  Claude Desktop not detected - skipping');
      return;
    }

    let existingConfig = {};
    if (fs.existsSync(configPath)) {
      existingConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    }

    // Claude uses a different format
    const claudeConfig = {
      ...existingConfig,
      mcpServers: {
        ...(existingConfig.mcpServers || {}),
        recursion: {
          command: 'node',
          args: [cliPath]
        },
        'recursion-v2': {
          command: 'node',
          args: [cliV2Path]
        }
      }
    };

    fs.writeFileSync(configPath, JSON.stringify(claudeConfig, null, 2));
    console.log('✅ Claude Desktop MCP configured');
    console.log(`   Config: ${configPath}`);
  } catch (error) {
    console.log(`❌ Claude Desktop setup failed: ${error.message}`);
  }
}

// Setup Cursor
function setupCursor() {
  try {
    const cursorDir = isWindows
      ? path.join(os.homedir(), 'AppData', 'Roaming', 'Cursor')
      : path.join(os.homedir(), '.cursor');
    
    const configPath = path.join(cursorDir, 'mcp.json');
    
    if (!fs.existsSync(cursorDir)) {
      console.log('ℹ️  Cursor not detected - skipping');
      return;
    }

    let existingConfig = { mcpServers: {} };
    if (fs.existsSync(configPath)) {
      existingConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    }

    const newConfig = mergeConfig(existingConfig, combinedConfig);
    fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2));
    console.log('✅ Cursor MCP configured');
    console.log(`   Config: ${configPath}`);
  } catch (error) {
    console.log(`❌ Cursor setup failed: ${error.message}`);
  }
}

// Setup VSCode with MCP extension
function setupVSCode() {
  try {
    const vscodeDir = isWindows
      ? path.join(os.homedir(), 'AppData', 'Roaming', 'Code', 'User')
      : path.join(os.homedir(), '.vscode');
    
    const configPath = path.join(vscodeDir, 'settings.json');
    
    if (!fs.existsSync(vscodeDir)) {
      console.log('ℹ️  VSCode not detected - skipping');
      return;
    }

    let existingConfig = {};
    if (fs.existsSync(configPath)) {
      existingConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    }

    // VSCode MCP extension format
    const vscodeConfig = {
      ...existingConfig,
      'mcp.servers': {
        ...(existingConfig['mcp.servers'] || {}),
        recursion: {
          type: 'stdio',
          command: 'node',
          args: [cliPath]
        },
        'recursion-v2': {
          type: 'stdio',
          command: 'node',
          args: [cliV2Path]
        }
      }
    };

    fs.writeFileSync(configPath, JSON.stringify(vscodeConfig, null, 2));
    console.log('✅ VSCode MCP configured');
    console.log(`   Config: ${configPath}`);
    console.log('   Note: Requires MCP extension for VSCode');
  } catch (error) {
    console.log(`❌ VSCode setup failed: ${error.message}`);
  }
}

// Main setup
console.log('Configuring MCP for detected IDEs...\n');

setupWindsurf();
setupClaudeDesktop();
setupCursor();
setupVSCode();

console.log('\n🎉 MCP configuration complete!');
console.log('\nNext steps:');
console.log('1. Restart your IDE if it was running');
console.log('2. Check the MCP/tools panel in your IDE');
console.log('3. Available tools: ingest_document, ask_documents, rlm_analyze, ingest_document_v2, etc.\n');
console.log('To manually configure, see README.md');
