This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Next13(APP Router,Typescript), Shad-CN , Tailwind CSS, ESLint,Clerk Authentication
-- npx create-next-app@latest ecommerce-admin --typescript --tailwind --eslint

-- npx shadcn-ui@latest init
-- npx shadcn-ui@latest add button
-- npm install @clerk/nextjs

Goto Clerk Authentication to create App(Admin Dashboard)

.even: Clerk env variables,

next cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloud Name>"

Create Cloudinary account and get cloud name
Cloudinary

In cloudinary Add new preset at settings. Set mode to Unsigned,
copy name and save(Put this in image upload.tsx (uploadPreset="ouxxxo6"))


At the HomePage/(page.tsx): Paste a cid of a billboard at the

using stripe:
Install stripe cli and add system variables(windows)
acct_1NT0HVGhECtyX0IB

