// components/Breadcrumb.js
import { useRouter } from 'next/router';

const Breadcrumb = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter((segment) => segment !== '');

  return (
    <nav className="text-gray-600 text-sm mb-4">
      <ol className="list-none p-0 inline-flex">
        <li className="flex items-center">
          <a href="/" className="text-gray-400 hover:underline">
            Home
          </a>
        </li>
        {pathSegments.map((segment, index) => (
          <li key={index} className="flex items-center">
            <span className="mx-2">/</span>
            <a href={`/${pathSegments.slice(0, index + 1).join('/')}`} className="text-blue-500 hover:underline">
              {segment}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
