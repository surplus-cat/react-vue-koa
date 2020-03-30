import React, {useState, useMemo, useEffect} from 'react';

// 父组件
const Example = () => {
  const [time, setTime] = useState<number>(0);
  const [random, setRandom] = useState<number>(0);


  return (
    <div>
      <button onClick={() => setTime(new Date().getTime())}>获取当前时间</button>
      <button onClick={() => setRandom(Math.random())}>获取当前随机数</button>
      <Show time={time} >{random}</Show>
    </div>
  )
}

type Data = {
  time: number
}

// 子组件
const Show:React.FC<Data> = ({ time, children }) => {

  function changeTime(time: number): string {
    console.log('changeTime excuted...');
    return new Date(time).toISOString()
  }

  useEffect(() => {
    console.log('effect function here...')
  }, [time])

  // 使用 useMemo 改造我们的 <Show /> 子组件
  // 这个时候只有点击 获取当前时间 才会执行 changeTime 这个函数，
  // 而点击 获取当前随机数 已经不会触发该函数执行了
  const newTime: string = useMemo(() => {
    return changeTime(time);
  }, [time])

  return (
    <div>
      <p>Time is: { newTime }</p>
      <p>Random is: { children }</p>
    </div>
  )
}

export default Example;