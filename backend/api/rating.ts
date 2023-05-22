import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { CollectionEntry } from "astro:content";
import { z } from "zod";
import fs from "fs/promises";

export default function (request: VercelRequest, response: VercelResponse) {
  response.setHeader(
    "Access-Control-Allow-Origin",
    process.env.VERCEL_ENV === "development"
      ? "http://localhost:3000"
      : "https://www.hugeletters.org"
  );
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  switch (request.method) {
    case "GET":
      return GET(request, response);
    case "POST":
      return POST(request, response);
    case "OPTIONS":
      return response.send("");
    default:
      return response.status(401).send({ error: "Invalid request" });
  }
}

function GET(request: VercelRequest, response: VercelResponse) {
  return fs.readFile("./data/rating.json", "utf-8").then((file) => {
    const ratings = JSON.parse(file || "{}");
    return response.json(ratings);
  });
}

export type postBody = {
  id: CollectionEntry<"projects">["id"];
  like: boolean;
};
const postBodySchema = z.object({
  id: z.enum(
    (await fs
      .readdir("../src/content/projects")
      .then((x) => x.map((id) => id.replace(/\.json/, "")))) as readonly [string, ...string[]]
  ),
  like: z.boolean(),
});
function POST(request: VercelRequest, response: VercelResponse) {
  const vote = postBodySchema.parse(request.body);
  return fs
    .readFile("./data/rating.json", "utf-8")
    .then((file) => {
      const ratings = JSON.parse(file || "{}") as Record<string, number>;
      const voteCount = Math.max(0, (ratings[vote.id] ?? 0) + (vote.like ? 1 : -1));
      fs.writeFile(
        "./data/rating.json",
        JSON.stringify(Object.assign(ratings, { [vote.id]: voteCount }))
      );
    })
    .then(() => {
      response.send("");
    });
}
