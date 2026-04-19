// API route to update content data via GitHub API

import { createGitHubAPI } from '../../src/utils/githubAPI.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { section, data } = req.body;

      if (!section || data === undefined) {
        return res.status(400).json({ error: 'Missing section or data' });
      }

      // Create GitHub API instance
      const githubAPI = createGitHubAPI();

      // Commit the change to GitHub
      const result = await githubAPI.commitContentUpdate(section, data);

      res.status(200).json(result);

    } catch (error) {
      console.error('Error updating content:', error);
      res.status(500).json({
        error: 'Failed to update content',
        details: error.message
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}