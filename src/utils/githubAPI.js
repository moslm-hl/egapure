// GitHub API utility for updating repository files
// This allows the CMS to commit changes directly to GitHub

const GITHUB_API_BASE = 'https://api.github.com';

export class GitHubAPI {
  constructor(token, owner, repo) {
    this.token = token;
    this.owner = owner;
    this.repo = repo;
    this.baseUrl = `${GITHUB_API_BASE}/repos/${owner}/${repo}`;
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
        content: btoa(unescape(encodeURIComponent(content))), // Base64 encode
        sha: sha,
        branch: 'main' // or your default branch
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
      const currentContent = JSON.parse(atob(fileData.content));

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

// Factory function to create GitHub API instance
export const createGitHubAPI = () => {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!token || !owner || !repo) {
    throw new Error('Missing GitHub environment variables: GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO');
  }

  return new GitHubAPI(token, owner, repo);
};