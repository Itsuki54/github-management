import { Card } from '@/components/card';
import { Issue } from '@/types/github';
import styles from './index.module.css';

type Props = {
  data: Issue;
  group: string;
};

export function List({ data, group }: Props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{group}</h1>
      <p className={styles.totalCount}>合計: {data.total_count} 件</p>
      <div className={styles.items}>
        {data.items.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
