新建一个远程仓库，并且关联本地文件的操作方法

1 在自己的GitHub上创建一个仓库。

2 打开命令行工具，切换到需要上传的工程目录下。

3 初始化当前目录作为Git仓库。     git init

4 添加目录下的文件到本地仓库。 git add .

5 提交staged的文件  git commit -m "initial commit"

6 使用命令行添加远程仓库的地址。   git remote add origin https://github.com/theonegis/keras-examples.git

7 Push本地仓库到远程GitHub  git push -u origin master  如果提示冲突可以强制push：git push -u origin master -f


常用的  git 操作

我的分支  mhgjy

我们创建dev分支，然后切换到dev分支：

git checkout -b mhgjy

git checkout命令加上-b参数表示创建并切换，相当于以下两条命令：
$ git branch dev
$ git checkout mhgjy

然后，用git branch命令查看当前分支：

git branch

现在，dev分支的工作完成，我们就可以切换回master分支：

git checkout master

添加到缓存区
git add .  
添加到工作区
git commit –m “”

现在，我们把dev分支的工作成果合并到master分支上：

先回到主分支上再合并分支，才能起效果，否则远程的分支会覆盖本地的分支

git merge mhgjy

合并完成后，就可以放心地删除dev分支了：

git branch -d dev

删除后，查看branch，就只剩下master分支了：

git branch

1、先拉下来，会自动合并的（不用操心）

git pull origin master

2、再上传

git push -u origin master  （加上u   ，以后再上传只需要git push）


·  git add -A  提交所有变化

·  git add -u  提交被修改(modified)和被删除(deleted)文件，不包括新文件(new)

·  git add .  提交新文件(new)和被修改(modified)文件，不包括被删除(deleted)文件

强制   回去某一个版本的时候   第一步  git reset --hard 668d  第二步  git push -f

加了参数-u后，以后即可直接用git push 代替git push origin master