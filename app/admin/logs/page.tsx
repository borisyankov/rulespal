import { sql } from '@vercel/postgres';

type LogEntry = {
  id: number;
  timestamp: Date;
  message: string;
};

export default async function ShowLogs() {
  const logs = await sql<LogEntry>`SELECT * FROM logs`;

  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 className="text-5xl">Chat Logs</h1>
      {logs.rows.map(log => (  
        <div key={log.id}>
        <div>log.timestamp</div><div>log.message</div>
        </div>
      ))}
    </main>
  );
}
