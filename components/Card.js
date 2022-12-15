import Image from "next/image";
import Link from "next/link";
import styles from './card.module.css'
import cls from "classnames"


const Card = ({ name, imgUrl, href, alt }) => {
  return (
    <Link href={href} className={styles.cardLink}>
        <div className={cls("glass", styles.container)}>
        <div className={styles.cardHeaderWrapper} >
        <h3 className={styles.cardHeader} >{name}</h3>
        </div>
        <Image alt={alt} className={styles.cardLink} src={imgUrl} width={260} height={260} />
        </div>
    </Link>
  );
};

export default Card;
