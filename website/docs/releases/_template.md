---
title: Release xxxx.x
slug: "xxxx.x"
---

## Breaking changes

## New features

## API Changes

_Insert output of `make gen-diff` here_

## Minor changes/fixes

## Upgrading

This release does not introduce any new requirements.

### docker-compose

Download the docker-compose file for xxxx.x from [here](https://goauthentik.io/version/xxxx.x/docker-compose.yml). Afterwards, simply run `docker-compose up -d`.

### Kubernetes

Update your values to use the new images:

```yaml
image:
    repository: ghcr.io/goauthentik/server
    tag: xxxx.x.0
```
