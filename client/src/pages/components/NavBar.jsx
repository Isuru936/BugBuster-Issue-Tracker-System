import { Icon } from "@iconify/react/dist/iconify.js";

function NavBar({ email }) {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Icon icon="game-icons:alien-bug" className="text-white text-4xl" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            BugBuster
          </span>
        </a>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <a
            href="/profile"
            className="text-sm  text-gray-500 dark:text-white hover:underline"
          >
            {email}
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
