### Eslint 注释规则

> 有时候你可能因为规则的错误，短时间内无法提交代码，这时候你可以暂时的使用注释来规避对应的规则，也可以使用注释验证对应的规则

可以在你的文件中使用以下格式的块注释来临时禁止规则出现警告：

```
/* eslint-disable */

alert('foo');

/* eslint-enable */
```

你也可以对指定的规则启用或禁用警告:

```
/* eslint-disable no-alert, no-console */

alert('foo');
console.log('bar');

/* eslint-enable no-alert, no-console */
```
如果在整个文件范围内禁止规则出现警告，将 /* eslint-disable */ 块注释放在文件顶部：
```
/* eslint-disable */

alert('foo');
```

你也可以对整个文件启用或禁用警告:
```
/* eslint-disable no-alert */

// Disables no-alert for the rest of the file
alert('foo');
```

可以在你的文件中使用以下格式的行注释或块注释在某一特定的行上禁用所有规则：
```
alert('foo'); // eslint-disable-line

// eslint-disable-next-line
alert('foo');

/* eslint-disable-next-line */
alert('foo');

alert('foo'); /* eslint-disable-line */
```
在某一特定的行上禁用某个指定的规则：
```
alert('foo'); // eslint-disable-line no-alert

// eslint-disable-next-line no-alert
alert('foo');

alert('foo'); /* eslint-disable-line no-alert */

/* eslint-disable-next-line no-alert */
alert('foo');
```
在某个特定的行上禁用多个规则：
```
alert('foo'); // eslint-disable-line no-alert, quotes, semi

// eslint-disable-next-line no-alert, quotes, semi
alert('foo');

alert('foo'); /* eslint-disable-line no-alert, quotes, semi */

/* eslint-disable-next-line no-alert, quotes, semi */
alert('foo');
```
上面的所有方法同样适用于插件规则。例如，禁止 eslint-plugin-example 的 rule-name 规则，把插件名（example）和规则名（rule-name）结合为 example/rule-name：
```
foo(); // eslint-disable-line example/rule-name
foo(); /* eslint-disable-line example/rule-name */
```
[CSDN原文地址](https://blog.csdn.net/weixin_36934930/article/details/90673863)
