import type { CollectionEntry } from "astro:content";
import type { postBody } from "backend/api/rating";
import { useLayoutEffect, useState } from "react";

export default function LikeButton({ id }: { id: CollectionEntry<"projects">["id"] }) {
  const [liked, setLiked] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useLayoutEffect(() => {
    if (localStorage.getItem(id) === "true") setLiked(true);
  }, []);

  function handleLikeClick() {
    const like = !liked;
    setDisabled(true);
    fetch(API_ENDPOINT, {
      body: JSON.stringify({ id, like } satisfies postBody),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        if (!response.ok) {
          return console.error(response.statusText);
        }
        setLiked(like);
        localStorage.setItem(id, like.toString());
        setDisabled(false);
      })
      .catch((e) => {
        console.error(e);
        setDisabled(false);
      });
  }

  return (
    <button
      disabled={disabled}
      data-liked={liked}
      className="absolute right-2 h-8 w-fit text-3xl duration-300 disabled:text-neutral-600 hover:[&:not(:disabled)]:text-red-300 data-[liked=true]:[&:not(:disabled)]:text-red-500"
      onClick={handleLikeClick}
    >
      <svg
        version="1.1"
        id="Uploaded to svgrepo.com"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="800px"
        height="800px"
        viewBox="0 0 32 32"
        xmlSpace="preserve"
        className="h-full w-10"
      >
        <path
          className="fill-current"
          d="M21.081,6C23.752,6.031,26,8.766,26,12c0,5.106-6.47,10.969-10.001,13.593
	C12.466,22.974,6,17.12,6,12c0-3.234,2.248-5.969,4.918-6C13.586,6.175,13.926,6.801,16,8.879C18.069,6.806,18.418,6.173,21.081,6
	 M20.911,4.006L20.912,4C18.993,4,17.259,4.785,16,6.048C14.741,4.785,13.007,4,11.088,4l0.001,0.006C7.044,3.936,4,7.719,4,12
	c0,8,11.938,16,11.938,16h0.124C16.062,28,28,20,28,12C28,7.713,24.951,3.936,20.911,4.006z"
        />
      </svg>
    </button>
  );
}

const API_ENDPOINT =
  (import.meta.env.MODE === "development"
    ? "http://localhost:3001"
    : "https://portfolio-api-hugeletters.vercel.app") + "/api/rating";
