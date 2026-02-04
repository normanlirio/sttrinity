export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

export interface LoggerOptions {
  level?: LogLevel;
}

export class Logger {
  private level: LogLevel;

  constructor(options: LoggerOptions = {}) {
    this.level = options.level ?? LogLevel.INFO;
  }

  debug(message: string): void {
    if (LogLevel.DEBUG >= this.level) {
      console.log(`[DEBUG] ${message}`);
    }
  }

  info(message: string): void {
    if (LogLevel.INFO >= this.level) {
      console.log(`[INFO] ${message}`);
    }
  }

  warn(message: string): void {
    if (LogLevel.WARN >= this.level) {
      console.log(`[WARN] ${message}`);
    }
  }

  error(message: string): void {
    if (LogLevel.ERROR >= this.level) {
      console.log(`[ERROR] ${message}`);
    }
  }

  setLevel(level: LogLevel): void {
    this.level = level;
  }
}


export const logger = new Logger({
  level: LogLevel.WARN,
});