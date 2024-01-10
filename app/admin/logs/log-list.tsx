import { LogEntry } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';

export default async function LogList() {
  const logs = await sql<LogEntry>`SELECT * FROM logs`;

  return (
    <ul>
      {logs.rows.map(log => (  
        <li key={log.id}>
        <div>log.timestamp</div>
        <div>log.message</div>
        </li>
      ))}
    </ul>
  );
}