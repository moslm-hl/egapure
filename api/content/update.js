// API route to update content data via GitHub API

class GitHubAPI {
  constructor(token, owner, repo) {
    this.token = token;
    this.owner = owner;
    this.repo = repo;
    this.baseUrl = `https://api.github.com/repos/${owner}/${repo}`;
  }

  async getFile(path) {
    const response = await fetch(`${this.baseUrl}/contents/${path}`, {
      headers: {
        'Authorization': `token ${this.token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to get file: ${response.statusText}`);
    }

    return await response.json();
  }

  async updateFile(path, content, message, sha) {
    const response = await fetch(`${this.baseUrl}/contents/${path}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${this.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        content: Buffer.from(content).toString('base64'),
        sha: sha,
        branch: 'main'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to update file: ${error.message}`);
    }

    return await response.json();
  }

  async commitContentUpdate(section, newData) {
    try {
      // Get current content file
      const fileData = await this.getFile('data/content.json');

      // Parse current content
      const currentContent = JSON.parse(Buffer.from(fileData.content, 'base64').toString('utf-8'));

      // Update the specific section
      currentContent[section] = newData;

      // Add activity log
      const activity = {
        timestamp: new Date().toISOString(),
        action: `${section} section updated`,
        section: section
      };

      if (!currentContent.recentActivity) {
        currentContent.recentActivity = [];
      }
      currentContent.recentActivity = [activity, ...currentContent.recentActivity.slice(0, 4)];

      // Convert back to JSON
      const updatedContent = JSON.stringify(currentContent, null, 2);

      // Commit the change
      const commitMessage = `Update ${section} section via CMS`;
      await this.updateFile('data/content.json', updatedContent, commitMessage, fileData.sha);

      return {
        success: true,
        message: `${section} updated and committed to GitHub`,
        activity: activity
      };

    } catch (error) {
      console.error('GitHub API error:', error);
      throw new Error(`Failed to commit changes: ${error.message}`);
    }
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { section, data } = req.body;

      if (!section || data === undefined) {
        return res.status(400).json({ error: 'Missing section or data' });
      }

      // Check for required environment variables
      const token = process.env.GITHUB_TOKEN;
      const owner = process.env.GITHUB_OWNER;
      const repo = process.env.GITHUB_REPO;

      if (!token || !owner || !repo) {
        console.warn('GitHub environment variables not set, update not saved to GitHub');
        return res.status(200).json({
          success: true,
          message: `${section} updated locally (GitHub integration not configured)`,
          activity: {
            timestamp: new Date().toISOString(),
            action: `${section} section updated`,
            section: section
          }
        });
      }

      // Create GitHub API instance
      const githubAPI = new GitHubAPI(token, owner, repo);

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