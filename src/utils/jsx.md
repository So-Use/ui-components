# Usage

Create a React element from a string.

```createJSXFromString(string, classNameRootElement, rootElement)```

| Name | Description | Default |
| ---- | ----------- | ------- |
| string | HTML elements as string | - |
| classNameRootElement | Class to apply on root element | - |
| rootElement |  Type of root element | "span" |

Ex: 

```js
createJSXFromString("<label>Label as String</label><ul><li>Item 1</li><li>Item 2</li></ul>", "root-class", "div")
```

generates HTML wrapped in React element

```html
<div class="root-class">
    <label>Label as String</label>
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
    </ul>
</div>
```

