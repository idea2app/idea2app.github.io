export const Footer = () => (
  <div className="container mx-auto flex max-w-screen-xl items-center justify-between border-t-2 px-4 py-12 text-center">
    © 2024 idea2app
    <ul className="flex gap-4">
      <li>
        <a
          className="border-b-2 border-b-black py-1 dark:border-b-white"
          href="https://web-cell.dev/"
          target="_blank"
          rel="noreferrer"
        >
          Web Cell
        </a>
      </li>
      <li>
        <a
          className="border-b-2 border-b-black py-1 dark:border-b-white"
          href="https://tech-query.me/"
          target="_blank"
          rel="noreferrer"
        >
          Tech Query
        </a>
      </li>
    </ul>
  </div>
);
