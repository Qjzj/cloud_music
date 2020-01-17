import React from 'react';
import Slider from '../../components/slider'
import RecommendList from '../../components/list';
import Scroll from '../../baseUI/scroll'
import {Content} from './style'

function Home(props) {
  // mock 轮播图数据
  const bannerList = [1, 2, 3, 4].map(item => ({ imageUrl: 'http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg' }));
  const singers = ['朴树', '许巍', '李建', '老狼', '张学友', '刘德华'];
  const recommendList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => {
    return {
      id: item,
      picUrl: 'https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg',
      playCount: Math.ceil(Math.random() * item * 1000),
      name: singers[Math.floor(Math.random() * singers.length)]
    }
  })
  return (
    <Content>
      <Scroll className="list">
        <div>
          <Slider bannerList={bannerList} />
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
    </Content>
  )
}

export default React.memo(Home);