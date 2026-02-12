#!/usr/bin/env node
/**
 * mdBook 内容加密脚本
 * 对构建后的 HTML 文件进行 AES-GCM 加密
 * 
 * 使用: node encrypt.js <password> [book-dir]
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BOOK_DIR = process.argv[3] || './book';
const PASSWORD = process.argv[2];

if (!PASSWORD) {
    console.error('Usage: node encrypt.js <password> [book-dir]');
    console.error('Example: node encrypt.js mysecretpassword ./book');
    process.exit(1);
}

function deriveKey(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
}

function encryptContent(content, password) {
    const salt = crypto.randomBytes(16);
    const iv = crypto.randomBytes(12);
    const key = deriveKey(password, salt);
    
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const encrypted = Buffer.concat([cipher.update(content, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();
    
    return Buffer.concat([salt, iv, encrypted, authTag]).toString('base64');
}

function processHtmlFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes('data-encrypted=')) {
        return;
    }
    
    const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (!bodyMatch) return;
    
    const bodyContent = bodyMatch[1];
    
    if (bodyContent.trim().length < 100) return;
    
    const encryptedData = encryptContent(bodyContent, PASSWORD);
    
    const newContent = content.replace(
        /<html([^>]*)>/i,
        `<html$1 data-encrypted="${encryptedData}">`
    ).replace(
        /<body[^>]*>([\s\S]*?)<\/body>/i,
        '<body class="content-hidden"></body>'
    );
    
    fs.writeFileSync(filePath, newContent);
    console.log(`Encrypted: ${filePath}`);
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            walkDir(filePath);
        } else if (file.endsWith('.html')) {
            processHtmlFile(filePath);
        }
    }
}

console.log(`Encrypting book in: ${BOOK_DIR}`);
console.log(`Password length: ${PASSWORD.length} characters`);
walkDir(BOOK_DIR);
console.log('Encryption complete!');
