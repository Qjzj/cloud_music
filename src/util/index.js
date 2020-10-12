export const getCount = (count) => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor (count / 10000) < 10000) {
    return Math.floor (count/1000)/10 + "万";
  } else  {
    return Math.floor (count / 10000000)/ 10 + "亿";
  }
}

export const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout (timer);
    }
    timer = setTimeout (() => {
      func.apply (this, args);
      clearTimeout (timer);
    }, delay);
  }
};

export const filterIndex = rankList => {
  for(let i=0; i<rankList.length - 1; i++) {
    if(rankList[i].tracks.length && !rankList[i+1].tracks.length) {
      return i + 1;
    }
  }
};

export const getName = list => {
  let str = "";
  list.map((item, index) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};

const elementStyle = document.createElement("div").style;

const vendor = (() => {
  const transformNames = {
    webkit: "webkitTransform",
    Moz: "MozTransform",
    O: "OTransform",
    ms: "msTransform",
    standard: "Transform"
  };

  for(let key in transformNames) {
    if(elementStyle[transformNames[key]] !== undefined) return key;
  }

  return false;

});

export function prefixStyle (style) {
  const _vendor = vendor();
  if(_vendor === false) {
    return false
  }
  if(_vendor === "standard") return style;
  return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

export const getSongUrl = (id) => `http://music.163.com/song/media/outer/url?id=${id}.mp3`;

export const isEmpty = data => {
  if(typeof data === "object") {
    return Array.isArray(data) ? data.length === 0 : Object.keys(data).length === 0;
  }else {
    return !! data;
  }
}
