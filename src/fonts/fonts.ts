import localFont from 'next/font/local';

export const frankfurter = localFont({
  src: [
    {
      path: './FranxurterMedium.ttf',
      style: 'normal',
      weight: '400',
    },
    {
      path: './FranxurterFat.ttf',
      style: 'bold',
      weight: '700',
    },
  ],
});
