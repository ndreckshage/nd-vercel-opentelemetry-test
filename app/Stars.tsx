import { trace } from "@opentelemetry/api";

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function fetchGithubStars(repo: string, delay: number) {
  return await trace
    .getTracer("nextjs-example")
    .startActiveSpan("fetchGithubStars", async (span) => {
      try {
        await wait(delay);
        return 100;

        // const res = await fetch(`https://api.github.com/repos/${repo}`, {
        //   next: {
        //     revalidate: 0,
        //   },
        // });
        // const data = await res.json();

        // return data?.stargazers_count ?? 100;
      } finally {
        span.end();
      }
    });
}

export default async function Stars({
  repo,
  delay,
  repeat,
}: {
  repo: string;
  delay: number;
  repeat: number;
}) {
  return await trace
    .getTracer("nextjs-example")
    .startActiveSpan(`RSC.StarsComponent:${repo}`, async (span) => {
      const stars = await fetchGithubStars(repo, delay);

      const element = (
        <div style={{ border: "1px solid #eee", margin: 5, padding: 5 }}>
          {Array.from(Array(repeat + 1).keys())
            .reverse()
            .map((ndx) => (
              <p key={ndx}>
                {ndx} - {repo} has {stars} ⭐️
              </p>
            ))}
        </div>
      );

      span.end();
      return element;
    });
}
