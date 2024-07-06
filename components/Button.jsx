// components/Button.js

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SButton = ({ href, children }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link href={href}>
      <div className={`bg-${isActive ? 'indigo-500' : 'white'} text-black font-bold py-2 px-4 rounded`}>
        {children}
      </div>
    </Link>
  );
};

export default SButton;
