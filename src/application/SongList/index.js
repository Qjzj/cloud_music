/**
 * @Author QJ
 * @date 2020--30 11:23
 * @desc index.js
 */
import React from 'react'
import {SongList, SongItem} from './style'
import {getName} from '../../util'

const SongsList = React.forwardRef((props, ref) => {
  const {collectCount, showCollect, songs} = props;

  const totalCount = songs.length;

  const selectItem = (e, index) => {
    console.log(index);
  };

  const songList = (list) => {
    let res = [];
    for(let i=0; i<list.length; i++) {
      let item = list[i];
      res.push(
        <li key={item.id} onClick={(e) => selectItem(e, i)}>
          <span className="index">{i + 1}</span>
          <div className="info">
            <span>{item.name}</span>
            <span>
              {
                item.ar ? getName(item.ar) : getName(item['artists'])
              } -
              {
                item.al ? item.al.name : item.album.name
              }
            </span>
          </div>
        </li>
      )
    }
    return res
  }

  const collect = (count) => (
    <div className="add_list">
      <i className="iconfont icon-collection" />
      <span>收藏 ({Math.floor(count / 1000) / 10}万)</span>
    </div>
  )

  return (
    <SongList ref={ref} showBackground={props.showBackground}>
      <div className="first_line">
        <div className="play_all" onClick={(e) => selectItem (e, 0)}>
          <i className="iconfont">&#xe6e3;</i>
          <span > 播放全部 <span className="sum">(共 {totalCount} 首)</span></span>
        </div>
        { showCollect ? collect (collectCount) : null}
      </div>
      <SongItem>
        { songList (songs) }
      </SongItem>
    </SongList>
  )
});

export default React.memo(SongsList);