---
title: "Visualising semantic differential scales"
summary: "Plotting User Experience Questionnaire results, where people rate a product between pairs of opposite adjectives."
year: 2024
kind: "Visualisation"
tags: ["UX research", "Survey data", "ggplot2"]
order: 7
cover: "/media/projects/semantic-differential/sem_dif2.svg"
---

A common way to test user experience of a product of app is to use semantic difference scales where adjectives of for example opposite meaning are placed compared. The customer must chose to what degree one of the certain adjectives is more suited.

## Example

[User Experience Questionnaire](https://www.ueq-online.org) is a typical questionnaire used for this purpose.

> Laugwitz, B., Held, T., & Schrepp, M. (2008). Construction and evaluation of a user experience questionnaire. In HCI and Usability for Education and >Work: 4th Symposium of the Workgroup Human-Computer Interaction and Usability Engineering of the Austrian Computer Society, USAB 2008, Graz, Austria, >November 20-21, 2008. Proceedings 4 (pp. 63-76). Springer Berlin Heidelberg.

![Example Questionnaire: UEQ](/media/projects/semantic-differential/sem.png)

*Example Questionnaire: UEQ*

## Visualization using ggplot2

![Semantic Difference with 95% Confidence intervalls](/media/projects/semantic-differential/sem_dif2.svg)

*Semantic Difference with 95% Confidence intervalls*

[Code here](https://github.com/oli9402/visualisation/tree/main/semantic_diff)

Back to top
