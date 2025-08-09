const navContainer = document.getElementById('nav');
if (navContainer) {
    const navHTML = `
<nav><pre>
<a href="/">主页</a> <a href="https://chenwuszx.github.io/">分站</a> <a href="/nav/contact.html">联系</a> <a href="/nav/about.html">关于</a> <a href="/nav/ann-his.html">公告历史</a> <a href="/nav/fl.html">友链</a> <a href="/nav/addfl.html">添加友链</a> <a href="http://chenwu.miniban.cn/">社区</a> <a href="/scratch">猫舍</a> <a href="/nav/chat.html">聊天室</a> <a href="/nav/coll.html">收藏</a>
</pre></nav>
    `;
    navContainer.innerHTML = navHTML;
} else {
    console.error('找不到用于放置导航栏的元素（id="nav"）');
}
