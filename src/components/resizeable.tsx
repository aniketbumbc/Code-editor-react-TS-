import React from 'react';
import { ResizableBox } from 'react-resizable';
import './resizeable.css';

interface ResizeableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizeableProps> = ({ direction, children }) => {
  return (
    <ResizableBox
      height={300}
      width={Infinity}
      resizeHandles={['s']}
      maxConstraints={[Infinity, window.innerHeight * 0.9]}
      minConstraints={[Infinity, 50]}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;