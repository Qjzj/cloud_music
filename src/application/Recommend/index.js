import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import Slider from '../../components/slider'
import RecommendList from '../../components/list';
import Loading from '../../components/loading'
import Scroll from '../../baseUI/scroll'
import {Content} from './style'
import {forceCheck} from 'react-lazyload'
import {renderRoutes} from "react-router-config";

import * as actionTypes from './store/actions'


function Home(props) {

  const { bannerList, recommendList, enterLoading } = props;

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;


  useEffect(() => {
    !bannerList.size && getBannerDataDispatch();
    !recommendList.size && getRecommendListDataDispatch();
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS () : [];
  const recommendListJS = recommendList ? recommendList.toJS () :[];

  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS} />
          <RecommendList recommendList={recommendListJS} />
        </div>
      </Scroll>
      { enterLoading ? <Loading /> : null}
      {
        renderRoutes(props.route.routes)
      }
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
