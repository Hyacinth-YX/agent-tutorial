/**
 * mdBook 前端解密脚本
 * 使用 Web Crypto API 进行 AES-GCM 解密
 */
(function() {
    'use strict';

    // 密码输入界面 HTML
    const LOCK_SCREEN = `
    <div id="lock-screen">
        <div class="lock-container">
            <div class="lock-icon">🔒</div>
            <h2>AI Agent 教程</h2>
            <p class="lock-hint">请输入密码以访问内容</p>
            <input type="password" id="password-input" placeholder="输入密码..." autocomplete="off">
            <button id="unlock-btn">解锁</button>
            <p id="error-msg" class="error-hidden">密码错误，请重试</p>
        </div>
    </div>
    <style>
        #lock-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
        }
        .lock-container {
            background: white;
            padding: 40px 50px;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            text-align: center;
            max-width: 400px;
            width: 90%;
        }
        .lock-icon {
            font-size: 48px;
            margin-bottom: 20px;
        }
        .lock-container h2 {
            margin: 0 0 10px 0;
            color: #333;
            font-size: 24px;
        }
        .lock-hint {
            color: #666;
            margin-bottom: 25px;
            font-size: 14px;
        }
        #password-input {
            width: 100%;
            padding: 12px 16px;
            font-size: 16px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            outline: none;
            box-sizing: border-box;
            transition: border-color 0.3s;
        }
        #password-input:focus {
            border-color: #667eea;
        }
        #unlock-btn {
            width: 100%;
            padding: 12px;
            margin-top: 15px;
            font-size: 16px;
            font-weight: 600;
            color: white;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        #unlock-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        }
        #unlock-btn:active {
            transform: translateY(0);
        }
        #error-msg {
            color: #e74c3c;
            font-size: 14px;
            margin-top: 15px;
            opacity: 0;
            transition: opacity 0.3s;
        }
        .error-visible {
            opacity: 1 !important;
        }
        .error-hidden {
            opacity: 0;
        }
        .content-hidden {
            display: none !important;
        }
    </style>
    `;

    // 从密码派生密钥 (PBKDF2)
    async function deriveKey(password, salt) {
        const encoder = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            encoder.encode(password),
            'PBKDF2',
            false,
            ['deriveBits', 'deriveKey']
        );
        
        return crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            false,
            ['decrypt']
        );
    }

    // 解密内容
    async function decryptContent(encryptedData, password) {
        try {
            // 解析加密数据: salt(16) + iv(12) + ciphertext
            const rawData = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
            const salt = rawData.slice(0, 16);
            const iv = rawData.slice(16, 28);
            const ciphertext = rawData.slice(28);

            const key = await deriveKey(password, salt);
            
            const decrypted = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv: iv },
                key,
                ciphertext
            );

            return new TextDecoder().decode(decrypted);
        } catch (e) {
            return null;
        }
    }

    // 显示锁定屏幕
    function showLockScreen() {
        // 隐藏原始内容
        document.body.classList.add('content-hidden');
        
        // 插入锁定屏幕
        document.body.insertAdjacentHTML('afterbegin', LOCK_SCREEN);

        const input = document.getElementById('password-input');
        const btn = document.getElementById('unlock-btn');
        const errorMsg = document.getElementById('error-msg');

        // 尝试解锁
        async function tryUnlock() {
            const password = input.value;
            const encryptedData = document.documentElement.getAttribute('data-encrypted');
            
            if (!encryptedData) {
                // 没有加密数据，直接显示内容
                hideLockScreen();
                return;
            }

            const decrypted = await decryptContent(encryptedData, password);
            
            if (decrypted) {
                // 解密成功，恢复内容
                document.body.innerHTML = decrypted;
                // 保存密码到 sessionStorage（当前会话有效）
                sessionStorage.setItem('mdbook_unlocked', 'true');
                sessionStorage.setItem('mdbook_password', password);
            } else {
                // 解密失败
                errorMsg.classList.remove('error-hidden');
                errorMsg.classList.add('error-visible');
                input.value = '';
                input.focus();
            }
        }

        btn.addEventListener('click', tryUnlock);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') tryUnlock();
            errorMsg.classList.remove('error-visible');
            errorMsg.classList.add('error-hidden');
        });
    }

    // 隐藏锁定屏幕
    function hideLockScreen() {
        const lockScreen = document.getElementById('lock-screen');
        if (lockScreen) lockScreen.remove();
        document.body.classList.remove('content-hidden');
    }

    // 检查是否已解锁
    function checkUnlocked() {
        if (sessionStorage.getItem('mdbook_unlocked') === 'true') {
            return true;
        }
        return false;
    }

    // 初始化
    function init() {
        const encryptedData = document.documentElement.getAttribute('data-encrypted');
        
        // 如果没有加密数据，不需要解锁
        if (!encryptedData) {
            return;
        }

        // 如果已经解锁，尝试恢复
        if (checkUnlocked()) {
            const password = sessionStorage.getItem('mdbook_password');
            decryptContent(encryptedData, password).then(decrypted => {
                if (decrypted) {
                    document.body.innerHTML = decrypted;
                } else {
                    sessionStorage.removeItem('mdbook_unlocked');
                    sessionStorage.removeItem('mdbook_password');
                    showLockScreen();
                }
            });
        } else {
            showLockScreen();
        }
    }

    // 页面加载后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
