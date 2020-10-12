import React from 'react'
import {withRouter} from "react-router-dom";
import {ListWrapper, ListItem, List} from './style'
import {getCount} from '../../util'
import LazyLoad from 'react-lazyload'

function RecommendList(props) {

  const enterDetail = id => {
    props.history.push(`/recommend/${id}`);
  };

  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {
          props.recommendList.map((item) => {
            return (
              <ListItem key={item.id} onClick={() => enterDetail(item.id)}>
                <div className="img_wrapper">
                  <div className="decorate" />
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require ('./music.jpg')} alt="music"/>}>
                    <img src={item.picUrl + "?imageView=1&type=webp&thumbnail=60x0"} width="100%" height="100%" alt="推荐"/>
                  </LazyLoad>

                  <div className="pay_count">
                    <i className="iconfont icon-tipsmoney play" />
                    <span className="count">{getCount(item.playCount)}</span>
                  </div>
                </div>
                <div className="desc">{item.name}</div>
              </ListItem>
            )
          })
        }
      </List>
    </ListWrapper>
  )
}

export default React.memo(withRouter(RecommendList))
