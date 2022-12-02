import styles from "./banner.module.css"
import Image from "next/image"


function banner(props) {
  return (
    <>
    <h1 className="title">Coffee App</h1>
    <p>Discover local coffee shops!</p>
    <button className={styles.button} onClick={props.handleOnClick}>{props.buttonText}</button>
    <Image className="img-top" src="/../public/bg.png" width={400} height={500}/>
    </>
    
  )
}

export default banner