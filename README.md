# postcss-px2rpx-exclude

[PostCSS](https://github.com/ai/postcss) 单位转换插件，目前已支持小程序端（px 转 rpx），H5 端（px 转 rem）及 RN 端。

基于 [postcss-pxtransform](https://github.com/NervJS/taro/tree/2.x/packages/postcss-pxtransform)。

## Install

```shell
$ npm install postcss-px2rpx-exclude --save-dev
```

## Usage

```javascript
# postcss.config.js

module.exports = {
  parser: require("postcss-comment"),
  plugins: [
    require("postcss-px2rpx-exclude")({
      platform: "weapp",
      designWidth: 375
    }),
  ]
};

```

### 差异点，新增 exclude 支持，可排除不转换的文件，如第三方 UI 组件库

注意：exclude 只支持正则表达式

```javascript
# postcss.config.js

module.exports = {
  parser: require("postcss-comment"),
  plugins: [
    require("postcss-px2rpx-exclude")({
      platform: "weapp",
      designWidth: 750,
      exclude: /node_modules|wot-design-ui/i
    }),
  ]
};
```

### 小程序

```js
options = {
  platform: "weapp",
  designWidth: 750,
};
```

### H5

```js
options = {
  platform: "h5",
  designWidth: 750,
};
```

### RN

```js
options = {
  platform: "rn",
  designWidth: 750,
};
```

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
