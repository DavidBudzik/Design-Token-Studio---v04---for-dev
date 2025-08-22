#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Token Generator App Development Servers...\n');

// Start backend server
const backendProcess = spawn('npm', ['run', 'dev:server'], {
  stdio: ['pipe', 'pipe', 'pipe'],
  shell: true,
  cwd: process.cwd()
});

// Start frontend server
const frontendProcess = spawn('npm', ['run', 'dev:client'], {
  stdio: ['pipe', 'pipe', 'pipe'],
  shell: true,
  cwd: process.cwd()
});

// Handle backend output
backendProcess.stdout.on('data', (data) => {
  console.log(`🔧 [Backend] ${data.toString().trim()}`);
});

backendProcess.stderr.on('data', (data) => {
  console.error(`❌ [Backend Error] ${data.toString().trim()}`);
});

// Handle frontend output
frontendProcess.stdout.on('data', (data) => {
  console.log(`🎨 [Frontend] ${data.toString().trim()}`);
});

frontendProcess.stderr.on('data', (data) => {
  console.error(`❌ [Frontend Error] ${data.toString().trim()}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down development servers...');
  backendProcess.kill('SIGINT');
  frontendProcess.kill('SIGINT');
  process.exit(0);
});

backendProcess.on('close', (code) => {
  console.log(`🔧 Backend process exited with code ${code}`);
  if (code !== 0) {
    frontendProcess.kill('SIGINT');
  }
});

frontendProcess.on('close', (code) => {
  console.log(`🎨 Frontend process exited with code ${code}`);
  if (code !== 0) {
    backendProcess.kill('SIGINT');
  }
});

console.log('📝 Development servers starting...');
console.log('🎨 Frontend will be available at: http://localhost:5173');
console.log('🔧 Backend API will be available at: http://localhost:3001');
console.log('📖 API Documentation: http://localhost:3001/health');
console.log('\n💡 Press Ctrl+C to stop both servers\n');