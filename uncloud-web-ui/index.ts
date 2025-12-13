import { runUcCommand } from './uc-runner';

const server = Bun.serve({
  port: 8080,
  async fetch(req) {
    const url = new URL(req.url);

    // ======== Health Check Endpoint ========
    if (url.pathname === '/health') {
      const result = runUcCommand(['machine', 'ls']);
      if (result.exitCode === 0) {
        return new Response("OK", { status: 200 });
      } else {
        console.error('Health check failed:', result.stderr);
        return new Response(`Unhealthy: ${result.stderr}`, { status: 503 });
      }
    }

    // ======== Service Inspect Endpoint (e.g., /service/:name) ========
    const serviceInspectMatch = url.pathname.match(/^\/service\/(.+)/);
    if (serviceInspectMatch) {
      const serviceName = serviceInspectMatch[1];
      const result = runUcCommand(['service', 'inspect', serviceName]);
      let body = `<h1>Inspect Service: ${serviceName}</h1><a href="/">&larr; Back to Dashboard</a>`;

      if (result.exitCode === 0) {
        body += `<pre>${result.stdout}</pre>`;
      } else {
        body += `<pre>Error inspecting service:\n${result.stderr}</pre>`;
      }
      return new Response(body, { headers: { 'Content-Type': 'text/html' } });
    }

    // ======== Main UI Endpoint ========
    if (url.pathname === '/') {
      let body = `<h1>Uncloud Dashboard</h1>`;

      // Display Machines
      body += `<h2>Machines</h2>`;
      const machinesResult = runUcCommand(['machine', 'ls']);
      if (machinesResult.exitCode === 0) {
        body += `<pre>${machinesResult.stdout}</pre>`;
      } else {
        body += `<pre>Error fetching machines:\n${machinesResult.stderr}</pre>`;
      }

      // Display Services
      body += `<h2>Services</h2>`;
      const servicesResult = runUcCommand(['service', 'ls']);
      if (servicesResult.exitCode === 0) {
        const serviceLines = servicesResult.stdout.trim().split('\n');
        const header = serviceLines.shift() || '';

        const linkedLines = serviceLines.map(line => {
          if (!line.trim()) return line; // Skip empty lines
          const serviceName = line.split(/\s+/)[0];
          if (!serviceName) return line; // Skip lines without a clear service name

          // Make service name a link to the "inspect service" view
          return line.replace(serviceName, `<a href="/service/${serviceName}">${serviceName}</a>`);
        });

        const linkedOutput = [header, ...linkedLines].join('\n');
        body += `<pre>${linkedOutput}</pre>`;
      } else {
        body += `<pre>Error fetching services:\n${servicesResult.stderr}</pre>`;
      }

      return new Response(body, { headers: { 'Content-Type': 'text/html' } });
    }

    return new Response('Not Found', { status: 404 });
  },
});

console.log(`Bun web server listening on http://localhost:${server.port}`);
