# ADR 2: Every new release has a major version

## Tags
* versioning
* npm

## Context

Every change potentially breaks an user's expectations.
No matter if the API has changed or just the runtime behavior of the 
functions being used. Each of those can be seen as a major change.

## Decision

Every release is a major version release.

## Status 

Accepted

## Consequences

+ simpler versioning
+ every change is seen as breaking
+ no minor, bugfix versions
- explicit npm dependency updates might be needed to upgrade
- does not adhere to semantic versioning