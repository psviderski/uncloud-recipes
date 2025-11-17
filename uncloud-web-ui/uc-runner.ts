export interface CommandResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
}

export function runUcCommand(args: string[]): CommandResult {
  try {
    const proc = Bun.spawnSync(['uc', ...args]);

    const stdout = new TextDecoder().decode(proc.stdout);
    const stderr = new TextDecoder().decode(proc.stderr);

    return {
      stdout,
      stderr,
      exitCode: proc.exitCode,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during process spawning.";
    console.error(`Critical error running 'uc ${args.join(' ')}':`, errorMessage);
    return {
      stdout: '',
      stderr: errorMessage,
      exitCode: -1, // Use a special exit code to indicate a spawn failure.
    };
  }
}
