---
title: "Building my first R package"
summary: "Notes on structuring an R package: dependencies, DESCRIPTION files, documentation and testing."
year: 2024
kind: "Tools"
tags: ["R", "Package development"]
order: 12
---

## Installing Packages

```bash
install.packages("devtools")
install.packages("usethis")
```

## Create Package

```bash
library(usethis)
create_package('~/Documents/siliconPackage')
```

## Create file

```bash
library(usethis)
use_r('silicon')
```

## Package vs R Script

In normal R Scripts you call libraries but in a package you track dependencies differently with using `use_package()` which adds the package to the DESCRIPTION file.

```bash
use_package('ggplot2')
```

By default, r looks for function inside your own package first so we do not explicitly state the package name. But for external packages like `ggplot2` we would use `ggplot2::function`

### .Rprofile

With an .Rprofile file we can add libraries that should be loaded after opening the Package Project in R

```r
if (!require(devtools)) {
  install.packages("devtools")
  library(devtools)
}
```

## Do Checks

```bash
devtools::check()
```

## Publish on Github

First init git with `use_git('init package')`

```bash
use_github()
#or
use_github('NameOfOrganization')
```

## Download Package

```bash
devtools::install_github('username/packagename')
```

## Documentation

Roxygen2 is a way of documenting function and with `@export` we tell roxygen2 that this function is ready for export and is accessible for other users that load the package. We can also call the usual `?function` the returns our short description. Other function **without** `@export` are internal function and can’t be accessed.

```r
#' Title
#'
#' Short description of function with *markdown* syntax
#'
#' @export
function_name <- function(){

}
```

To make the documentation call the following in the console:

```bash
devtools::document()
```

```bash
use_mit_license()
```

## Test created functions

```bash
use_testthat()

use_test('nameOfRRcript')

test()
```

Alternatively in RStudio we can use `Build` to run all tests.

## Rename file

```bash
rename_file('old', 'new')
```

## Add readme for github

```bash
use_readme_rmd()
build_readme()
```

Back to top
