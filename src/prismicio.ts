import { createClient as baseCreateClient, type ClientConfig, type Route } from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import sm from "../slicemachine.config.json";

export const repositoryName = sm.repositoryName;

const routes: Route[] = [
  { type: "blog_post", path: "/blog/:uid" },
  // Add others if needed, e.g. { type: "page", path: "/:uid" }
];

export function createClient(config: ClientConfig = {}) {
  const client = baseCreateClient(repositoryName, {
    routes,
    fetchOptions: {
      next: { tags: ["prismic"] },
      cache: "force-cache",
    } as unknown as ClientConfig["fetchOptions"],
    ...(process.env.PRISMIC_ACCESS_TOKEN && { accessToken: process.env.PRISMIC_ACCESS_TOKEN }),
    ...config,
  });

  // enableAutoPreviews({ client, repositoryName });
  enableAutoPreviews({ client });

  return client;
}