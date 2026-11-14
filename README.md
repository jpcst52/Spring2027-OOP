# OOP Spring 2027 - weekly examples

These are original course examples, not copies of the textbooks. Open this
folder in VS Code. Install Node.js 26, Python 3.12 or later, and the .NET 10
SDK, then run:

```powershell
node --test
python -m unittest discover -s tests -p "test_*.py"
dotnet run --project CSharp -- self-test
```

On Windows, `py -3.12` can be used instead of `python` if the Python launcher
is installed but `python` is not on PATH. If a user-local .NET SDK is installed
but `dotnet --list-sdks` does not show it, start a PowerShell session with:

```powershell
$env:DOTNET_ROOT = Join-Path $env:LOCALAPPDATA 'Microsoft\dotnet'
$env:Path = "$env:DOTNET_ROOT;$env:Path"
dotnet --list-sdks
```

Run a specific JavaScript example with `node week-01\example.cjs` (substitute
the desired week); run the Python examples with `python week-12\example.py`
and similarly for weeks 13-14. The examples use synthetic data and no
third-party packages. For the C# counterparts to weeks 1-6, run
`dotnet run --project CSharp -- 1` (substitute a number from 1 through 6).
The C# examples and self-tests were also verified using the .NET 10 SDK.

| Week | Original example | Author material |
|---|---|---|
| 1 | Model an object | Hillar, objects and classes; the book directs readers to Packt support for its examples. |
| 2 | Independent instances | Hillar, classes and instances. |
| 3 | Enforce a closing invariant | Hillar, encapsulation and data hiding. |
| 4 | Subtypes and overriding | Hillar, inheritance and polymorphism. |
| 5 | Compose a notifier | Hillar, interfaces and composition. |
| 6 | Refactor request validation | Hillar, refactoring. |
| 7 | Linear search and comparisons | [Groner: Big O](https://github.com/jpcst52/javascript-datastructures-algorithms/tree/main/src/02-bigOnotation) |
| 8 | Undo history | [Groner: stacks](https://github.com/jpcst52/javascript-datastructures-algorithms/tree/main/src/04-stack) |
| 9 | Service queue | [Groner: queues and deques](https://github.com/jpcst52/javascript-datastructures-algorithms/tree/main/src/05-queue-deque) |
| 10 | Unique IDs and lookup | [Groner: sets](https://github.com/jpcst52/javascript-datastructures-algorithms/tree/main/src/07-set), [dictionaries](https://github.com/jpcst52/javascript-datastructures-algorithms/tree/main/src/08-dictionary-hash) |
| 11 | Shortest unweighted route | [Groner: graphs](https://github.com/jpcst52/javascript-datastructures-algorithms/tree/main/src/13-graph) |
| 12 | Summarize a CSV | [Igual and Segui: descriptive statistics](https://github.com/DataScienceUB/introduction-datascience-python-book/blob/master/ch03_Descriptive_Statistics.ipynb) |
| 13 | Record cleaning decisions | [Igual and Segui: toolbox](https://github.com/DataScienceUB/introduction-datascience-python-book/blob/master/ch02_Toolbox.ipynb) |
| 14 | Analyze service requests | [Igual and Segui: descriptive statistics](https://github.com/DataScienceUB/introduction-datascience-python-book/blob/master/ch03_Descriptive_Statistics.ipynb) |

The linked textbook material remains in the authors' repositories. The
data-science repository did not visibly state a license when reviewed, so its
notebooks are linked rather than copied. Hillar's official public code
repository has not been verified. The examples do not certify the textbook
notebooks' dependencies.
