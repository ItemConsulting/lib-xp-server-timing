import { get as getContext } from "/lib/xp/context";
import { sanitize } from "/lib/xp/common";
import { Duration, Instant } from "/lib/server-timing/time";

export class Stopwatch {
  started: Instant;

  stopped: Instant;

  name: string;

  description?: string;

  constructor(name: string, description?: string) {
    this.name = sanitize(name);
    this.description = description;
  }

  start(): this {
    this.started = Instant.now();
    return this;
  }

  stop(): this {
    this.stopped = Instant.now();
    return this;
  }

  duration(): number {
    if (!this.stopped) {
      this.stop();
    }

    if (this.started && this.stopped) {
      return Duration.between(this.started, this.stopped).toMillis();
    }
    return 0;
  }
}

export class Timer {
  isAdmin = false;
  stopwatches: Stopwatch[] = [];

  constructor(name: string, description?: string, isAdmin = false) {
    this.isAdmin = isAdmin;
    this.createStarted(name, description);
  }

  createStarted(name: string, description?: string) {
    if (this.isAdmin) {
      this.stopwatches.push(new Stopwatch(name, description).start());
    }
  }

  stopAllAndGetHeader(): Record<string, string> {
    return this.stopwatches.reduce<Record<string, string>>((res, watch) => {
      res[`${watch.name}-server-timing`] = watch.description
        ? `${watch.name};dur=${watch.duration()};desc="${watch.description}"`
        : `${watch.name};dur=${watch.duration()}`;
      return res;
    }, {});
  }
}

export function createStarted({ name, description }: StartParams): Timer {
  return new Timer(name, description, isAdmin());
}

function isAdmin() {
  return getContext().authInfo?.principals?.indexOf("role:system.admin") !== -1;
}

interface StartParams {
  name: string;
  description?: string;
}
