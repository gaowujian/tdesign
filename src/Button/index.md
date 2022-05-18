## Button

Demo:

```tsx
import React, { useRef } from 'react';
import { Button } from 'tdesign';

export default () => {
  const ref = useRef();
  console.log(ref);
  return (
    <Button
      block
      onClick={() => {
        console.log(ref);
      }}
      ref={ref}
    >
      按钮
    </Button>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
