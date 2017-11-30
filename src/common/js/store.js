/*
* @Author: Administrator
* @Date:   2017-10-23 02:55:36
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-23 03:42:56
*/
export function saveToLocal(id,key,value) {
     let seller = window.localStorage._seller_;
     if (!seller) {
     	 seller={};
     	 seller[id]={};
     
     }else{
     	seller = JSON.parse(seller);
     	if (!seller[id]) {
     		seller[id]={};
     	}
     }
     	 seller[id][key] = value;
     	 window.localStorage._seller_=seller.stringify(seller);
};
export function loadFromLocal(id,key,def) {
  let seller = window.localStorage._seller_;
  if (!seller) {
  	  return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
     return def;
  }
  
  let ret = seller[key];
  return ret || def;
 
}