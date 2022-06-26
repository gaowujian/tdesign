## Alert

Demo:

```tsx
import React from 'react';
import { Alert } from 'tdesign';

export default () => {
  return (
    <div>
      <Alert message="我是一个主标题" description="我是一个副标题" />
      <Alert message="我是一个主标题" type="success" description="我是一个副标题" closable />
      <Alert
        message="我是一个主标题"
        type="warning"
        description="我是一个副标题"
        closeText="关闭"
      />
      <Alert message="我是一个主标题" type="error" description="我是一个副标题" />
    </div>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
