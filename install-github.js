#!/usr/bin/env node
/**
 * GitHub Install Script for Recursion MCP V2
 * 
 * This script:
 * 1. Clones the repo from GitHub (if not already present)
 * 2. Installs dependencies
 * 3. Builds the TypeScript
 * 4. Auto-configures MCP for detected IDEs
 * 
 * Usage:
 *   curl -fsSL https://raw.githubusercontent.com/netflypsb/recursion-npx-v2/main/install-github.js | node
 *   # or
 *   node install-github.js
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const isWindows = os.platform() === 'win32';
const REPO_URL = 'https://github.com/netflypsb/recursion-npx-v2.git';
const DEFAULT_INSTALL_DIR = path.join(os.homedir(), '.local', 'share', 'recursion-mcp-v2');

console.log('🔧 Recursion MCP V2 - GitHub Installer\n');

// Get install directory from env or use default
const INSTALL_DIR = process.env.INSTALL_DIR || DEFAULT_INSTALL_DIR;

// Helper to run commands
function run(cmd, cwd = null) {
  console.log(`  $ ${cmd}`);
  return execSync(cmd, { cwd, stdio: 'inherit' });
}

// Step 1: Clone repository
function cloneRepo() {
  console.log('\n📦 Step 1: Cloning repository...');
  
  if (fs.existsSync(INSTALL_DIR)) {
    console.log(`   Directory exists at ${INSTALL_DIR}`);
    console.log('   Pulling latest changes...');
    run('git pull', INSTALL_DIR);
  } else {
    console.log(`   Cloning to ${INSTALL_DIR}...`);
    fs.mkdirSync(path.dirname(INSTALL_DIR), { recursive: true });
    run(`git clone "${REPO_URL}" "${INSTALL_DIR}"`);
  }
}

// Step 2: Install dependencies
function installDeps() {
  console.log('\n📦 Step 2: Installing dependencies...');
  run('npm install', INSTALL_DIR);
}

// Step 3: Build TypeScript
function build() {
  console.log('\n🔨 Step 3: Building TypeScript...');
  run('npm run build', INSTALL_DIR);
}

// Step 4: Auto-configure MCP
function configureMCP() {
  console.log('\n⚙️  Step 4: Configuring MCP for detected IDEs...\n');
  
  const cliPath = path.join(INSTALL_DIR, 'dist', 'cli-v2.js');
  
  if (!fs.existsSync(cliPath)) {
    console.error('❌ Build output not found at:', cliPath);
    process.exit(1);
  }
  
  const mcpConfig = {
    mcpServers: {
      'recursion-v2': {
        command: 'node',
        args: [cliPath]
      }
    }
  };
  
  // Setup Windsurf
  setupWindsurf(mcpConfig);
  
  // Setup Claude Desktop
  setupClaudeDesktop(cliPath);
  
  // Setup Cursor
  setupCursor(mcpConfig);
  
  // Setup VSCode
  setupVSCode(cliPath);
}

function setupWindsurf(config) {
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

    const newConfig = {
      mcpServers: {
        ...existingConfig.mcpServers,
        ...config.mcpServers
      }
    };
    
    fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2));
    console.log('✅ Windsurf MCP configured');
    console.log(`   Config: ${configPath}`);
  } catch (error) {
    console.log(`❌ Windsurf setup failed: ${error.message}`);
  }
}

function setupClaudeDesktop(cliPath) {
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

    const claudeConfig = {
      ...existingConfig,
      mcpServers: {
        ...(existingConfig.mcpServers || {}),
        'recursion-v2': {
          command: 'node',
          args: [cliPath]
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

function setupCursor(config) {
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

    const newConfig = {
      mcpServers: {
        ...existingConfig.mcpServers,
        ...config.mcpServers
      }
    };
    
    fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2));
    console.log('✅ Cursor MCP configured');
    console.log(`   Config: ${configPath}`);
  } catch (error) {
    console.log(`❌ Cursor setup failed: ${error.message}`);
  }
}

function setupVSCode(cliPath) {
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

    const vscodeConfig = {
      ...existingConfig,
      'mcp.servers': {
        ...(existingConfig['mcp.servers'] || {}),
        'recursion-v2': {
          type: 'stdio',
          command: 'node',
          args: [cliPath]
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

// Main
async function main() {
  try {
    cloneRepo();
    installDeps();
    build();
    configureMCP();
    
    console.log('\n🎉 Installation complete!');
    console.log(`\n📁 Installed to: ${INSTALL_DIR}`);
    console.log('\n📝 Next steps:');
    console.log('   1. Restart your IDE if it was running');
    console.log('   2. Check the MCP/tools panel in your IDE');
    console.log('   3. Available tools: ingest_document_v2, get_document_structure, read_section, etc.');
    console.log('\n🗑️  To uninstall: just delete the folder and remove the MCP config entries');
    console.log(`   rm -rf "${INSTALL_DIR}"`);
    
  } catch (error) {
    console.error('\n❌ Installation failed:', error.message);
    process.exit(1);
  }
}

main();
