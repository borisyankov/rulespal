import Title from '@/app/ui/title';
import { Suspense } from 'react';
import LogList from './log-list';

export default async function ShowLogs() {
  return (
    <>
      <Title text="Chat Logs" />
      <Suspense fallback={<div>Loading...</div>}>
        <LogList />
      </Suspense>
    </>
  );
}
