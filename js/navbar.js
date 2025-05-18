const navContainer = document.getElementById('nav');
if (navContainer) {
    const navHTML = `
     <nav>
            <ul>
                <li><a href="/">主页</a></li>
                <li><a href="/nav/contact.html">联系我</a></li>
                <li><a href="/nav/about.html">关于我</a></li>
                <li><a href="/nav/ann-his.html">公告历史</a></li>
                <li><a href="/nav/fl.html">友链</a></li>
                <li><a href="/nav/addfl.html">添加友链</a></li>
                <li><a href="http://chenwu.miniban.cn/">社区</a></li>
                <li><a href="/doc">文档</a></li>
            </ul>
        </nav>
    `;
    navContainer.innerHTML = navHTML;
} else {
    console.error('找不到用于放置导航栏的元素（id="nav"）');
}
