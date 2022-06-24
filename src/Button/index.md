## Button

Demo:

```tsx
import React, { useRef } from 'react';
import { Button } from 'tdesign';

export default () => {
  const ref = useRef();
  console.log(ref);
  const handleClick = (e) => {
    console.log('click');
  };
  return (
    <div>
      <Button onClick={handleClick}>默认按钮</Button>
      <Button onClick={handleClick} type="primary">
        主按钮
      </Button>
      <Button onClick={handleClick} size="lg">
        大按钮
      </Button>
      <Button onClick={handleClick} size="sm">
        小按钮
      </Button>
      <Button onClick={handleClick} danger type="primary">
        primary危险按钮
      </Button>
      <Button onClick={handleClick} danger>
        危险按钮
      </Button>
      <Button onClick={handleClick} htmlType="reset">
        reset按钮
      </Button>
      <Button onClick={handleClick} block>
        block按钮
      </Button>
      <Button onClick={handleClick} disabled>
        disabled按钮
      </Button>
      <Button onClick={handleClick} type="link" href="www.baidu.com">
        link按钮
      </Button>
      <Button onClick={handleClick} type="link" href="www.baidu.com" disabled>
        link按钮
      </Button>
    </div>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
