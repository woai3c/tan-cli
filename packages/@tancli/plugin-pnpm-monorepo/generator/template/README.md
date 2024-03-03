# monorepo-demo

使用 pnpm 实现多包管理

* main（依赖 utils）
* utils

## 使用

### 安装 pnpm

```sh
npm i -g pnpm
```

### 安装项目依赖

#### 安装所有依赖

```sh
pnpm i
```

#### 安装公共依赖

```sh
pnpm i typescript -Dw
```

#### 安装局部依赖

可以切换到某个包下安装依赖

```sh
pnpm i express
```

也可以在根目录下安装

```sh
pnpm add express --filter main
```

`main` 是你的包名目录，这里的意思是将 `express` 安装到 `main` 包下。

#### 安装项目内互相依赖

比如 `main` 包依赖了 `utils` 包里的方法，那可以将 `utils` 包添加到 `main` 包的依赖里：

```sh
pnpm add utils --filter main
```

添加后，`main` 的 `package.json` 文件如下：

```json
{
  "name": "main",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "utils": "workspace:^"
  }
}
```

`workspace:^` 代表了是 monorepo 项目内的包。

执行 `pnpm publish` 时会自动将 `workspace:^` 替换成版本号，例如 `"utils": "^1.0.0"`。

### 移除依赖

```sh
pnpm remove express

pnpm remove utils --filter main
```

### link

```sh
pnpm link --global
pnpm link --global <pkg>
```
