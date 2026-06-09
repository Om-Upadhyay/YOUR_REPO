import { NextResponse } from "next/server";

const username = "Om-Upadhyay";

type GithubUser = {
  public_repos?: number;
  followers?: number;
  following?: number;
};

type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

export const revalidate = 3600;

export async function GET() {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        next: { revalidate }
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
        next: { revalidate }
      })
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      throw new Error("GitHub request failed");
    }

    const user = (await userResponse.json()) as GithubUser;
    const repos = (await reposResponse.json()) as GithubRepo[];

    return NextResponse.json({
      stats: {
        repositories: user.public_repos ?? 0,
        followers: user.followers ?? 0,
        following: user.following ?? 0
      },
      repositories: repos.map((repo) => ({
        id: repo.id,
        name: repo.name,
        url: repo.html_url,
        description: repo.description ?? "AI, analytics, or software development project.",
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language ?? "Code",
        updatedAt: repo.updated_at
      }))
    });
  } catch {
    return NextResponse.json(
      {
        stats: {
          repositories: 0,
          followers: 0,
          following: 0
        },
        repositories: []
      },
      { status: 200 }
    );
  }
}
