import { Item } from '@/types/github';
import styles from './index.module.css';

export function Card({ item }: { item: Item }) {
  return (
    <div className={styles.card} onClick={() => window.open(item.html_url, '_blank')}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{item.title}</h3>
        <span className={`${styles.cardState} ${styles[item.state]}`}>{item.state}</span>
      </div>
      <div className={styles.cardContent}>
        <p className={styles.cardRepo}>
          <strong>リポジトリ:</strong> {item.repository_url.split('/').slice(-2).join('/')}
        </p>
        <div className={styles.cardUser}>
          <img
            className={styles.userAvatar}
            src={item.user.avatar_url}
            alt={`${item.user.login}'s avatar`}
          />
          <span className={styles.userName}>{item.user.login}</span>
        </div>
        <div className={styles.cardMeta}>
          <p>コメント数: {item.comments}</p>
          <p>作成日: {new Date(item.created_at).toLocaleDateString()}</p>
        </div>
        <div className={styles.cardLabels}>
          {item.labels.map((label) => (
            <span
              key={label.id}
              className={styles.label}
              style={{ backgroundColor: `#${label.color}` }}
            >
              {label.name}
            </span>
          ))}
        </div>
        {item.pull_request && (
          <div className={styles.cardPr}>
            <span className={styles.prBadge}>Pull Request</span>
            <a href={item.pull_request.html_url} target="_blank" rel="noopener noreferrer">
              {item.pull_request.html_url}
            </a>
          </div>
        )}
      </div>
      <div className={styles.cardFooter}>
        <p>更新日: {new Date(item.updated_at).toLocaleDateString()}</p>
        {item.closed_at && <p>クローズ日: {new Date(item.closed_at).toLocaleDateString()}</p>}
      </div>
    </div>
  );
}
