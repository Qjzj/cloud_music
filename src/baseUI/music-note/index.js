/**
 * @Author QJ
 * @date 2020--16 10:53
 * @desc index.js
 */
import React, {useEffect, useImperativeHandle, useRef, forwardRef} from 'react'
import styled from 'styled-components'
import {prefixStyle} from "../../util";
import style from '../../assets/global-style'

const Container = styled.div`
  .icon-wrapper {
    position: fixed;
    z-index: 1000;
    margin-top: -10px;
    margin-left: -10px;
    color: ${style['theme-color']};
    font-size: 14px;
    display: none;
    transition: transform 1s cubic-bezier(.62, -0.1, .85, .57);
    transform: translate3d(0, 0, 0);
    
    > i {
      transition: transform 1s;
    }
  }
`;

const MusicNote = forwardRef((props, ref) => {
  const ICON_NUMBER = 3;
  const transform = prefixStyle('transform');

  const createNode = txt => {
    const template = `<div class="icon-wrapper">${txt}</div>`
    let tempNode = document.createElement('div');
    tempNode.innerHTML = template;
    return tempNode.firstChild;
  };

  const iconsRef = useRef();

  useEffect(() => {
    for(let i=0; i<ICON_NUMBER; i++) {
      let node = createNode(`<i class="iconfont icon-music" />`);

      iconsRef.current.appendChild(node);
    }

    let domArray = [].slice.call(iconsRef.current.children);
    domArray.forEach(item => {
      item.running = false;
      item.addEventListener('transitionend', function(e) {
        this.style['display'] = 'none';
        this.style[transform] = 'translate3d(0, 0, 0)';
        this.running = false;

        const icon = this.querySelector('i');
        icon.style[transform] = `translate3d(0, 0, 0)`;
      }, false);
    })
  }, []);

  useImperativeHandle(ref, () => ({
    startAnimation
  }));

  const startAnimation = ({x, y}) => {
    console.log(x, y, iconsRef.current.children);
    for(let i=0; i<ICON_NUMBER; i++) {
      const domArray = Array.from(iconsRef.current.children);
      const item = domArray[i];

      if(item.running === false) {
        item.style.left = x + 'px';
        item.style.top = y + 'px';
        item.style.display = 'inline-block';

        setTimeout(() => {
          item.running = true;
          item.style[transform] = `translate3d(0, 750px, 0)`;
          const icon = item.querySelector('i');
          icon.style[transform] = `translate3d(-40px, 0, 0)`;
        }, 20);
        break;
      }
    }
  }

  return (
    <Container ref={iconsRef}></Container>
  )

});

export default React.memo(MusicNote)
