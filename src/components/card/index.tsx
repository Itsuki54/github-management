import { Item } from "@/types/github";
import styles from "./index.module.css";

export function Card({ item }: { item: Item }) {
  const titleClass = item.state === 'closed' ? styles.cardTitleClosed : styles.cardTitleOpen;

  return (
    <div className={styles.card} onClick={() => window.open(item.html_url, '_blank')}>
      <div className={styles.cardHeader}>
        <h3 className={titleClass}>{item.title}</h3>
      </div>
      <div className={styles.cardContent}>
        <p className={styles.cardRepo}>
         {item.repository_url.split('/').slice(-2).join('/')}
        </p>
      </div>
      <div className={styles.cardFooter}>
        {new Date(item.created_at).toLocaleDateString()}
      </div>
    </div>
  );
}
