---
title: "Git"
order: 4
---

Show an old version of a file

First show commit history of a specific file:

```
git log -- follow -- path/to/file
```

Next copy commit id of the commit you want to see:

```
git checkout <commitid> -- src/foo.py
```

Go back to latest commit version:

```
git checkout HEAD -- src/foo.py
```

Back to top
