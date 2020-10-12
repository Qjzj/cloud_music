/**
 * @Author QJ
 * @date 2020--27 15:06
 * @desc index.js
 */
import React, {useState, useEffect, useRef, useCallback} from 'react'
import {connect} from 'react-redux'
import {Container} from './style'
import {CSSTransition} from 'react-transition-group'
import Header from '../../baseUI/Header'
import Scroll from '../../baseUI/scroll'
import {TopDesc, Menu, SongList, SongItem} from './style'
import {getName} from "../../util";
import style from '../../assets/global-style'
import {getAlbumDetail, changeEnterLoading} from "./store/actions";
import Loading from '../../components/loading'

const HEADER_HEIGHT = 45;

function Album(props) {

  const [showStatus, setShowStatus] = useState(true);
  const [isMarquee, setIsMarquee] = useState(false);
  const [title, setTitle] = useState('歌单');
  const id = props.match.params.id;
  const {enterLoading, currentAlbum: currentAlbumImmutable, getAlbumDataDispatch} = props;

  const currentAlbum = currentAlbumImmutable.toJS();

  useEffect(() => {
    getAlbumDataDispatch(id);
  }, [])

  const headerEl = useRef();

  const handleBack = useCallback(() => {
      setShowStatus (false);
  }, []);

  const handleScroll = useCallback((pos) => {
    let minScrollY = -HEADER_HEIGHT;
    let percent = Math.abs(pos.y / minScrollY);
    let headerDom = headerEl.current;
    if(pos.y < minScrollY) {
      headerDom.style.backgroundColor = style['theme-color'];
      headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
      setTitle(currentAlbum.name);
      setIsMarquee(true);
    }else {
      headerDom.style.backgroundColor = "";
      headerDom.style.opacity = 1;
      setTitle ("歌单");
      setIsMarquee (false);
    }

  }, [currentAlbum]);

  const renderTopDesc = () => (
    <TopDesc background={currentAlbum.coverImgUrl}>
      <div className="background">
        <div className="filter" />
      </div>
      <div className="img_wrapper">
        <div className="decorate" />
        <img src={currentAlbum.coverImgUrl} alt=""/>
        <div className = "play_count">
          <i className="iconfont icon-play" />
          <span className="count">{Math.floor(currentAlbum.subscribedCount / 1000) / 10}万</span>
        </div>
      </div>
      <div className="desc_wrapper">
        <div className="title">{currentAlbum.name}</div>
        <div className="person">
          <div className="avatar">
            <img src={currentAlbum.creator.avatarUrl} alt=""/>
          </div>
          <div className="name">{currentAlbum.creator.nickname}</div>
        </div>
      </div>
    </TopDesc>
  );

  const renderMenu = () => (
    <Menu>
      <div>
        <i className="iconfont icon-respond" />
        评论
      </div>
      <div>
        <i className="iconfont icon-addmeteo1" />
        点赞
      </div>
      <div>
        <i className="iconfont icon-collection" />
        收藏
      </div>
      <div>
        <i className="iconfont icon-checkmore" />
        更多
      </div>
    </Menu>
  );

  const renderSongList = () => (
    <SongList>
      <div className="first_line">
        <div className="play_all">
          <i className="iconfont icon-play" />
          <span>播放全部 <span className="sum">共{currentAlbum.tracks.length}首</span></span>
        </div>
        <div className="add_list">
          <i className="iconfont icon-collection" />
          <span>收藏({currentAlbum.subscribedCount})</span>
        </div>
      </div>
      <SongItem>
        {
          currentAlbum.tracks.map((item, index) => {
            return (
              <li key={index}>
                <span className="index">{index + 1}</span>
                <div className="info">
                  <span>{item.name}</span>
                  <span>
                          {getName(item.ar)} - {item.al.name}
                        </span>
                </div>
              </li>
            )
          })
        }
      </SongItem>
    </SongList>
  );


  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container>
        <Header title={title} handleClick={handleBack} ref={headerEl} isMarquee={isMarquee} />
        {
          !enterLoading && (
            <Scroll bounceTop={false} onScroll={handleScroll}>
              <div>
                {
                  renderTopDesc()
                }
                {
                  renderMenu()
                }
                {
                  renderSongList()
                }
              </div>
            </Scroll>
          )
        }
        {
          enterLoading && <Loading />
        }
      </Container>
    </CSSTransition>
  )
}

const mapStateToProps = state =>({
  currentAlbum: state.getIn(['album', 'currentAlbum']),
  enterLoading: state.getIn(['album', 'enterLoading'])
});

const mapDispatchToProps = dispatch => ({
  getAlbumDataDispatch(id) {
    dispatch(changeEnterLoading(true));
    dispatch(getAlbumDetail(id))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));
