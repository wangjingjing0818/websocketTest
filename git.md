### git
- 版本控制
  - 备份文件
  - 记录历史
  - 回到过去
  - 多端共享
  - 团队协作
- svn和git的区别
  - git速度快，svn需要几十分钟，git只需几十秒
  - 分布式，无需联网
  - git把内容按元数据方式存储，都放在.git文件下
  - 强大的分支管理
## pwd
print working directory 打印当前工作目录
## 告诉git当前我是谁
- 用git第一次需要配置，以后都不需要
```
git config --global user.name <github名字>
git config --global user.email <github 邮箱>
git config --list  查看配置列表
```

## 初始化文件夹（告诉git哪个文件夹归git管理）
- git init 初始化
- mkdir 文件夹名字  创建目录
- cd 文件夹名字   进入文件夹
- rm -rf 删除的文件名字   （rf循环删除）
- ls -a  查看所有文件
- touch index.txt  创建文件
- cat index.txt 查看文件里的内容

## vi编辑文件(在git bash 下用，cmd下不支持)
- vi index.txt 编辑文件内容  i/a 进入编辑模式   esc退出编辑模式 :wq保存并退出 :q!强制退出

## 不能仓库套仓库
- 不能在初始化后的仓库，再新建文件夹初始化仓库

## git提交命令
 - git status 查看git提交状态
 - git log 查看日志（git log --oneline 一行显示）
 - git add -A  （ 添加到暂存区）
 - git commit -m"注释"  （添加到历史区）
 - git commit -a -m"注释" （工作区直接添加到历史区，必须之前提交过）
 ## 代码比对
 - git diff  比较工作区和暂存区
 - git diff --cached 比较暂存区和历史区
 - git diff master  比较工作区和历史区
 - git checkout 文件名  暂存区覆盖工作区
 - git reset --hard 版本号  历史区覆盖掉工作区和暂存区（先查看日志git log）
 - git reflog 查看所有的版本
 - git log --grep=搜索的内容  搜索
 - git reset HEAD 文件名字 删除本次的add操作
 - history>1.txt 把写的git命令导出到1.txt文件中

## 分支管理
- git branch 查看分支
- git branch （dev分支名） 创建分支
- git checkout dev  切换分支
- git branch -D dev 删除分支
- git checkout -b dev 创建并切换dev分支
## 合并分支
 > 默认mastet是主干，用主干合并分支
 - git merge dev 合并dev的代码 合并后删除dev分支即可
## 处理冲突
由于两个分支改变了相同的文件，但是内容不同这时候要手动解决冲突，再次提交，就可以完成合并（模块化开发可以降低冲突）

## 创建有内容的文件
```
echo 内容>文件名字
echo 内容>>文件名字 往文件里追加内容
```

##　关联仓库
git remote add 名字  地址

## 推送到远程
```
git push origin master -u
-u    upstream 设置后下次就可以直接 git push
git push origin master
```
## 忽略文件
```
touch .gitignore 创建忽略文件
```
- .idea
- node_modules
- bower_componets
- .DS_Store
## 在github上发布静态网站
- 必须当前项目下建立一个gh-pages的分支
- 将我们需要发布的内容推送到gh-pages这个分支上
- 推送到远程仓库上即可
- github会给你一个在线地址
```
git checkout -b gh-pages
touch index.html
git add -A
 git commit -m""
 git push origin gh-pages
 在settings中可查找到网址+文件名即可（默认会展示index.html）
 ```
## 关联自己仓库的代码
```
git clone 地址 别名
```







