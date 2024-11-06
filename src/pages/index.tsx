import { List } from "@/components/list";
import { Issue } from "@/types/github";
import { GetServerSideProps } from "next";
import { useState } from "react";
import styles from "./index.module.css";

type Props = {
  data: {
    assignedIssues: Issue;
    assignedPRs: Issue;
    reviewRequestedPRs: Issue;
    mentions: Issue;
  };
};

export default function Home({ data }: Props) {
  const [stateFilter, setStateFilter] = useState<"open" | "closed" | "all">("open");
  const [repoFilter, setRepoFilter] = useState<string>("all");
  const [sortCriteria, setSortCriteria] = useState<"created" | "updated" | "comments">("created");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filterItems = (items: Issue["items"]) => {
    return items.filter((item) => {
      const stateMatch = stateFilter === "all" || item.state === stateFilter;
      const repoMatch = repoFilter === "all"
        || item.repository_url.split("/").slice(-2).join("/") === repoFilter;
      return stateMatch && repoMatch;
    });
  };

  const sortItems = (items: Issue["items"]) => {
    return items.slice().sort((a, b) => {
      let comparison = 0;

      if (sortCriteria === "created") {
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else if (sortCriteria === "updated") {
        comparison = new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
      } else if (sortCriteria === "comments") {
        comparison = a.comments - b.comments;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  };

  const processItems = (items: Issue["items"]) => {
    return sortItems(filterItems(items));
  };

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <select
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value as "open" | "closed" | "all")}
          className={styles.stateFilter}
        >
          <option value="all">All States</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
        <select className={styles.stateFilter} value={repoFilter} onChange={(e) => setRepoFilter(e.target.value)}>
          <option value="all">All Repositories</option>
          {Array.from(
            new Set(
              [
                ...data.assignedIssues.items,
                ...data.assignedPRs.items,
                ...data.reviewRequestedPRs.items,
                ...data.mentions.items,
              ].map((item) => item.repository_url.split("/").slice(-2).join("/")),
            ),
          ).map((repo) => (
            <option key={repo} value={repo}>
              {repo}
            </option>
          ))}
        </select>
        <select
          className={styles.stateFilter}
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value as "created" | "updated" | "comments")}
        >
          <option value="created">作成日</option>
          <option value="updated">更新日</option>
          <option value="comments">コメント数</option>
        </select>
        <select
          className={styles.stateFilter}
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        >
          <option value="asc">昇順</option>
          <option value="desc">降順</option>
        </select>
      </div>

      <div className={styles.lists}>
        <List data={{ ...data.assignedIssues, items: processItems(data.assignedIssues.items) }} group="Issue" />
        <List data={{ ...data.assignedPRs, items: processItems(data.assignedPRs.items) }} group="PR" />
        <List
          data={{
            ...data.reviewRequestedPRs,
            items: processItems(data.reviewRequestedPRs.items),
          }}
          group="Review"
        />
        <List data={{ ...data.mentions, items: processItems(data.mentions.items) }} group="Mention" />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const baseUrl = `${req.headers["x-forwarded-proto"] || "http"}://${req.headers.host}`;
  const response = await fetch(`${baseUrl}/api/github`);
  const data = await response.json();

  return {
    props: { data },
  };
};
