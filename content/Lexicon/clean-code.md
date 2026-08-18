---
title: Clean Code
name: clean-code
description: Code written to be read and maintained by humans, not just executed by a machine — a discipline named and popularised by Robert C. Martin's 2008 book, with a growing body of empirical software-engineering research behind it.
tags:
  - term
human-reviewed: false
---
> Code is read far more often than it's written — clean code optimises for the person who has to understand it six months later, not just the compiler that runs it today.

Robert C. Martin's 2008 book *Clean Code: A Handbook of Agile Software Craftsmanship* popularised the term and a set of concrete practices around it — meaningful names, small functions, minimal duplication — as a discipline distinct from simply "code that works." That distinction has since drawn real empirical attention: controlled studies of code-readability testing find that most programmers can measurably improve their ability to write readable code within a handful of guided sessions, and that unreadable code correlates with slower maintenance and more introduced bugs.

That empirical backing is what separates "clean code" from a purely aesthetic preference — readability isn't a nicety layered on top of working software, it's a measurable predictor of how much a codebase will cost to maintain.

### 🔗 Related Concepts
- [[design-patterns|Design Patterns]]
- [[debug|Debug]]
- [[specs|Specs]]

Source: Sedano, T. "Code Readability Testing, an Empirical Study," *IEEE CSEE&T*, 2016. Foundational: Martin, R.C. *Clean Code*, 2008.
