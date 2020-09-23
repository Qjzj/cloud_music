import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import Slider from '../../components/slider'
import RecommendList from '../../components/list';
import Loading from '../../components/loading'
import Scroll from '../../baseUI/scroll'
import {Content} from './style'
import {forceCheck} from 'react-lazyload'

import * as actionTypes from './store/actions'


function Home(props) {

  const { bannerList, recommendList, enterLoading } = props;

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;


  useEffect(() => {
    !bannerList.size && getBannerDataDispatch();
    !recommendList.size && getRecommendListDataDispatch();
  }, [])

  const bannerListJS = bannerList ? bannerList.toJS () : [];
  const recommendListJS = recommendList ? recommendList.toJS () :[];


  /*const bannerList = [1, 2, 3, 4].map(item => ({ imageUrl: 'http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg' }));
  const singers = ['朴树', '许巍', '李建', '老狼', '张学友', '刘德华'];
  const recommendList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => {
    return {
      id: item,
      picUrl: 'https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg',
      playCount: Math.ceil(Math.random() * item * 1000),
      name: singers[Math.floor(Math.random() * singers.length)]
    }
  })*/
  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS} />
          <RecommendList recommendList={recommendListJS} />
        </div>
      </Scroll>
      { enterLoading ? <Loading /> : null}
    </Content>
  )
}

const mapStateToProps = (state) => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn (['recommend', 'enterLoading'])
});

const mapDispatchToProps = dispatch =>({
  getBannerDataDispatch () {
    dispatch (actionTypes.getBannerList ());
  },
  getRecommendListDataDispatch () {
    dispatch (actionTypes.getRecommendList ());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Home));
