const navContainer = document.getElementById('nav');
if (navContainer) {
    const navHTML = `
     <nav>
            <ul>
                <li><a href="/index.html">主页</a></li>
                <li><a href="/contact.html">联系我</a></li>
                <li><a href="/about.html">关于我</a></li>
                <li><a href="/ann-his.html">公告历史</a></li>
                <li><a href="/fl.html">友链</a></li>
                <li><a href="/addfl.html">添加友链</a></li>
                <li><a href="http://chenwu.miniban.cn/">论坛</a></li>
            </ul>
        </nav>
    `;
    navContainer.innerHTML = navHTML;
} else {
    console.error('找不到用于放置导航栏的元素（id="nav"）');
}
