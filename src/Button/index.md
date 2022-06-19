## Button

Demo:

```tsx
import React, { useRef } from 'react';
import { Button } from 'tdesign';

export default () => {
  const ref = useRef();
  console.log(ref);
  return (
    <div>
      <Button>默认按钮</Button>
      <Button type="primary">主按钮</Button>
    </div>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
