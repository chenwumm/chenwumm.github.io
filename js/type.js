        function typeWithCursor(elementId, texts, options = {}) {
            // 默认配置
            const config = {
                typingSpeed: 100,    // 打字速度(ms)
                deletingSpeed: 50,   // 删除速度(ms)
                pauseBetween: 1000,  // 打字完成后暂停时间(ms)
                cursorChar: '|',     // 光标字符
                cursorBlinkSpeed: 500 // 光标闪烁速度(ms)
            };
            
            // 合并用户配置
            Object.assign(config, options);
            
            const element = document.getElementById(elementId);
            let currentIndex = 0;
            let isDeleting = false;
            let currentText = '';
            let cursorVisible = true;
            let timer;
            
            // 光标闪烁效果
            function blinkCursor() {
                cursorVisible = !cursorVisible;
                updateDisplay();
                timer = setTimeout(blinkCursor, config.cursorBlinkSpeed);
            }
            
            // 更新显示内容
            function updateDisplay() {
                let displayText = currentText;
                if (cursorVisible) {
                    displayText += config.cursorChar;
                }
                element.textContent = displayText;
            }
            
            function type() {
                const fullText = texts[currentIndex];
                
                if (isDeleting) {
                    // 删除模式
                    currentText = fullText.substring(0, currentText.length - 1);
                } else {
                    // 打字模式
                    currentText = fullText.substring(0, currentText.length + 1);
                }
                
                updateDisplay();
                
                let speed = config.typingSpeed;
                
                if (isDeleting) {
                    speed = config.deletingSpeed;
                }
                
                if (!isDeleting && currentText === fullText) {
                    // 完成打字，开始删除
                    speed = config.pauseBetween;
                    isDeleting = true;
                } else if (isDeleting && currentText === '') {
                    // 完成删除，切换到下一个文本
                    isDeleting = false;
                    currentIndex = (currentIndex + 1) % texts.length;
                    speed = 500;
                }
                
                // 清除之前的光标闪烁定时器
                clearTimeout(timer);
                
                // 如果不是暂停状态，则启动光标闪烁
                if (speed !== config.pauseBetween) {
                    timer = setTimeout(blinkCursor, config.cursorBlinkSpeed);
                }
                
                // 设置下一次打字/删除
                timer = setTimeout(type, speed);
            }
            
            // 开始动画
            type();
            
            // 返回停止函数
            return function() {
                clearTimeout(timer);
            };
        }
        
        // 使用示例
        const texts = [
            "雾曰",
            "晨雾㐅是只屑的博客",
            "一枚小学生的博客",
        ];
        
        const stopTyping = typeWithCursor('typing', texts, {
            typingSpeed: 150,
            deletingSpeed: 75,
            cursorChar: ' |' // 可以自定义光标字符
        });
        
        // 如果需要停止效果，可以调用 stopTyping()