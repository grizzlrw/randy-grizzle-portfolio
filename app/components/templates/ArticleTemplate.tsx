// app/components/ArticleTemplate.tsx
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';

interface ArticleTemplateProps {
title: string;
  children: React.ReactNode;
}

export default function ArticleTemplate({ title, children }: ArticleTemplateProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-16 bg-white dark:bg-black sm:items-start">
        <Box sx={{ width: '100%', py: 4, px: 4, gap: 4, textAlign: 'left', position: 'relative' }}>
            <header>
                <Typography component={"h1"} variant={"h2"}>{title}</Typography>
                {/* Add more header content */}
            </header>
            

            
            <article>
                {children}
            </article>
            {/* Add footer, etc. */}
        </Box>
      </main>
    </div>
  );
}