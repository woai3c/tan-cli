# tan-cli

## 安装

```
npm install -g @tancli/cli
```

## 使用

查看版本

```
tan -v
```

### create 命令

创建项目 `tan create <projectName>`

```sh
# 创建一个名为 tan-project 的项目
tan create tan-project
```

#### 已有模板

* Vue3 基础项目（只包含了必要的 eslint、husky 配置）
* Vue3 组件
* TypeScript 组件
* PNPM Monorepo 多包项目

### clear-branch 命令

用于清除当前仓库所有的本地分支，不会影响远程分支。

```sh
tan clear-branch
```
