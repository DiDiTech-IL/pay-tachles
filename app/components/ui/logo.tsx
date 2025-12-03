import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  href?: string;
}

const sizeConfig = {
  sm: { icon: 'w-7 h-7', iconInner: 'w-4 h-4', text: 'text-lg' },
  md: { icon: 'w-9 h-9', iconInner: 'w-5 h-5', text: 'text-xl' },
  lg: { icon: 'w-12 h-12', iconInner: 'w-7 h-7', text: 'text-2xl' },
};

export function Logo({ size = 'md', showText = true, href = '/' }: LogoProps) {
  const config = sizeConfig[size];

  const content = (
    <div className="flex items-center gap-2.5 group">
      <div className={`${config.icon} rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow duration-300`}>
        <svg className={`${config.iconInner} text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      {showText && (
        <span className={`${config.text} font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent`}>
          Tachles Pay
        </span>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
