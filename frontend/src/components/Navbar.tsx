import Link from "next/link";

export default function Navbar() {

  return (
    <nav
      className="
      flex
      justify-between
      items-center
      px-6
      py-4
      border-b
    "
    >
      <Link
        href="/"
        className="font-bold text-xl"
      >
        CollegeFinder
      </Link>

      <div className="flex gap-6">

        <Link href="/colleges">
          Colleges
        </Link>

        <Link href="/compare">
          Compare
        </Link>

        <Link href="/predictor">
          Predictor
        </Link>
        <Link href="/saved">
  Saved
</Link>

<Link href="/login">
  Login
</Link>
<Link href="/discussions">
  Discussions
</Link>

      </div>
    </nav>
  );
}