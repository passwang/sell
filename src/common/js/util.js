/*
* @Author: Administrator
* @Date:   2017-10-22 15:27:27
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-23 06:00:09
*/
export function urlParse(){
	let url = window.location.search;
  console.log(url);
	let obj = {};
  // let arr = [];
	let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    if (arr) {
    	arr.forEach((item) => {
          let tempArr = item.substr(1).split('=');
          let key = decodeURIComponent(tempArr[0]);
          let value = decodeURIComponent(tempArr[1]);
          obj[key] = value;
    	})
    }
}