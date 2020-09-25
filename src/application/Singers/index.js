import React, {useEffect, useContext} from 'react';
import {connect} from 'react-redux'
import Horizon from '../../baseUI/horizon-item'
import {categoryTypes, alphaTypes} from '../../api/config'
import {NavContainer, ListContainer, List, ListItem} from './style'
import Scroll from "../../baseUI/scroll";
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePullUpLoading,
  changePageCount,
  changePullDownLoading,
  refreshMoreSingerList,
  refreshMoreHotSingerList,
} from './store/actions'
import Loading from '../../components/loading'
import LazyLoad, {forceCheck} from 'react-lazyload'
import {CategoryDataContext, CHANGE_ALPHA, CHANGE_CATEGORY, Data} from './data'



function Singers (props) {

  const {data, dispatch} = useContext(CategoryDataContext);

  const {category, alpha} = data.toJS();

  const {updateDispatch, getHotSingerDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch} = props;
  const {singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount} = props;

  useEffect(() => {
    if(!singerList.length) {
      getHotSingerDispatch();
    }
    // eslint-disable-next-line
  }, []);

  const renderSignerList = () => (
    <List>
      {
        singerList.map(singer => (
          <ListItem key={singer['id']}>
            <div className="img_wrapper">
              <LazyLoad placeholder={<img width="100%" height="100%" src={require ('../../components/list/music.jpg')} alt="music"/>}>
                <img src={`${singer['picUrl']}?param=300*300`} width="100%" height="100%" alt="singer"/>
              </LazyLoad>
            </div>
            <span className="name">{singer['name']}</span>
          </ListItem>
        ))
      }
    </List>
  );


  const handleCategory = (val) => {
    dispatch({type: CHANGE_CATEGORY, data: val});
    updateDispatch(val, alpha);
  };

  const handleAlpha = (val) => {
    dispatch({type: CHANGE_ALPHA, data: val});
    updateDispatch(category, val);
  };

  const handlePullUp = () => {
    pullUpRefreshDispatch (category, alpha, category === '', pageCount);
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch (category, alpha);
  };


  return (
    <div>
        <NavContainer>
          <Horizon list={categoryTypes} title={"分类 (默认热门):"} oldVal={category} handleClick={(val) => handleCategory(val) } />
          <Horizon list={alphaTypes} title={"首字母:"} oldVal = {alpha} handleClick={(val) => handleAlpha(val)} />
        </NavContainer>
        <ListContainer>
          <Scroll
            pullUp={handlePullUp}
            pullDown={handlePullDown}
            pullUpLoading={pullUpLoading}
            pullDownLoading={pullDownLoading}
            onScroll={forceCheck}
          >
            {
              renderSignerList()
            }
          </Scroll>
          <Loading show={enterLoading} />
        </ListContainer>
    </div>
  )
}

const mapStateToProps = state => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
});

const mapDispatchToProps = dispatch =>({
  getHotSingerDispatch() {
    dispatch(getHotSingerList());
  },
  updateDispatch(category, alpha) {
    dispatch(changePageCount(0));//由于改变了分类，所以pageCount清零
    dispatch(changeEnterLoading(true));//loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
    dispatch(getSingerList(category, alpha));
  },
  // 滑到最底部刷新部分的处理
  pullUpRefreshDispatch(category, alpha, hot, count) {
    dispatch(changePullUpLoading(true));
    dispatch(changePageCount(count+1));
    if(hot){
      dispatch(refreshMoreHotSingerList());
    } else {
      dispatch(refreshMoreSingerList(category, alpha));
    }
  },
  //顶部下拉刷新
  pullDownRefreshDispatch(category, alpha) {
    dispatch(changePullDownLoading(true));
    dispatch(changePageCount(0));//属于重新获取数据
    if(category === '' && alpha === ''){
      dispatch(getHotSingerList());
    } else {
      dispatch(getSingerList(category, alpha));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));
