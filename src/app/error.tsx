"use client";
import Link from "next/link";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="error-page"><small>Something went wrong</small><h1>We could not load this page.</h1><p>Please try again. If the problem continues, return to the website.</p><div><button className="button button-primary" onClick={reset}>Try again</button><Link className="button button-secondary" href="/">Go home</Link></div></main>;
}
