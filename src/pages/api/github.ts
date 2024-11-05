import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = process.env.GITHUB_ACCESS_TOKEN;
  const username = process.env.GITHUB_USERNAME;
  const headers = {
    Authorization: `token ${token}`,
  };

  try {
    // 修正されたクエリ
    const assignedIssues = await axios.get(
      `https://api.github.com/search/issues?q=assignee:${username}+is:issue`,
      { headers }
    );

    const assignedPRs = await axios.get(
      `https://api.github.com/search/issues?q=assignee:${username}+is:pr`,
      { headers }
    );

    const reviewRequestedPRs = await axios.get(
      `https://api.github.com/search/issues?q=review-requested:${username}+is:pr`,
      { headers }
    );

    const mentions = await axios.get(
      `https://api.github.com/search/issues?q=mentions:${username}`,
      { headers }
    );

    res.status(200).json({
      assignedIssues: assignedIssues.data,
      assignedPRs: assignedPRs.data,
      reviewRequestedPRs: reviewRequestedPRs.data,
      mentions: mentions.data,
    });
  } catch (error) {
    console.error('GitHubデータの取得エラー:', error);
    res.status(500).json({ error: 'GitHubデータの取得に失敗しました' });
  }
}
