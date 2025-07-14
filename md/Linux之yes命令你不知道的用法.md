---
title: Linux之yes命令你不知道的用法
---

很多人可能没听说过`yes`这个命令。当你执行这个命令的时候，终端就会不断输出`y`，直到你手动终止(Ctrl+C):
```
~$ yes
y
y
y
y
y
...
```
它的用法是:
```
~$ yes --help
用法：
yes [STRING]...
或：
yes OPTION

描述：
重复输出一行，包含所有指定的字符串，或者默认输出 'y'。

选项：


--help：显示此帮助信息并退出。
--version：输出版本信息并退出。

更多信息：


GNU coreutils 在线帮助：https://www.gnu.org/software/coreutils/
翻译相关问题反馈：https://translationproject.org/team/
完整文档：https://www.gnu.org/software/coreutils/yes
或者通过本地命令查看：info '(coreutils) yes invocation'
```
(yes命令帮助文档翻译)
那么，这个命令到底是干什么的呢？
其实这个命令并非没有用，相反它有很多用处。
### 一 自动回答
是不是遇到过这样的情况:你在升级包管理器或者下载某个包的时候，你去干别的事情了，正好到了确认是否升级(或安装某个包)的环节，然后就卡在那里不动了。这样很浪费时间。但是你可以通过yes命令结合包管理器来使用:
```
yes | apt update && apt upgrade #这里是举例子，假设您使用的是apt
```
这个命令的意思是，在升级包管理器的时候，yes命令通过管道(`|`)把输出(`y`)重定向到了升级包管理器的命令里，这样每当包管理器提示是否进行下一步时都会接收到yes命令的输出，就进行下一步。

### 二 生成大文件或大量生成文件。
你可以使用yes命令生成大文件，有两种方式:
**一** 手动终止:
```
$ yes "content" >> largefile.txt
```
这个命令会把"content"无限次的追加到largefile.txt，直到手动终止(Ctrl+C)。
**二** 指定大小:
```
yes "" | head -c 1G > largefile.txt
```
这个命令会生成1G的空文件。
```
yes | head -n 100 | xargs -I{} touch file{}
```
这个命令会生成100个文件。文件名为file1、file2、file3等。
### 三 测试系统负载
你可以使用`yes`命令来测试系统负载。在终端中输入`yes`，然后你可以使用`top`或者`htop`来查看系统在高负载情况下的表现。
或者你可以使用`tmux`来配合测试:
首先输入`tmux`，然后`Ctrl+b`再按下`"`水平分割屏幕，在下面的窗口执行`yes`，然后`Ctrl+b`再按一下`Alt`再按一下`↑`(上键)切换到上面的窗口，输入`top`观察系统负载情况。

总而言之，`yes`命令是一个自动化脚本中非常实用的命令。你可以通过和其他命令结合使脚本更灵活。