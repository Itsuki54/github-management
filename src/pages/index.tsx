import { List } from '@/components/list';
import { Issue } from '@/types/github';
import { useEffect, useState } from 'react';
import styles from './index.module.css';

export default function Home() {
  const [data, setData] = useState<{
    assignedIssues: Issue;
    assignedPRs: Issue;
    reviewRequestedPRs: Issue;
    mentions: Issue;
  }>({
    assignedIssues: {
      total_count: 0, items: [],
      incomplete_results: false
    },
    assignedPRs: {
      total_count: 0, items: [],
      incomplete_results: false
    },
    reviewRequestedPRs: {
      total_count: 0, items: [],
      incomplete_results: false
    },
    mentions: {
      total_count: 0, items: [],
      incomplete_results: false
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/github?param=open');
        const result = await response.json();
        console.log('result:', result);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.lists}>
          <List data={data.assignedIssues} group="Issue" />
          <List data={data.assignedPRs} group="PR" />
          <List data={data.reviewRequestedPRs} group="Review" />
          <List data={data.mentions} group="Mention" />
      </div>
    </div>
  );
}
