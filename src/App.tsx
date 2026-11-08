import { useEffect, useState } from 'react'
import { Utensils, Hand, Droplets, Shirt, Heart, Sun, Sparkles, RotateCcw } from 'lucide-react'

type Save = { hunger:number; clean:number; outfit:number; message:string }
const outfits = ['日常小围巾','软萌睡帽','粉色蝴蝶结','奶油小背心']
const saved = (): Save => { try { return JSON.parse(localStorage.getItem('lu-xiaohou-save') || '') } catch { return { hunger:76, clean:82, outfit:0, message:'今天也要开开心心！' } } }

export default function App() {
  const [pet,setPet] = useState<Save>(saved)
  const [bubbles,setBubbles] = useState(false)
  const [wiggle,setWiggle] = useState(false)
  const [time,setTime] = useState(new Date())
  useEffect(()=>{ localStorage.setItem('lu-xiaohou-save',JSON.stringify(pet)) },[pet])
  useEffect(()=>{ const id=setInterval(()=>setTime(new Date()),60000); return ()=>clearInterval(id) },[])
  const act=(message:string,change:Partial<Save>={})=>{ setPet(p=>({...p,...change,message})); setWiggle(true); setTimeout(()=>setWiggle(false),550) }
  const feed=()=>act('啊呜！谢谢你投喂我～',{hunger:Math.min(100,pet.hunger+22)})
  const touch=()=>act('嘿嘿，好喜欢你的摸摸！')
  const bath=()=>{setBubbles(true);act('泡泡浴时间！洗得香喷喷～',{clean:100});setTimeout(()=>setBubbles(false),1800)}
  const dress=()=>{const n=(pet.outfit+1)%outfits.length;act('换上了'+outfits[n]+'！',{outfit:n})}
  const reset=()=>{if(confirm('确定要重新开始吗？'))setPet({hunger:76,clean:82,outfit:0,message:'你好呀！我是卢小猴～'})}
  return <main className="page">
    <header className="top"><div className="brand"><span className="brand-icon">🐵</span><div><b>卢小猴的小窝</b><small>LU XIAOHOU'S HOME</small></div></div><div className="day"><Sun size={16}/>{time.getHours()<18?'美好的一天':'温柔的夜晚'} <button className="icon-btn" onClick={reset} title="重置"><RotateCcw size={16}/></button></div></header>
    <section className="intro"><div><span className="eyebrow">✦ YOUR LITTLE PIXEL FRIEND ✦</span><h1>今天也来陪卢小猴玩吧！</h1><p>给小窝一点爱，收获满满的可爱。</p></div><div className="sparkle">✧</div></section>
    <section className="game">
      <div className="room-top"><span>ROOM NO. 01</span><span>♡ MY LITTLE ROOM ♡</span><span>☼</span></div>
      <div className="window"><div className="sun-disc"></div><div className="cloud c1"></div><div className="cloud c2"></div><div className="hill"></div></div>
      <div className="shelf"><span>🌷</span><span>📚</span><span>🧸</span></div>
      <div className="pet-area">
        <div className="status-note">♡ {pet.message}</div>
        <div className={'pet '+(wiggle?'wiggle':'')}>
          {bubbles&&<div className="bubbles">🫧　◦　🫧</div>}
          <div className="ears"><i></i><i></i></div>
          <div className="head"><div className="hair"></div><div className="eyes"><i/><i/></div><div className="cheeks"><i/><i/></div><div className="mouth"></div><div className="face-mark">•</div></div>
          <div className="body"><div className="scarf">{['♡','☾','✿','♥'][pet.outfit]}</div><div className="arms"></div></div>
          <div className="feet"><i/><i/></div>
          <div className="outfit-tag">{outfits[pet.outfit]}</div>
        </div>
        <div className="floor"></div>
      </div>
      <div className="room-bottom"><span>♡ 小猴正在等你 ♡</span><span>✦ ✦ ✦</span></div>
    </section>
    <section className="meters">
      <div className="meter"><div className="meter-label"><span>🍓 饱饱能量</span><b>{pet.hunger}%</b></div><div className="track"><i style={{width:pet.hunger+'%'}}/></div></div>
      <div className="meter"><div className="meter-label"><span>🫧 清爽指数</span><b>{pet.clean}%</b></div><div className="track clean"><i style={{width:pet.clean+'%'}}/></div></div>
    </section>
    <section className="actions"><div className="actions-title">和卢小猴互动 <span>CHOOSE AN ACTION</span></div><div className="action-grid">
      <button onClick={feed}><span className="action-icon pink"><Utensils/></span><b>喂养</b><small>给我好吃的</small></button>
      <button onClick={touch}><span className="action-icon peach"><Hand/></span><b>摸摸</b><small>轻轻摸摸我</small></button>
      <button onClick={bath}><span className="action-icon blue"><Droplets/></span><b>洗澡</b><small>泡泡香香浴</small></button>
      <button onClick={dress}><span className="action-icon lilac"><Shirt/></span><b>换装</b><small>换个新造型</small></button>
    </div></section>
    <footer><span>MADE WITH <Heart size={12} fill="currentColor"/> FOR LU XIAOHOU</span><span>进度自动保存在此设备</span></footer>
  </main>
}