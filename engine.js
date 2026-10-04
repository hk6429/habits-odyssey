export const ROLES={child:{name:'國小探險家',short:'國小',theme:'在遊戲、朋友與家人之間，練習自己的小選擇。'},teen:{name:'國中領航員',short:'國中',theme:'面對同儕、課業與期待，找到自己的方向。'},adult:{name:'成人築夢者',short:'成人',theme:'在工作、關係與照顧責任中，重新選擇重要的事。'}};
export const KEY='inner-compass-progress-v1';
export const fresh=()=>({version:1,role:null,completed:{child:[],teen:[],adult:[]},actions:{child:{},teen:{},adult:{}},last:{child:'h1-s1',teen:'h1-s1',adult:'h1-s1'}});
export function normalize(raw){const s=fresh();if(!raw||raw.version!==1)return s;if(ROLES[raw.role])s.role=raw.role;for(const r of Object.keys(ROLES)){s.completed[r]=[...new Set((Array.isArray(raw.completed?.[r])?raw.completed[r]:[]).filter(validId))];for(const [id,v] of Object.entries(raw.actions?.[r]||{})){if(validId(id)&&['planned','tried','adjust','private'].includes(v))s.actions[r][id]=v;}if(validId(raw.last?.[r]))s.last[r]=raw.last[r];}return s;}
export function validId(id){return typeof id==='string'&&/^h[1-8]-s([1-9]|10)$/.test(id);}
export function complete(s,role,id){if(!ROLES[role]||!validId(id))return s;return normalize({...s,completed:{...s.completed,[role]:[...s.completed[role],id]}});}
export function counts(s,role,h){const ids=s.completed[role]||[];return h?ids.filter(id=>id.startsWith(`h${h}-`)).length:ids.length;}
export function keyIndex(key){return ({ArrowLeft:0,ArrowUp:1,ArrowDown:2,ArrowRight:3,'1':0,'2':1,'3':2,'4':3,a:0,b:1,c:2,d:3})[key];}
export function nextId(id){const [,h,n]=id.match(/^h(\d)-s(\d+)$/);return +n<10?`h${h}-s${+n+1}`:+h<8?`h${+h+1}-s1`:null;}
