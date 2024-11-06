import { List } from '@/components/list';
import { Issue } from '@/types/github';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import styles from './index.module.css';

type Props = {
  data: {
    assignedIssues: Issue;
    assignedPRs: Issue;
    reviewRequestedPRs: Issue;
    mentions: Issue;
  };
};

export default function Home({ data }: Props) {
  const [stateFilter, setStateFilter] = useState<'open' | 'closed' | 'all'>('open');
  const [repoFilter, setRepoFilter] = useState<string>('all');

  const filterItems = (items: Issue['items']) => {
    return items.filter(item => {
      const stateMatch = stateFilter === 'all' || item.state === stateFilter;
      const repoMatch =
        repoFilter === 'all' ||
        item.repository_url.split('/').slice(-2).join('/') === repoFilter;
      return stateMatch && repoMatch;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <select
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value as 'open' | 'closed' | 'all')}
          className={styles.stateFilter}
        >
          <option value="all">All States</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
        <select value={repoFilter} onChange={(e) => setRepoFilter(e.target.value)}>
          <option value="all">All Repositories</option>
          {Array.from(
            new Set(
              [
                ...data.assignedIssues.items,
                ...data.assignedPRs.items,
                ...data.reviewRequestedPRs.items,
                ...data.mentions.items,
              ].map((item) => item.repository_url.split('/').slice(-2).join('/'))
            )
          ).map((repo) => (
            <option key={repo} value={repo}>
              {repo}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.lists}>
        <List data={{ ...data.assignedIssues, items: filterItems(data.assignedIssues.items) }} group="Issue" />
        <List data={{ ...data.assignedPRs, items: filterItems(data.assignedPRs.items) }} group="PR" />
        <List
          data={{
            ...data.reviewRequestedPRs,
            items: filterItems(data.reviewRequestedPRs.items),
          }}
          group="Review"
        />
        <List data={{ ...data.mentions, items: filterItems(data.mentions.items) }} group="Mention" />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const baseUrl = `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`;
  const response = await fetch(`${baseUrl}/api/github`);
  const data = await response.json();

  return {
    props: { data },
  };
};
