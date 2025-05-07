const startDate = new Date('2024-02-25T05:22:35');
    function updateRunningTime() {
      const now = new Date();
      const diff = now - startDate;

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      const remainingDiff = diff % (1000 * 60 * 60 * 24 * 365);
      const months = Math.floor(remainingDiff / (1000 * 60 * 60 * 24 * 30));
      const remainingAfterMonths = remainingDiff % (1000 * 60 * 60 * 24 * 30);
      const days = Math.floor(remainingAfterMonths / (1000 * 60 * 60 * 24));
      const remainingAfterDays = remainingAfterMonths % (1000 * 60 * 60 * 24);
      const hours = Math.floor(remainingAfterDays / (1000 * 60 * 60));
      const remainingAfterHours = remainingAfterDays % (1000 * 60 * 60);
      const minutes = Math.floor(remainingAfterHours / (1000 * 60));
      const seconds = Math.floor(remainingAfterHours % (1000 * 60) / 1000);

      const runningTimeElement = document.getElementById('running-time');
      runningTimeElement.innerHTML = `破站已运行 ${years} 年 ${months} 月 ${days} 天 ${hours} 时 ${minutes} 分 ${seconds} 秒`;
    }

    // 初始显示
    updateRunningTime();
    // 每隔 1 秒更新一次显示
    setInterval(updateRunningTime, 1000);