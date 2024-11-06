### Setting Up Environment Variables

Before running the application, you need to configure the following environment variables in a `.env` file:

```
GITHUB_ACCESS_TOKEN=your_github_access_token
GITHUB_USERNAME=your_github_username
```

- `GITHUB_ACCESS_TOKEN`: Provide your GitHub personal access token. For instructions on how to generate one, refer to the [GitHub documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).
- `GITHUB_USERNAME`: Enter your GitHub username.

Once the `.env` file is set up, you can start the development environment by running the following command:

```bash
npm run dev
```

This will start the application in development mode.

---

### Features

This application allows you to view and manage GitHub issues and pull requests (PRs) with advanced filtering and sorting options. It fetches data from GitHub via an API and displays it in an organized manner. Below are the main features you can use:

#### 1. **Filter by State**
You can filter the displayed issues and pull requests by their state:
- **All States**: Shows both open and closed items.
- **Open**: Shows only open issues and PRs.
- **Closed**: Shows only closed issues and PRs.

#### 2. **Filter by Repository**
You can filter the items based on the repository. You can either select:
- **All Repositories**: Displays items from all repositories.
- Specific repositories: Select from a list of available repositories that contain issues and PRs assigned to you or where you're mentioned.

#### 3. **Sort by Criteria**
You can sort the items based on the following criteria:
- **Created Date**: Sorts by the creation date of the issue/PR.
- **Updated Date**: Sorts by the last update date of the issue/PR.
- **Comments**: Sorts based on the number of comments.

#### 4. **Sort Order**
You can change the sorting order between:
- **Ascending (asc)**: Sorts from the earliest date or fewest comments to the latest date or most comments.
- **Descending (desc)**: Sorts from the latest date or most comments to the earliest date or fewest comments.

#### 5. **View Issues and PRs**
The application displays the following categories:
- **Assigned Issues**: Issues that are assigned to you.
- **Assigned PRs**: Pull requests that are assigned to you.
- **Review Requested PRs**: Pull requests where you're requested for a review.
- **Mentions**: Issues and PRs where you are mentioned.

You can interact with each category individually, apply different filters, and sort the list to make it easier to track and manage the work assigned to you.

---

This summary gives users a clear understanding of how they can interact with the data in the application using the filters and sorting options. You can add this section under **Features** or **Usage** in your README for easy reference.