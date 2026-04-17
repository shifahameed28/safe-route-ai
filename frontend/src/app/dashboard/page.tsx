import Link from "next/link";

export default function Home() {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
      <Link href="/dashboard">
        Go to Dashboard
      </Link>
    </div>
  );
}