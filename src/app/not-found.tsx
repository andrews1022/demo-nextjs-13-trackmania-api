import Link from "next/link";

const RootNotFound = () => {
  return (
    <div>
      <h1 className="text-4xl">Oops!</h1>
      <p>Looks like you tried accessing a page that doesn't exist.</p>
      <Link className="border-teal-600 border-2 inline-block py-2 px-4" href="/">
        Go Home
      </Link>
    </div>
  );
};

export default RootNotFound;
