import style from "./CircularLoaderBig.module.css"

function CircularLoaderBig() {
  return (
    <div className={style.container}>
        <div className={style.loader}></div>
    </div>
  )
}

export default CircularLoaderBig