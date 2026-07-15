import next from 'eslint-config-next/core-web-vitals';
import tailwind from 'eslint-plugin-tailwindcss';

const nextConfig = Array.isArray(next) ? next : [next];

const config = [
  { ignores: ['.next/**', 'node_modules/**', 'public/**'] },
  ...nextConfig,
  tailwind.configs.recommended,
  {
    settings: {
      tailwindcss: {
        functions: ['cn', 'cva'],
        cssConfigPath: 'app/globals.css',
      },
    },
    rules: {
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/classnames-order': 'off',
      '@next/next/no-img-element': 'off',
    },
  },
];

export default config;
