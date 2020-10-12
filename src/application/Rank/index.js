import React, {useEffect} from 'react';
import {renderRoutes} from "react-router-config";
import {connect} from 'react-redux'
import {getRankList} from './store/actions'
import {filterIndex} from "../../util";
import {Container, List, ListItem, SongList, EnterLoading} from "./style";
import Scroll from "../../baseUI/scroll";
import Loading from "../../components/loading";


function Home (props) {

  const {rankList, enterLoading} = props;
  const {getRankListDispatch} = props;

  useEffect(() => {
    !rankList.size && getRankListDispatch();
  }, []);

  const list = rankList ? rankList.toJS() : [];

  const globalStartIndex = filterIndex(list);
  const officialList = list.slice(0, globalStartIndex);
  const globalList = list.slice(globalStartIndex);

  const renderSongList = list => (
    list.length ? (
      <SongList>
        {
          list.map((item, index) => (
            <li key={index}>{index + 1}. {item['first']} - {item['second']}</li>
          ))
        }
      </SongList>
    ) : null
  );


  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {
          list.map(item => (
            <ListItem
              key={item['id']}
              tracks={item['tracks']}
              onClick={() => enterDetail(item['id'])}
            >
              <div className="img_wrapper">
                <img src={item['coverImgUrl']} alt=""/>
                <div className="decorate"></div>
                <span className='update_frequency'>{item["updateFrequency"]}</span>
              </div>
              {renderSongList(item['tracks'])}
            </ListItem>
          ))
        }
      </List>
    )
  };

  const enterDetail = (id) => {
    console.log(id);
    props.history.push(`/rank/${id}`);
  };

  const displayStyle = enterLoading ? {"display": "none"} : {display: ''};


  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="official" style={displayStyle}>官方榜</h1>
          {
            renderRankList(officialList)
          }
          <h1 className="global" style={displayStyle}>全球榜</h1>
          {
            renderRankList(globalList, true)
          }
          {
            enterLoading ? <EnterLoading><Loading /> </EnterLoading> : null
          }
        </div>
      </Scroll>
      {
        renderRoutes(props.route.routes)
      }
    </Container>
  )
}

const mapStateToProps = (state) => ({
  rankList: state.getIn(['rank', 'rankList']),
  enterLoading: state.getIn(['rank', 'loading'])
});

const mapDispatchToProps = dispatch => ({
  getRankListDispatch() {
    dispatch(getRankList())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Home));
