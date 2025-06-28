# PostCSS Px2Rpx Exclude

[PostCSS](https://github.com/ai/postcss) 单位转换插件，目前已支持小程序端（px 转 rpx），H5 端（px 转 rem）及 RN 端。

可用于 `uni-app` cli 创建的项目单位转化

基于 [postcss-pxtransform](https://github.com/NervJS/taro/tree/2.x/packages/postcss-pxtransform)。

## Install

```shell
$ npm install postcss-px2rpx-exclude --save-dev
```

## Usage

### 输入/输出

默认配置下，所有的 px 都会被转换。

```css
/* input */
h1 {
  margin: 0 0 20px;
  font-size: 32px;
  line-height: 1.2;
  letter-spacing: 1px;
}

/* weapp output */
h1 {
  margin: 0 0 20rpx;
  font-size: 32rpx;
  line-height: 1.2;
  letter-spacing: 1rpx;
}

/* h5 output */
h1 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  line-height: 1.2;
  letter-spacing: 0.025rem;
}

/* rn output */
h1 {
  margin: 0 0 10px;
  font-size: 16px;
  line-height: 1.2;
  letter-spacing: 0.5px;
}
```

### vite example

```js
export default async ({ mode }) => {
  const UnoCSS = (await import("unocss/vite")).default;
  const env = loadEnv(mode, __dirname);

  return defineConfig({
    plugins: [
      // ... your plugins
      Uni(),
      UnoCSS(),
    ],
    css: {
      postcss: {
        plugins: [
          // https://github.com/Yechuanjie/postcss-px2rpx-exclude
          postcssPxtoRpxExclude({
            designWidth: 750,
            exclude: /node_modules|wot-design-ui/i, // 排除node_modules和第三方组件库中的文件，避免组件库样式被转换为rpx或rem
          }),
        ],
      },
    },
  });
};
```

## 配置 **options**

参数默认值如下：

```js
{
    unitPrecision: 5,
    propList: ['*'],
    selectorBlackList: [],
    replace: true,
    mediaQuery: false,
    minPixelValue: 0
}
```

Type: `Object | Null`

### `platform` （String）（必填）

`weapp` 或 `h5` 或 `rn`

### `designWidth`（Number）（必填）

`640` 或 `750` 或 `828`

### `unitPrecision` (Number)

The decimal numbers to allow the REM units to grow to.

### `propList` (Array)

The properties that can change from px to rem.

- Values need to be exact matches.
- Use wildcard `*` to enable all properties. Example: `['*']`
- Use `*` at the start or end of a word. (`['*position*']` will match `background-position-y`)
- Use `!` to not match a property. Example: `['*', '!letter-spacing']`
- Combine the "not" prefix with the other prefixes. Example: `['*', '!font*']`

### `selectorBlackList`

(Array) The selectors to ignore and leave as px.

- If value is string, it checks to see if selector contains the string.
  - `['body']` will match `.body-class`
- If value is regexp, it checks to see if the selector matches the regexp.
  - `[/^body$/]` will match `body` but not `.body`

### `replace` (Boolean)

replaces rules containing rems instead of adding fallbacks.

### `mediaQuery` (Boolean)

Allow px to be converted in media queries.

### `minPixelValue` (Number)

Set the minimum pixel value to replace.

### `exclude` (Regexp)

If the file name matches the regexp, this file will not transform unit

## 忽略

### 属性

当前忽略单个属性的最简单的方法，就是 px 单位使用大写字母。

```css
/*`px` is converted to `rem`*/
.convert {
  font-size: 16px; // converted to 1rem
}

/* `Px` or `PX` is ignored by `postcss-pxtorem` but still accepted by browsers*/
.ignore {
  border: 1px solid; // ignored
  border-width: 2px; // ignored
}
```

### 文件

对于头部包含注释`/*postcss-px2rpx-exclude disable*/` 的文件，插件不予处理。

## 剔除

`/*postcss-px2rpx-exclude rn eject enable*/` 与 `/*postcss-px2rpx-exclude rn eject disable*/` 中间的代码，
在编译成 RN 端的样式的时候，会被删除。建议将 RN 不支持的但 H5 端又必不可少的样式放到这里面。如：样式重制相关的代码。

```css
/*postcss-px2rpx-exclude rn eject enable*/

.test {
  color: black;
}

/*postcss-px2rpx-exclude rn eject disable*/
```
