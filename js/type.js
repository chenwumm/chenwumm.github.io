function typeWithCursor(elementId, texts, options = {}) {
    // 默认配置
    const config = {
        typingSpeed: 100,
        deletingSpeed: 50,
        pauseBetween: 1000,
        cursorChar: '|',
        cursorBlinkSpeed: 500,
        keepSpace: true // 新增：始终保留一个空格防止跳动
    };
    
    // 合并用户配置
    Object.assign(config, options);
    
    const element = document.getElementById(elementId);
    // 初始化容器，防止跳动
    element.style.display = 'inline-block';
    element.style.minWidth = '1px';
    element.style.whiteSpace = 'pre';
    
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
        
        // 当启用keepSpace且文本为空时，保留一个空格
        if (config.keepSpace && displayText === '') {
            displayText = ' ';
        }
        
        // 添加光标（如果可见）
        element.textContent = cursorVisible ? displayText + config.cursorChar : displayText;
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
    " 雾曰",
    " 晨雾㐅是只屑的博客",
    " 一枚学生党的博客",
];

const stopTyping = typeWithCursor('typing', texts, {
    typingSpeed: 150,
    deletingSpeed: 75,
    cursorChar: ' |',
    keepSpace: true // 确保开启这个选项
});