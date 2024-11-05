import { Issue } from '@/types/github';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<{
    assignedIssues: Issue[];
    assignedPRs: Issue[];
    reviewRequestedPRs: Issue[];
    mentions: Issue[];
  }>({
    assignedIssues: [],
    assignedPRs: [],
    reviewRequestedPRs: [],
    mentions: [],
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

      <h2>Assigned Issues and PRs</h2>
    </div>
  );
}
