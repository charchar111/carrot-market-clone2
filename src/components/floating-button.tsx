import Link from "next/link";

interface floatingButtonProps {
  children: React.ReactNode;
}

export default function FloatingButton({ children }: floatingButtonProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-10 mx-auto flex max-w-lg justify-end">
      <Link href="/upload">
        <button className="pointer-events-auto bottom-12 right-12 m-3 rounded-full bg-orange-400 p-4 text-white opacity-80 transition-all hover:bg-orange-500 hover:opacity-100">
          {children}
        </button>
      </Link>
    </div>
  );
}
