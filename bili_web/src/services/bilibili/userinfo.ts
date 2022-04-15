// @ts-ignore
/* eslint-disable */


export async function queryGenderInfo(){
  return fetch('/api/user/getGenderInfo').then(res => res.json());
}
export async function queryLevelInfo(){
  return fetch('/api/user/getLevelInfo').then(res => res.json());
}
export async function queryVipInfo(){
  return fetch('/api/user/getVipInfo').then(res => res.json());
}

export async function queryFansInfo(){
  return fetch('/api/user/getFansInfo').then(res => res.json());
}
export async function queryFollowingInfo(){
  return fetch('/api/user/getFollowingInfo').then(res => res.json());
}
export async function querySchoolInfo(){
  return fetch('/api/user/getSchoolInfo').then(res => res.json());
}
