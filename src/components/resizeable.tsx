import React from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizeable.css';

interface ResizeableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizeableProps> = ({ direction, children }) => {
  let resizeableProps: ResizableBoxProps;

  if (direction === 'horizontal') {
    resizeableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width: window.innerWidth * 0.75,
      resizeHandles: ['e'],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      minConstraints: [window.innerWidth * 0.2, Infinity],
    };
  } else {
    resizeableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      minConstraints: [Infinity, 50],
    };
  }

  return <ResizableBox {...resizeableProps}>{children}</ResizableBox>;
};

export default Resizable;
