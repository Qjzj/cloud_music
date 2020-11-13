/**
 * @Author QJ
 * @date 2020--30 10:04
 * @desc index.js
 */
import React, {useState, useRef, useEffect, useCallback} from 'react'
import {connect} from 'react-redux'
import {CSSTransition} from "react-transition-group";
import {Container, ImgWrapper, CollectButton, BgLayer, SongListWrapper} from './style'
import Header from '../../baseUI/Header'
import Scroll from '../../baseUI/scroll'
import SongsList from '../SongList'
import Loading from '../../components/loading'
import {HEADER_HEIGHT} from "../../config/config";
import {changeEnterLoading, getSingerInfo} from "./store/actions";
import MusicNote from '../../baseUI/music-note'


function Singer(props) {
  const [showStatus, setShowStatus] = useState(true);
  const {
    artist: immutableArtist,
    songs: immutableSongs,
    loading
  } = props;
  const {getSingerDataDispatch} = props;

  const artist = immutableArtist.toJS();
  const songs = immutableSongs.toJS();

  const collectButton = useRef();
  const imageWrapper = useRef();
  const songScrollWrapper = useRef();
  const songScroll = useRef();
  const header = useRef();
  const layer = useRef();
  const musicNoteRef = useRef();

  // 图片初始高度
  let initialHeight = 0;
  const OFFSET = 5;

  useEffect(() => {
    const id = props.match.params.id;
    getSingerDataDispatch(id);
  }, [])

  useEffect(() => {
    let h = imageWrapper.current.offsetHeight;
    songScrollWrapper.current.style.top = `${h - OFFSET}px`;
    initialHeight = h;
    layer.current.style.top = `${h - OFFSET}px`;
    songScroll.current.refresh ();
  }, []);

  const setShowStatusFalse = useCallback (() => {
    setShowStatus (false);
  }, []);

  const handleScroll = useCallback((pos) => {
    let height = initialHeight;
    const newY = pos.y;
    const imageDOM = imageWrapper.current;
    const buttonDOM = collectButton.current;
    const headerDOM = header.current;
    const layerDOM = layer.current;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

    const percent = Math.abs(newY / height);

    if(newY > 0) {
      imageDOM.style["transform"] = `scale(${1 + percent})`;
      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      layerDOM.style.top = `${height - OFFSET + newY}px`;
    }else if(newY >= minScrollY) {
      layerDOM.style.top = `${height - OFFSET - Math.abs (newY)}px`;
      // 这时候保证遮罩的层叠优先级比图片高，不至于被图片挡住
      layerDOM.style.zIndex = 1;
      imageDOM.style.paddingTop = "75%";
      imageDOM.style.height = 0;
      imageDOM.style.zIndex = -1;
      // 按钮跟着移动且渐渐变透明
      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      buttonDOM.style["opacity"] = `${1 - percent * 2}`;
    }else if(newY < minScrollY) {
      // 往上滑动，但是超过 Header 部分
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      layerDOM.style.zIndex = 1;
      // 防止溢出的歌单内容遮住 Header
      headerDOM.style.zIndex = 100;
      // 此时图片高度与 Header 一致
      imageDOM.style.height = `${HEADER_HEIGHT}px`;
      imageDOM.style.paddingTop = 0;
      imageDOM.style.zIndex = 99;
    }
  }, []);

  const musicAnimation = (x, y) => {
    musicNoteRef.current.startAnimation({x, y});
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container>
        <Header title={'头部'} ref={header} handleClick={setShowStatusFalse} />
        <ImgWrapper bgUrl={artist.picUrl} ref={imageWrapper}>
          <div className="filter" />
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className="iconfont icon-collection" />
          <span className="text">收藏</span>
        </CollectButton>
        <BgLayer ref={layer} />
        <SongListWrapper ref={songScrollWrapper}>
          <Scroll ref={songScroll} onScroll={handleScroll}>
            <SongsList
              songs={songs}
              showCollect={false}
              musicAnimation={musicAnimation}
            />
          </Scroll>
        </SongListWrapper>
        {loading ? <Loading /> : null}
        <MusicNote ref={musicNoteRef}/>
      </Container>

    </CSSTransition>
  )
}

const mapStateToProps = state => ({
  artist: state.getIn(['singerInfo', 'artist']),
  songs: state.getIn(['singerInfo', 'songsOfArtist']),
  loading: state.getIn(['singerInfo', 'loading'])
});

const mapDispatchToProps = dispatch =>({
  getSingerDataDispatch(id) {
    dispatch(changeEnterLoading);
    dispatch(getSingerInfo(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Singer);
