import { List } from '@/components/list';
import { Issue } from '@/types/github';
import { useEffect, useState } from 'react';

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
        const response = await fetch('/api/github');
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
    <div>
      <h1>GitHub Dashboard</h1>
      <List data={data.assignedIssues} group="Assigned Issues" />
      <List data={data.assignedPRs} group="Assigned Pull Requests" />
      <List data={data.reviewRequestedPRs} group="Review Requested Pull Requests" />
      <List data={data.mentions} group="Mentions" />
    </div>
  );
}
