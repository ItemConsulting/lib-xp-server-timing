# Enonic XP Server Timing Library

Enonic XP Library for measuring performance serverside, and surfacing this data as a [`server-timing` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server-Timing).

[![](https://jitpack.io/v/no.item/lib-xp-server-timing.svg)](https://jitpack.io/#no.item/lib-xp-server-timing)

## Gradle

To install this library you may need to add some new dependencies to your app's build.gradle file.

```groovy
repositories {
  maven { url 'https://jitpack.io' }
}

dependencies {
  include 'no.item:lib-xp-server-timing:0.0.1'
}
```

### TypeScript

You can add the following changes to your *tsconfig.json* to get TypeScript-support.

```diff
{
  "compilerOptions": {
+   "baseUrl": "./",
+   "paths": {
+     "/lib/xp/*": ["./node_modules/@enonic-types/lib-*"],
+     "/lib/*": [ "./node_modules/@item-enonic-types/lib-*" ,"./src/main/resources/lib/*"],
+   }
  }
}
```

## Setup

### Site xml

You need to add a response processor with name=`server-timing` to your *site.xml* file so that the responses from
the different parts, pages and layouts are combined to one header.

```xml
<site>
  <processors>
    <response-processor name="server-timing" order="10"/>
  </processors>
</site>
```

## Usage

You can start a timer by running the `createStarted` function. Then after you have done every operation you need, you
can stop the timer(s) and get a header back.

The `server-timing` response processor will then combine all headers to one single header that is returned to the user.

```typescript
import { render } from "/lib/thymeleaf"
import { createStarted } from "/lib/server-timing";

const view = resolve("./default.html")

export function get(): XP.Response {
  const timing = createStarted({
    name: "default",
    description: "View: Default page",
  });  
    
  const body = render(view, {});
  
  return {
    status: 200,
    body,
    headers: timing.stopAllAndGetHeader()
  }
}
```

### Building

To build he project run the following code

```bash
./gradlew build
```

### Deploy locally

Deploy locally for testing purposes:

```bash
./gradlew publishToMavenLocal
```
## Deploy to Jitpack

Go to the [Jitpack page for lib-xp-server-timing](https://jitpack.io/#no.item/lib-xp-server-timing) to deploy from Github (after
[creating a new versioned release](https://github.com/ItemConsulting/lib-xp-server-timing/releases/new)).
