export function startSocatProxy(): Bun.Subprocess {
  console.log("Spawning 'socat' as a background process to proxy TCP to the Uncloud Unix socket...");

  const socatProcess = Bun.spawn({
    cmd: [
      'socat',
      // listen on localhost 50051
      'tcp-listen:50051,fork,reuseaddr',
      // forward to uncloud unix socket
      'unix-connect:/run/uncloud/uncloud.sock'
    ],
    // pipe to the main process
    stdout: 'inherit',
    stderr: 'inherit',
  });

  console.log(`Started socat proxy with PID: ${socatProcess.pid}`);
  return socatProcess;
}
