import { LogEntry } from '@/app/lib/definitions';
import Title from '@/app/ui/title';
import { sql } from '@vercel/postgres';

export default async function ShowLogs() {
  const logs = await sql<LogEntry>`SELECT * FROM logs`;

  return (
    <>
      <Title>Chat Logs</Title>
      {logs.rows.map(log => (  
        <div key={log.id}>
        <div>log.timestamp</div><div>log.message</div>
        </div>
      ))}
    </>
  );
}
