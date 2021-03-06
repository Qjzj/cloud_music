/**
 * @Author QJ
 * @date 2020--27 15:37
 * @desc index.js
 */
import React from 'react'
import styled from 'styled-components'
import style from '../../assets/global-style'
import PropTypes from 'prop-types'
import {HEADER_HEIGHT} from "../../config/config";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  padding: 0 10px 5px;
  width:100%;
  height: ${HEADER_HEIGHT}px;
  z-index: 100;
  display: flex;
  line-height: ${HEADER_HEIGHT}px;
  color: ${style['font-color-light']};
  
  .back {
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  
  > h1 {
    font-size: ${style['font-size-l']};
    font-weight: 700;
  }
  
`;

const Header = React.forwardRef((props, ref) => {
  const {handleClick, title, isMarquee} = props;

  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont icon-back" onClick={handleClick} />
      {
        isMarquee ? <marquee><h1>{title}</h1></marquee> : <h1>{title}</h1>
      }
    </HeaderContainer>
  )

});

Header.defaultProps = {
  handleClick: () => {},
  title: '标题',
  isMarquee: false
};

Header.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
  isMarquee: PropTypes.bool,
};

export default React.memo(Header);
